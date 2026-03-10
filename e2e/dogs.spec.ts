import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:5000/api/dogs/random";

test("dog image is loaded on page load", async ({ page }) => {
  const responsePromise = page.waitForResponse(API_URL);
  await page.goto("http://localhost:5173");
  await responsePromise;

  const img = page.locator("img");
  const src = await img.getAttribute("src");

  expect(src).toBeTruthy();
  expect(src!.startsWith("https://")).toBe(true);
});

test("dog image is loaded when button is clicked", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await page.waitForResponse(API_URL);

  const responsePromise = page.waitForResponse(API_URL);
  await page.getByRole("button", { name: /get another dog/i }).click();
  await responsePromise;

  const img = page.locator("img");
  const src = await img.getAttribute("src");

  expect(src).toBeTruthy();
  expect(src!.startsWith("https://")).toBe(true);
});

test("error is displayed when API call fails", async ({ page }) => {
  await page.route(API_URL, (route) => route.abort());
  await page.goto("http://localhost:5173");
  const errorElement = page.getByText(/error/i);
  await expect(errorElement).toBeVisible();
});
