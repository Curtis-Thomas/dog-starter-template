import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../index'; 
import * as dogService from '../services/dogService';

describe('dogRoutes', () => {
  it('GET /api/dogs/random should return 200 and success status', async () => {
    const mockImageUrl = "https://images.dog.ceo/breeds/stbernard/n02109525 15579.jpg";
    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue({
      imageUrl: mockImageUrl,
      status: "success"
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockImageUrl);
  });

  it('GET /api/dogs/random should return 500 and error message', async () => {
    vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValue(new Error("Network error"));

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Network error");
  });
});