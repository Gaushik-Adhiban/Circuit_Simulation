"""
Circuit management API endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.db import get_db
from app.models.circuit_model import (
    Circuit, CircuitCreate, CircuitUpdate, CircuitResponse
)
from app.services.circuit_service import CircuitService

router = APIRouter()


@router.get("/", response_model=List[CircuitResponse])
async def get_circuits(
    skip: int = 0,
    limit: int = 100,
    public_only: bool = False,
    db: Session = Depends(get_db)
):
    """Get list of circuits"""
    service = CircuitService(db)
    circuits = service.get_circuits(skip=skip, limit=limit, public_only=public_only)
    return circuits


@router.get("/{circuit_id}", response_model=CircuitResponse)
async def get_circuit(circuit_id: int, db: Session = Depends(get_db)):
    """Get a specific circuit by ID"""
    service = CircuitService(db)
    circuit = service.get_circuit(circuit_id)
    if not circuit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Circuit not found"
        )
    return circuit


@router.post("/", response_model=CircuitResponse, status_code=status.HTTP_201_CREATED)
async def create_circuit(
    circuit_data: CircuitCreate,
    db: Session = Depends(get_db)
):
    """Create a new circuit"""
    service = CircuitService(db)
    try:
        circuit = service.create_circuit(circuit_data)
        return circuit
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.put("/{circuit_id}", response_model=CircuitResponse)
async def update_circuit(
    circuit_id: int,
    circuit_data: CircuitUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing circuit"""
    service = CircuitService(db)
    circuit = service.update_circuit(circuit_id, circuit_data)
    if not circuit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Circuit not found"
        )
    return circuit


@router.delete("/{circuit_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_circuit(circuit_id: int, db: Session = Depends(get_db)):
    """Delete a circuit"""
    service = CircuitService(db)
    success = service.delete_circuit(circuit_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Circuit not found"
        )


@router.post("/{circuit_id}/duplicate", response_model=CircuitResponse)
async def duplicate_circuit(
    circuit_id: int,
    name: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Duplicate an existing circuit"""
    service = CircuitService(db)
    circuit = service.duplicate_circuit(circuit_id, name)
    if not circuit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Circuit not found"
        )
    return circuit


@router.get("/{circuit_id}/export")
async def export_circuit(circuit_id: int, db: Session = Depends(get_db)):
    """Export circuit data"""
    service = CircuitService(db)
    circuit_data = service.export_circuit(circuit_id)
    if not circuit_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Circuit not found"
        )
    return circuit_data
