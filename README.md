# Objective

Implement a simple login process with MFA and demonstrate basic access control. The project evaluates technical skills, design decisions, and problem-solving.

# Features
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


# Getting Started
## Prerequisites
1. **Clone the Repository**  
git clone repo-url  

2. **Navigate into the Project Folder**  
cd alkira-ui-challenge  

3. **Install Dependencies**  
Make sure you have Node.js installed (v16+ recommended) and npm or yarn. Then, clone the repo.  
Using npm: npm install  
Using yarn: yarn install  

4. **Start the development server**  
Using npm: npm run dev  
Using yarn: yarn dev    

Open your browser and navigate to: http://localhost:3000

5. **Open a New Terminal**  
While the server is running, open a new terminal window and navigate to the project folder again.

6. **Open Cypress**  
Cypress is used to test login, MFA, and access control flows.   
  
npx cypress open 
Using yarn: yarn cypress open  

This will install Cypress if necessary and open the Cypress Test Runner.  

7. **Run the Tests**  
In Cypress interface:  
    Select E2E Testing.    
    Choose Chrome (or preferred browser). 
    Your test spec file (login.cy.ts) is located at cypress/e2e/login.cy.ts    
    Click on login.cy.ts to run these tests.  

If login.cy.ts does not appear:  
    "Click Create New Spec"
    "Set the path as cypress/e2e/login.cy.ts"
    Add your test scripts manually from the file in the repo


The Cypress interface will run the test cases interactively, showing the browser and commands as they execute.

Ensure your Next.js app is running (npm run dev) while executing Cypress tests.