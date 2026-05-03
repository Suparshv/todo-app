# To-Do List Application

## Setup Instructions
1. Clone this repository.
2. Install dependencies: `npm install`.
3. Ensure MongoDB is running on your machine.
4. Start the app: `node app.js`.
5. Open `http://localhost:3000` in your browser.

## Code Structure
- **app.js**: Entry point. Handles Express routing and MongoDB connection.
- **models/Task.js**: Mongoose schema. Ensures task titles are required.
- **views/**: Contains EJS templates for rendering the UI.
- **Persistence**: Data is persisted in a MongoDB database named `todoDB`.

## Features
- Full CRUD functionality.
- Logic validation to prevent re-completing tasks.
- Error handling for empty titles.
- Bonus: Categorization and Due Dates implemented.