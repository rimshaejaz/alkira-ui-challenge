## Objective

Implement a simple login process with MFA and demonstrate basic access control. The project evaluates technical skills, design decisions, and problem-solving.

## Features
Login page with email and password input.
Multi-Factor Authentication (MFA) via a mock OTP/code.
Simple sign-up flow redirecting to a separate screen.
Validation for email and password fields.
Protected screen accessible only after successful login + MFA.
Optional support for different user roles:
Read-only: no edit actions visible.
Read/write: edit actions enabled.

Tech Stack
Next.js (React framework)
Cypress (GUI test runner for E2E tests)
Mock authentication (no database required)


## Getting Started
# Prerequisites

Make sure you have Node.js installed (v16+ recommended) and npm or yarn.

# Install Dependencies
# Using npm
npm install

# Or using yarn
yarn install

# Start the development server:
# Using npm
npm run dev

# Using yarn
yarn dev

Open your browser and navigate to: http://localhost:3000

## Running Tests (Cypress GUI)
Cypress is used to test login, MFA, and access control flows.

# Open Cypress GUI
npx cypress open

# Or using yarn
yarn cypress open

In the Cypress GUI, select your test spec file (e.g., login.spec.ts).

The GUI will run the test cases interactively, showing the browser and commands as they execute.

Ensure your Next.js app is running (npm run dev) while executing Cypress tests.