import { faker } from '@faker-js/faker';
import { EmployeeData, UserCredentials } from '../types';

export class DataFactory {
  static generateEmployee(): EmployeeData {
    return {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
    };
  }

  static generateEmployeeWithId(): EmployeeData {
    return {
      ...this.generateEmployee(),
      employeeId: faker.string.numeric(6),
    };
  }

  static generateUserCredentials(): UserCredentials {
    return {
      username: faker.internet
        .username()
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, 10),
      password: `Test@${faker.number.int({ min: 1000, max: 9999 })}`,
    };
  }

  static generateFullName(): string {
    return faker.person.fullName();
  }

  static generateEmail(): string {
    return faker.internet.email();
  }

  static generatePhoneNumber(): string {
    return faker.phone.number({ style: 'national' });
  }

  static generateDate(past = true): string {
    const date = past
      ? faker.date.past({ years: 30 })
      : faker.date.future({ years: 1 });
    return date.toISOString().split('T')[0];
  }
}