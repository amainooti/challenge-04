# Expense Tracker API

An API to manage and track your expenses with features to categorize and filter them based on timeframes or categories.

## Features

- Create, update, delete, and retrieve expenses.
- Filter expenses by date (past week, past month, or last three months).
- Filter expenses by category (e.g., Groceries, Electronics, Health).
- Authentication using JWT to secure API access.

## Requirements

- Node.js
- NestJS
- PostgreSQL (or any other Prisma-supported database)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/expense-tracker.git
   cd expense-tracker
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and configure your database URL, JWT secret, etc.:

   ```bash
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the server:

   ```bash
   npm run start:dev
   ```

## API Endpoints

### Authentication

#### Register

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Description:** Register a new user.

#### Login

- **URL:** `/auth/signin`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Description:** Log in and receive a JWT token for authenticated requests.

### Expenses

#### Create Expense

- **URL:** `/expenses/create`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Body:**
  ```json
  {
    "amount": 5000,
    "description": "Laptop stand",
    "category": "Electronics",
    "date": "2024-10-08"
  }
  ```
- **Description:** Create a new expense entry.

#### Get Expenses by Category

- **URL:** `/expenses/:category`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Params:**
  - `category`: One of `Groceries`, `Leisure`, `Electronics`, `Utilities`, `Clothing`, `Health`, `Others`
- **Description:** Retrieve all expenses for a specific category.

#### Get All Expenses

- **URL:** `/expenses`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Description:** Retrieve all expenses.

#### Filter Expenses by Timeframe

- **URL:** `/expenses`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Query Params:**
  - `timeframe`: `week`, `month`, `3months`
- **Description:** Filter expenses by timeframes such as past week, month, or last three months.

#### Update Expense

- **URL:** `/expenses/:id`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Body:**
  ```json
  {
    "amount": 6000,
    "description": "Updated description",
    "category": "Groceries"
  }
  ```
- **Description:** Update an existing expense by its ID.

#### Delete Expense

- **URL:** `/expenses/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <JWT Token>`
- **Description:** Delete an expense by its ID.

## Expense Filters

- Filter expenses by date (past week, past month, or custom date range).
- Filter expenses by category (e.g., Groceries, Leisure, Electronics).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Credits

This project idea is taken from [roadmap.sh](https://roadmap.sh/projects/expense-tracker-api).
