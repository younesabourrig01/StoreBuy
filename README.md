# StoreBuy - Microservices E-commerce Platform

StoreBuy is an e-commerce website built from the ground up using a **Microservices Architecture**. 

## Tech Stack & Languages Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

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
git clone https://github.com/younesabourrig01/StoreBuy.git
cd StoreBuy
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