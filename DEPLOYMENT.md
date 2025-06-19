# Deployment Guide for Harmony Rehearsal Scheduler

This document outlines the steps to deploy the Harmony Rehearsal Scheduler application to various environments.

## Prerequisites

- Node.js v16 or higher
- PostgreSQL v12 or higher
- Redis v6 or higher
- Docker and Docker Compose (for containerized deployment)
- AWS or GCP account (for cloud deployment)

## Local Deployment

### Using Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/harmony-rehearsal-scheduler.git
   cd harmony-rehearsal-scheduler
   ```

2. Set up environment variables:
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```
   Edit both `.env` files with appropriate values.

3. Start the application:
   ```bash
   docker-compose up -d
   ```

4. Access the application at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - API Documentation: http://localhost:8000/api-docs

### Without Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/harmony-rehearsal-scheduler.git
   cd harmony-rehearsal-scheduler
   ```

2. Set up environment variables:
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```
   Edit both `.env` files with appropriate values.

3. Install dependencies:
   ```bash
   npm run install:all
   ```

4. Set up the database:
   ```bash
   cd backend
   npm run db:setup
   ```

5. Start the application:
   ```bash
   # In one terminal
   cd frontend
   npm start
   
   # In another terminal
   cd backend
   npm run dev
   ```

## Production Deployment

### AWS Deployment

#### Using Elastic Beanstalk

1. Create an RDS PostgreSQL instance and ElastiCache Redis instance.

2. Create an Elastic Beanstalk application with Node.js platform:
   - Configure environment variables
   - Set up database connection strings
   - Configure CORS settings

3. Deploy the backend application:
   ```bash
   cd backend
   npm run build
   # Use the AWS EB CLI or console to deploy the dist directory
   ```

4. Deploy the frontend application to S3 and CloudFront:
   ```bash
   cd frontend
   npm run build
   # Use AWS CLI to sync the build directory to an S3 bucket
   aws s3 sync build/ s3://your-bucket-name
   ```

5. Set up CloudFront distribution for the S3 bucket.

### GCP Deployment

#### Using App Engine and Cloud SQL

1. Create a Cloud SQL PostgreSQL instance and a Memorystore Redis instance.

2. Configure `app.yaml` files for both frontend and backend applications.

3. Deploy the backend application:
   ```bash
   cd backend
   npm run build
   gcloud app deploy
   ```

4. Deploy the frontend application:
   ```bash
   cd frontend
   npm run build
   gcloud app deploy
   ```

## Continuous Integration/Continuous Deployment (CI/CD)

### GitHub Actions

The repository includes GitHub Actions workflows in `.github/workflows` for automated testing and deployment:

- `ci.yml`: Runs tests on pull requests
- `deploy-dev.yml`: Deploys to development environment when merged to development branch
- `deploy-prod.yml`: Deploys to production environment when merged to main branch

To use these workflows:

1. Set up the necessary secrets in your GitHub repository settings:
   - `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` for AWS deployments
   - `GCP_PROJECT_ID` and `GCP_SA_KEY` for GCP deployments
   - Database connection details
   - JWT secrets

2. Push to the appropriate branches to trigger deployments.

## Database Migrations

When deploying updates that include database schema changes:

1. Create migrations using Sequelize CLI:
   ```bash
   cd backend
   npx sequelize-cli migration:generate --name add-new-field
   ```

2. Apply migrations during deployment:
   ```bash
   npm run db:migrate
   ```

## Monitoring and Logging

- The application uses Winston for logging
- Set up CloudWatch (AWS) or Cloud Logging (GCP) for log aggregation
- Consider implementing Sentry for error tracking

## Scaling Considerations

- Use load balancers for horizontally scaling the backend
- Configure auto-scaling based on load metrics
- Optimize database queries and consider read replicas for high traffic
- Implement Redis caching for frequently accessed data

## Maintenance

- Regularly update dependencies for security patches
- Schedule database backups
- Monitor application performance and error rates
- Set up alerts for critical system metrics

## Troubleshooting

Common issues and their solutions:

- **Database connection failures**: Check network security groups and firewall rules
- **Redis connection issues**: Verify Redis connection string and network configuration
- **CORS errors**: Ensure CORS settings match your frontend domain
- **JWT authentication failures**: Check JWT secret configuration and token expiration settings

For more assistance, please open an issue in the GitHub repository.
