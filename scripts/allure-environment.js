const fs = require('fs');
const path = require('path');

const envContent = `
Browser=Chromium, Firefox, WebKit
Platform=${process.platform}
Node.Version=${process.version}
Framework=Playwright + TypeScript
Application=OrangeHRM Demo
Base.URL=https://opensource-demo.orangehrmlive.com
Execution.Date=${new Date().toISOString()}
`.trim();

const outputDir = path.join(__dirname, '..', 'allure-results');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'environment.properties'), envContent);

// Copy categories.json so Allure picks up custom failure categories
const categoriesSource = path.join(__dirname, '..', 'categories.json');
const categoriesDest = path.join(outputDir, 'categories.json');
if (fs.existsSync(categoriesSource)) {
  fs.copyFileSync(categoriesSource, categoriesDest);
}

console.log('Allure environment.properties and categories.json generated');