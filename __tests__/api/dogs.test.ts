import request from "supertest";
import app from "../../server/index";

describe("Dog API", () => {
  test("GET /api/dogs/random returns 200 with valid data", async () => {
    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.imageUrl).toBeDefined();
    expect(typeof res.body.data.imageUrl).toBe("string");
  });

  test("GET /api/dogs/invalid returns 404 with error message", async () => {
    const res = await request(app).get("/api/dogs/invalid");

    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe("Route not found");
  });
});
