# Backend Setup Instructions

## Prerequisites
- Java 17+
- Maven
- MySQL Server running on localhost:3306

## Database Setup
1. Open your MySQL client (Workbench, CLI, etc.).
2. Run the script found in `database/schema.sql`.

## Running the Backend
1. Open a terminal in `backend/`.
2. Update `src/main/resources/application.properties` with your MySQL username and password (default is root/password).
3. Run:
   ```bash
   mvn spring-boot:run
   ```

## Running the Frontend
1. Open a terminal in the root directory.
2. Run:
   ```bash
   npm run dev
   ```
3. The frontend will try to connect to `http://localhost:8080`. If the backend is not running, it will fall back to mock data.
