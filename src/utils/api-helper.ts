import { APIRequestContext } from '@playwright/test';
import { Logger } from './logger';
import { ApiResponse } from '../types';

export class ApiHelper {
  private readonly logger = new Logger('ApiHelper');

  constructor(private readonly request: APIRequestContext) {}

  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    this.logger.info(`GET ${endpoint}`);
    const response = await this.request.get(endpoint, { params });

    if (!response.ok()) {
      this.logger.error(`GET ${endpoint} failed: ${response.status()}`);
      throw new Error(`GET ${endpoint} failed: ${response.status()}`);
    }

    return response.json() as Promise<ApiResponse<T>>;
  }

  async post<T>(
    endpoint: string,
    data: unknown,
  ): Promise<ApiResponse<T>> {
    this.logger.info(`POST ${endpoint}`);
    const response = await this.request.post(endpoint, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok()) {
      this.logger.error(`POST ${endpoint} failed: ${response.status()}`);
      throw new Error(`POST ${endpoint} failed: ${response.status()}`);
    }

    return response.json() as Promise<ApiResponse<T>>;
  }

  async delete(endpoint: string): Promise<void> {
    this.logger.info(`DELETE ${endpoint}`);
    const response = await this.request.delete(endpoint);

    if (!response.ok()) {
      this.logger.error(`DELETE ${endpoint} failed: ${response.status()}`);
      throw new Error(`DELETE ${endpoint} failed: ${response.status()}`);
    }
  }
}