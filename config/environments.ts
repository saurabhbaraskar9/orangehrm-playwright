import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  adminUsername: process.env.ADMIN_USERNAME || 'Admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  apiBaseUrl: process.env.API_BASE_URL || '',
};