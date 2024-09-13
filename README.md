# Todo List Application

This is a Vue.js-based Todo List application with state management using Pinia and UI styling with Tailwind CSS. The app allows users to create, update, and delete tasks. Completed tasks are moved to the bottom of the list automatically.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (Node Package Manager) or yarn

## Running the Application

To start the development server and run the application:

`npm run dev`

## Building the Application

To build the app for production:

`npm run build`

## Running Unit Tests

We are using Vitest for unit testing. To run the tests:

`npm run test:unit`

## Linting

To run the linter and check for syntax/style issues:

`npm run lint`

### Features

- Add new tasks
- Mark tasks as completed or incomplete
- Edit tasks
- Delete tasks
- Move completed tasks to the bottom
- Local storage persistence for tasks
- Responsive UI with Tailwind CSS

### Technologies

- Vue.js 3
- Pinia for state management
- Tailwind CSS for styling
- Vitest for testing

### File Structure

```
├── src
│   ├── assets/                 # Static assets
│   ├── components/             # Vue components (TodoItem, Button, IconButton)
│   ├── stores/                 # Pinia store (taskStore)
│   ├── App.vue                 # Main app component
│   ├── main.ts                 # Entry point
├── tests/                      # Unit tests
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
├── package.json                # Project metadata and dependencies
└── README.md                   # Documentation
```
