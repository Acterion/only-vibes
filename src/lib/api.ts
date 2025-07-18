import { Challenge } from "../../types";

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:8787' : '';

export class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getChallenges(): Promise<Challenge[]> {
    return this.request<Challenge[]>('/api/challenges');
  }

  async getHealth() {
    return this.request<{
      status: string;
      phase: string;
      timestamp: string;
      version: string;
    }>('/health');
  }
}

export const apiClient = new ApiClient();
