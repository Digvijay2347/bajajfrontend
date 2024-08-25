# Data Processor Application

## Overview

The Data Processor Application is a web application designed to process and analyze a list of data entries provided by the user. The backend, built with Express.js, processes the data and returns specific results, while the frontend, built with React, provides a user-friendly interface for interaction.

## Project Structure

- **frontend/**: Contains the React frontend application.
  - **src/components/DataInput.js**: Main component for data input and processing.
  - **src/App.js**: Main application component.
  - **public/index.html**: HTML template for the React application.
  - **package.json**: Project dependencies and scripts.

- **backend/**: Contains the Express.js backend application.
  - **server.js**: Main server file that handles API requests.
  - **.env**: Environment variables for configuration (e.g., USER_ID, EMAIL).
  - **package.json**: Project dependencies and scripts.

## Features

- **Frontend:**
  - User can input JSON data in a textarea.
  - Supports validation and error handling.
  - Displays processed data based on user-selected options.

- **Backend:**
  - API endpoint `/bfhl` to process data.
  - Returns numbers, alphabets, and the highest lowercase alphabet from the provided data.

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Setup

#### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
