# 💻 User Management App  

This is a simple Node.js and Express-based application that interacts with a MySQL database to manage users. The app allows you to insert, view, and edit users dynamically.

## Features
- Generate and insert 100 random users into a MySQL database using Faker.js
- Display the total user count on the home page
- List all users with their details
- Edit user information securely   

## Technologies Used
- Node.js
- Express.js
- MySQL (mysql2 package)
- Faker.js (for generating random user data)
- EJS (for rendering views)
- Method-Override (to support HTTP PATCH method)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tejaskumavat08/user-management-app.git
   cd user-management-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up MySQL database:
   - Create a database named `delta_app`
   - Create a table named `user` with the following structure:
     ```sql
     CREATE TABLE user (
       id VARCHAR(255) PRIMARY KEY,
       name VARCHAR(255),
       email VARCHAR(255),
       password VARCHAR(255)
     );
     ```
4. Configure MySQL connection in `server.js`:
   ```js
   const conn = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       database: 'delta_app',
       password: 'your_password'
   });
   ```

## Usage

1. Start the server:
   ```sh
   node server.js
   ```
2. Open your browser and visit:
   - `http://localhost:8080/` to view the user count.
   - `http://localhost:8080/user` to see the list of users.
   - `http://localhost:8080/user/:id/edit` to edit a specific user.

## API Routes

| Route               | Method  | Description |
|--------------------|--------|-------------|
| `/`                | GET    | Display total user count |
| `/user`            | GET    | Show all users |
| `/user/:id/edit`   | GET    | Edit a user |
| `/user/:id`        | PATCH  | Update user information |

## Notes
- Ensure MySQL is running before starting the server.
- The password validation before updating the username is implemented for basic security.

## License
This project is open-source and free to use.

