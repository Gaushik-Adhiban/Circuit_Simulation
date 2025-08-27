"""
Circuit service for business logic and database operations
"""

from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.models.circuit_model import (
    Circuit, CircuitCreate, CircuitUpdate, CircuitResponse
)


class CircuitService:
    """Service class for circuit operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_circuits(
        self, 
        skip: int = 0, 
        limit: int = 100, 
        public_only: bool = False
    ) -> List[CircuitResponse]:
        """Get list of circuits"""
        query = self.db.query(Circuit)
        
        if public_only:
            query = query.filter(Circuit.is_public == True)
        
        circuits = query.offset(skip).limit(limit).all()
        return [self._to_response(circuit) for circuit in circuits]
    
    def get_circuit(self, circuit_id: int) -> Optional[CircuitResponse]:
        """Get a specific circuit by ID"""
        circuit = self.db.query(Circuit).filter(Circuit.id == circuit_id).first()
        if circuit:
            return self._to_response(circuit)
        return None
    
    def create_circuit(self, circuit_data: CircuitCreate) -> CircuitResponse:
        """Create a new circuit"""
        # Validate circuit data
        self._validate_circuit_data(circuit_data.components, circuit_data.connections)
        
        # Create database record
        db_circuit = Circuit(
            name=circuit_data.name,
            description=circuit_data.description,
            components=[comp.dict() for comp in circuit_data.components],
            connections=[conn.dict() for conn in circuit_data.connections],
            metadata=circuit_data.metadata,
            is_public=circuit_data.is_public
        )
        
        self.db.add(db_circuit)
        self.db.commit()
        self.db.refresh(db_circuit)
        
        return self._to_response(db_circuit)
    
    def update_circuit(
        self, 
        circuit_id: int, 
        circuit_data: CircuitUpdate
    ) -> Optional[CircuitResponse]:
        """Update an existing circuit"""
        circuit = self.db.query(Circuit).filter(Circuit.id == circuit_id).first()
        if not circuit:
            return None
        
        # Update fields if provided
        if circuit_data.name is not None:
            circuit.name = circuit_data.name
        if circuit_data.description is not None:
            circuit.description = circuit_data.description
        if circuit_data.components is not None:
            circuit.components = [comp.dict() for comp in circuit_data.components]
        if circuit_data.connections is not None:
            circuit.connections = [conn.dict() for conn in circuit_data.connections]
        if circuit_data.metadata is not None:
            circuit.metadata = circuit_data.metadata
        if circuit_data.is_public is not None:
            circuit.is_public = circuit_data.is_public
        
        # Validate updated circuit data
        if circuit_data.components or circuit_data.connections:
            from app.models.circuit_model import Component, Connection
            components = [Component(**comp) for comp in circuit.components]
            connections = [Connection(**conn) for conn in circuit.connections]
            self._validate_circuit_data(components, connections)
        
        circuit.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(circuit)
        
        return self._to_response(circuit)
    
    def delete_circuit(self, circuit_id: int) -> bool:
        """Delete a circuit"""
        circuit = self.db.query(Circuit).filter(Circuit.id == circuit_id).first()
        if not circuit:
            return False
        
        self.db.delete(circuit)
        self.db.commit()
        return True
    
    def duplicate_circuit(
        self, 
        circuit_id: int, 
        name: Optional[str] = None
    ) -> Optional[CircuitResponse]:
        """Duplicate an existing circuit"""
        original = self.db.query(Circuit).filter(Circuit.id == circuit_id).first()
        if not original:
            return None
        
        # Create duplicate
        duplicate_name = name or f"{original.name} (Copy)"
        
        db_circuit = Circuit(
            name=duplicate_name,
            description=original.description,
            components=original.components,
            connections=original.connections,
            metadata=original.metadata,
            is_public=False  # Duplicates are private by default
        )
        
        self.db.add(db_circuit)
        self.db.commit()
        self.db.refresh(db_circuit)
        
        return self._to_response(db_circuit)
    
    def export_circuit(self, circuit_id: int) -> Optional[dict]:
        """Export circuit data"""
        circuit = self.db.query(Circuit).filter(Circuit.id == circuit_id).first()
        if not circuit:
            return None
        
        return {
            "name": circuit.name,
            "description": circuit.description,
            "components": circuit.components,
            "connections": circuit.connections,
            "metadata": circuit.metadata,
            "exported_at": datetime.utcnow().isoformat()
        }
    
    def _to_response(self, circuit: Circuit) -> CircuitResponse:
        """Convert database model to response schema"""
        from app.models.circuit_model import Component, Connection
        
        components = [Component(**comp) for comp in (circuit.components or [])]
        connections = [Connection(**conn) for conn in (circuit.connections or [])]
        
        return CircuitResponse(
            id=circuit.id,
            name=circuit.name,
            description=circuit.description,
            components=components,
            connections=connections,
            metadata=circuit.metadata or {},
            is_public=circuit.is_public,
            created_at=circuit.created_at,
            updated_at=circuit.updated_at
        )
    
    def _validate_circuit_data(self, components, connections):
        """Validate circuit components and connections"""
        if not components:
            return  # Empty circuit is valid
        
        # Check for duplicate component IDs
        component_ids = [comp.id for comp in components]
        if len(component_ids) != len(set(component_ids)):
            raise ValueError("Duplicate component IDs found")
        
        # Validate connections reference existing components
        valid_component_ids = set(component_ids)
        for connection in connections:
            if connection.from_component not in valid_component_ids:
                raise ValueError(f"Connection references non-existent component: {connection.from_component}")
            if connection.to_component not in valid_component_ids:
                raise ValueError(f"Connection references non-existent component: {connection.to_component}")
