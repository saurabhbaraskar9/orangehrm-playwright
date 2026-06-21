const fs = require('fs');
const path = require('path');

const historySource = path.join(__dirname, '..', 'allure-report', 'history');
const historyDest = path.join(__dirname, '..', 'allure-results', 'history');

if (fs.existsSync(historySource)) {
  fs.cpSync(historySource, historyDest, { recursive: true });
  console.log('History copied for trend graphs');
} else {
  console.log('No previous history found (first run)');
}