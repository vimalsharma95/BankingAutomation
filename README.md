# ExBankingAutomation

This project provides a set of REST APIs for crating a new user, deposit amount, withdraw amount, get balance and sending amount, along with automated testing suite using Cypress.

# Features

**Express for REST APIs**: Built using Node.js and Express to create REST APIs for managing banking operations.
**Cypress for End-to-End Testing**: Automation tests written in Cypress to ensure API functionality and reliability.
**HTML Reports**: Utilizes `cypress-mochawesome-reporter` for generating detailed HTML reports of test runs.
**Background Server**: Uses `forever` to run the server in the background, ensuring continuous availability during testing.



Project Structure:

ExBankingAutomation/
├── server/
│   └── server.js   -- REST API
├── cypress/
│   ├── fixtures/   -- these are the test data files for each API
│   │   ├── createUser.json
│   │   ├── deposit.json
│   │   ├── withdraw.json
│   │   ├── getBalance.json
│   │   └── send.json
│   ├── e2e/   -- these are the test files for each API
│   │   ├── createUser.cy.js
│   │   ├── deposit.cy.js
│   │   ├── withdraw.cy.js
│   │   ├── getBalance.cy.js
│   │   └── send.cy.js
│   ├── support/
│   │   └── commands.js
|       └── e2e.js
│   ├── reports/
│   │   └── html/index.html   -- Execution Report
├── cypress.config.js
├── runner.bat
├── package.json
└── README.md


# Getting Started
Prerequisites:
#Node.js
#npm

My node version is v16.13.1 and npm version is 8.1.2

## Supported Node.js and npm Versions

Node.js: v12.0.0 or higher
npm: v6.0.0 or higher


Installation
1.Clone the repository:

git clone https://github.com/vimalsharma95/BankingAutomation.git

# Install the dependencies:

npm install

# Installing Forever

To run the server in the background, have used 'forever' package.
#Ensure Node.js and npm are installed
run the following command:

npm install -g forever

# Running the Tests

To run Cypress tests and generate HTML reports run below command:

npm run cypress-run-with-html-report

# This command will start the server, execute all the tests and after generating html reports this will stop the server as well

OR on windows, u can also run the runner.bat file present in the project

Cypress Test Details:
Each API has a corresponding Cypress test file located in the cypress/e2e directory. Test data is provided in the cypress/fixtures directory.


# Reports:

HTML reports are generated in the cypress/reports/html directory as index.html