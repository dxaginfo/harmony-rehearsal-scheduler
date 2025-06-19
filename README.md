# Harmony Rehearsal Scheduler

A comprehensive web application that helps bands, orchestras, and music groups efficiently organize their practice sessions. This application automatically schedules rehearsals, sends reminders, tracks attendance, and suggests optimal rehearsal times based on member availability.

## Features

- **User Authentication and Profiles**
  - Secure registration and login system
  - Custom profiles with instrument/role specification
  - Role-based permissions (admin, band leader, member)

- **Availability Management**
  - Integration with personal calendars (Google, Apple, Outlook)
  - Recurring availability settings
  - Conflict detection and notification

- **Rehearsal Scheduling**
  - AI-powered optimal time suggestions based on member availability
  - Location management and booking
  - Equipment requirements tracking

- **Notifications and Reminders**
  - Email and SMS notifications
  - Customizable reminder timing
  - Calendar integration

- **Attendance Tracking**
  - One-click RSVP functionality
  - Attendance history and statistics
  - Absence management

- **Resource Management**
  - Rehearsal space booking
  - Equipment inventory and allocation
  - Sheet music/setlist sharing

- **Mobile Responsiveness**
  - Fully functional on all devices
  - Optimized interface for on-the-go use

## Technology Stack

### Frontend
- React.js with hooks
- Material-UI components
- Redux for state management
- FullCalendar.js for calendar functionality
- Formik with Yup for form validation

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication with OAuth2 integration
- Socket.io for real-time features

### Database
- PostgreSQL for relational data
- Redis for caching
- Elasticsearch for efficient availability matching

### Infrastructure
- Docker containerization
- AWS/Google Cloud Platform hosting
- GitHub Actions for CI/CD
- Sentry for error tracking

## Prerequisites

To run this project locally, you need to have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Docker and Docker Compose
- PostgreSQL (if running DB locally)
- Redis (if running cache locally)

## Setup and Installation

### Clone the repository
```bash
git clone https://github.com/dxaginfo/harmony-rehearsal-scheduler.git
cd harmony-rehearsal-scheduler
```

### Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Configuration
Create `.env` files in both the frontend and backend directories based on the provided templates:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update the environment variables with your specific configuration.

### Database Setup
```bash
# Using Docker
docker-compose up -d db redis

# Or set up manually with the provided scripts
cd backend
npm run db:setup
```

### Running the Application
```bash
# Development mode with hot-reloading
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/api-docs

### Running with Docker
```bash
docker-compose up -d
```

This will start all services including the frontend, backend, database, and cache.

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Deployment

Detailed deployment instructions are available in the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## API Documentation

API documentation is generated using Swagger and can be accessed at `/api-docs` when running the backend server.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- FullCalendar.js for the powerful calendar interface
- Material-UI for the responsive design components
- All contributors who have helped shape this project

## Contact

For questions or support, please open an issue in the GitHub repository.