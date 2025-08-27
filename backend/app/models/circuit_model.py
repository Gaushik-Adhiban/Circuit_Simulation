"""
Circuit data models and schemas
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON, Float
from sqlalchemy.sql import func
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime
from enum import Enum

from app.core.db import Base


class ComponentType(str, Enum):
    """Circuit component types"""
    RESISTOR = "resistor"
    CAPACITOR = "capacitor"
    INDUCTOR = "inductor"
    LED = "led"
    BATTERY = "battery"
    SWITCH = "switch"
    GROUND = "ground"
    WIRE = "wire"
    BREADBOARD = "breadboard"
    ARDUINO = "arduino"
    SENSOR = "sensor"


class Circuit(Base):
    """Circuit database model"""
    __tablename__ = "circuits"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    components = Column(JSON)  # Store circuit components as JSON
    connections = Column(JSON)  # Store connections between components
    metadata = Column(JSON)  # Additional circuit metadata
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Component(BaseModel):
    """Circuit component schema"""
    id: str = Field(..., description="Unique component identifier")
    type: ComponentType = Field(..., description="Component type")
    name: str = Field(..., description="Component name")
    position: Dict[str, float] = Field(..., description="Component position (x, y)")
    rotation: float = Field(default=0.0, description="Component rotation in degrees")
    properties: Dict[str, Any] = Field(default_factory=dict, description="Component properties")
    
    class Config:
        use_enum_values = True


class Connection(BaseModel):
    """Circuit connection schema"""
    id: str = Field(..., description="Unique connection identifier")
    from_component: str = Field(..., description="Source component ID")
    from_pin: str = Field(..., description="Source pin identifier")
    to_component: str = Field(..., description="Target component ID")
    to_pin: str = Field(..., description="Target pin identifier")
    wire_points: List[Dict[str, float]] = Field(default_factory=list, description="Wire routing points")


class CircuitCreate(BaseModel):
    """Schema for creating a circuit"""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    components: List[Component] = Field(default_factory=list)
    connections: List[Connection] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
    is_public: bool = False


class CircuitUpdate(BaseModel):
    """Schema for updating a circuit"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    components: Optional[List[Component]] = None
    connections: Optional[List[Connection]] = None
    metadata: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None


class CircuitResponse(BaseModel):
    """Schema for circuit response"""
    id: int
    name: str
    description: Optional[str]
    components: List[Component]
    connections: List[Connection]
    metadata: Dict[str, Any]
    is_public: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class SimulationRequest(BaseModel):
    """Schema for simulation request"""
    circuit_id: Optional[int] = None
    components: List[Component]
    connections: List[Connection]
    simulation_time: float = Field(default=1.0, gt=0, le=60)
    time_step: float = Field(default=0.001, gt=0, le=0.1)


class SimulationResult(BaseModel):
    """Schema for simulation results"""
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    execution_time: float
    timestamp: datetime
