export interface UserCredentials {
  username: string;
  password: string;
}

export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
}

export interface JobDetails {
  jobTitle?: string;
  department?: string;
  location?: string;
  employmentStatus?: string;
}

export interface PersonalDetails {
  dateOfBirth?: string;
  gender?: 'Male' | 'Female';
  nationality?: string;
  maritalStatus?: 'Single' | 'Married' | 'Other';
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    limit: number;
    offset: number;
  };
}