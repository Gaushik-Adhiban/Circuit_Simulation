<<<<<<< HEAD
# CircuitGen

A TinkerCAD-like circuit design and simulation tool built with React frontend and FastAPI backend.

## 🚀 Features

- **Visual Circuit Designer**: Drag-and-drop interface for building circuits
- **Component Library**: Resistors, capacitors, LEDs, batteries, Arduino, and more
- **Real-time Simulation**: Circuit analysis and visualization
- **Save & Share**: Store circuits in database and share with others
- **Export Options**: Export circuit designs and simulation results

## 🏗️ Architecture

```
circuitgen/
├── frontend/          # React application
├── backend/           # FastAPI server
├── docs/             # Documentation
└── README.md         # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Konva.js** - 2D canvas library for circuit visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Styled Components** - CSS-in-JS styling

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Pydantic** - Data validation

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+
- PostgreSQL
- Redis (optional)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the server:
```bash
python -m app.main
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📖 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🐳 Docker Support

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## 📁 Project Structure

### Backend (`/backend`)
```
app/
├── api/              # API route definitions
├── core/             # Configuration and database
├── models/           # Data models and schemas
├── services/         # Business logic
└── main.py          # FastAPI application entry point
```

### Frontend (`/frontend`)
```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── services/        # API client functions
├── utils/           # Utility functions
└── App.js          # Main application component
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by TinkerCAD's circuit design interface
- Built with modern web technologies for performance and scalability
=======
# Circuit_Simulation
>>>>>>> c2d7ed9e6a69bd4dac00ca465452181130508748
