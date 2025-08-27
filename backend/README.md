# CircuitGen Backend

FastAPI-based backend for CircuitGen circuit design and simulation platform.

## 🚀 Features

- **RESTful API** for circuit management
- **Circuit Simulation Engine** for electrical analysis
- **Database Integration** with PostgreSQL
- **Data Validation** using Pydantic models
- **Auto-generated Documentation** with OpenAPI/Swagger

## 🛠️ Tech Stack

- **FastAPI** - Modern, fast web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation and settings
- **Uvicorn** - ASGI server
- **Alembic** - Database migration tool

## 📁 Project Structure

```
app/
├── api/                    # API route definitions
│   ├── circuits.py        # Circuit CRUD operations
│   └── simulate.py        # Simulation endpoints
├── core/                  # Core configuration
│   ├── config.py         # Application settings
│   └── db.py             # Database configuration
├── models/               # Data models
│   └── circuit_model.py  # Circuit and component models
├── services/             # Business logic
│   └── circuit_service.py # Circuit operations
└── main.py              # FastAPI application
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- PostgreSQL
- Redis (optional)

### Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost/circuitgen_db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

4. Initialize database:
```bash
alembic upgrade head
```

5. Run the server:
```bash
python -m app.main
```

## 📖 API Endpoints

### Circuits
- `GET /api/v1/circuits/` - List all circuits
- `POST /api/v1/circuits/` - Create new circuit
- `GET /api/v1/circuits/{id}` - Get circuit by ID
- `PUT /api/v1/circuits/{id}` - Update circuit
- `DELETE /api/v1/circuits/{id}` - Delete circuit
- `POST /api/v1/circuits/{id}/duplicate` - Duplicate circuit

### Simulation
- `POST /api/v1/simulate/run` - Run circuit simulation
- `POST /api/v1/simulate/validate` - Validate circuit
- `GET /api/v1/simulate/status/{id}` - Get simulation status

### Health Check
- `GET /health` - Service health status

## 🧪 Testing

Run tests with pytest:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app tests/
```

## 🔧 Configuration

Key configuration options in `app/core/config.py`:

- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT signing key
- `ALLOWED_HOSTS` - CORS allowed origins
- `MAX_SIMULATION_TIME` - Maximum simulation duration
- `MAX_COMPONENTS` - Maximum components per circuit

## 🐳 Docker

Build Docker image:
```bash
docker build -t circuitgen-backend .
```

Run with Docker:
```bash
docker run -p 8000:8000 circuitgen-backend
```

## 📊 Database Schema

### Circuits Table
- `id` - Primary key
- `name` - Circuit name
- `description` - Circuit description
- `components` - JSON array of components
- `connections` - JSON array of connections
- `metadata` - Additional circuit data
- `is_public` - Public visibility flag
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🔌 Circuit Components

Supported component types:
- **Power Sources**: Battery, Power Supply
- **Passive Components**: Resistor, Capacitor, Inductor
- **Active Components**: LED, Diode, Transistor
- **Digital**: Arduino, Sensors, Switches
- **Connections**: Wire, Ground, Breadboard

## 🧮 Simulation Engine

The simulation engine provides:
- **DC Analysis** - Steady-state voltage/current calculation
- **Component Validation** - Circuit connectivity checks
- **Power Analysis** - Power consumption calculations
- **Error Detection** - Short circuits, open circuits

## 🚀 Deployment

### Production Setup

1. Set production environment variables
2. Use production database (PostgreSQL)
3. Configure reverse proxy (Nginx)
4. Set up SSL certificates
5. Use process manager (systemd, supervisor)

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=production-secret-key
DEBUG=False
ALLOWED_HOSTS=["https://yourdomain.com"]
```

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add type hints to all functions
3. Write tests for new features
4. Update documentation
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details.
