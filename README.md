# StoreBuy - Microservices E-commerce Platform

StoreBuy is an e-commerce website built from the ground up using a **Microservices Architecture**. 

## Tech Stack & Languages Used

This project utilizes a modern technology stack to ensure high performance and scalability:

- **Frontend:** React.js (Vite), Redux Toolkit, CSS
- **Backend Services:** Node.js, Express.js
- **Microservices Communication:** REST APIs & RabbitMQ (Message Broker)
- **Database:** MongoDB
- **Tools Service:** Go (Golang) - used for the high-performance password generator service.
- **Infrastructure:** Docker & Docker Compose

### Microservices Breakdown:
- **API Gateway:** Central entry point routing requests to all internal microservices.
- **Auth Service:** User authentication, JWT generation, and profile management.
- **Product Service:** Product catalog and inventory management.
- **Cart Service:** User shopping cart management.
- **Favorite Service:** User wishlists and favorite products.
- **Order Service:** Checkout process and order history.
- **Notifications Service:** Real-time user notifications via RabbitMQ.
- **Password Generator Service:** A standalone Go microservice for secure password generation.

---

## Clone and Run the Project

The backend infrastructure is fully dockerized, making it incredibly easy to spin up the entire microservices ecosystem (including MongoDB and RabbitMQ). 

### Step 1: Clone the Repository
```bash
git clone https://github.com/younesabourrig01/fileRouge.git
cd fileRouge
```
### Step 2: Run the Backend Services using Docker
Start the API Gateway, all microservices, MongoDB, and RabbitMQ using Docker Compose:

```bash
docker-compose up --build -d
```

### Step 3: Seed the Database (First-time setup only)
Because Docker creates a fresh MongoDB instance, you will need to create an initial Admin user to access the admin dashboard. While the containers are running, execute the seed script inside the auth-service container:

```bash
docker exec -it auth-service node seedAdmin.js
```
*(This will create an admin user with email: `admin@test.com` and password: `admin123`)*

### Step 4: Run the Frontend Locally
The frontend is built with React and Vite. Open a new terminal window and run:

```bash
cd frontend
npm install
npm run dev
```
---

## Stopping the Project
To stop all the backend services and remove the containers, run:
```bash
docker-compose down
```