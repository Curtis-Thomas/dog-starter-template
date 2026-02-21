import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

global.fetch = vi.fn();

describe('dogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the correct image URL and success status', async () => {
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe('success');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the API response is not ok', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(getRandomDogImage()).rejects.toThrow("Failed to fetch dog image: Dog API returned status 500");
  });
});