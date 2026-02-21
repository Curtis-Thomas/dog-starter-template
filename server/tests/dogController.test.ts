import { describe, it, expect, vi } from 'vitest';
import * as dogService from '../services/dogService';
import { getDogImage } from '../controllers/dogController';

describe('dogController', () => {
  it('should return success true and the mocked service JSON', async () => {
    const mockServiceData = {
      imageUrl: "https://images.dog.ceo/breeds/collie/n02106030_100.jpg",
      status: "success"
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockServiceData);

    const req = {} as any;
    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis(),
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceData
    });
  });
});