import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { after, before, test } from 'node:test';
import { app } from './index.js';

let server;
let baseUrl;
let token;

before(async () => {
  server = createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

test('reports API health', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test('rejects invalid signup data', async () => {
  const response = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'A', email: 'invalid', password: 'short' }),
  });
  assert.equal(response.status, 400);
});

test('signs up and persists a session token', async () => {
  const email = `test-${Date.now()}@example.com`;
  const response = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'API Test User', email, password: 'password123' }),
  });
  assert.equal(response.status, 201);
  const body = await response.json();
  assert.ok(body.token);
  token = body.token;

  const savedResponse = await fetch(`${baseUrl}/api/me/saved`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(savedResponse.status, 200);
  assert.deepEqual(await savedResponse.json(), []);
});

test('returns close recommendation matches when filters are too narrow', async () => {
  const response = await fetch(`${baseUrl}/api/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ budget: '10000+', interests: ['Books'], giftStyle: ['Luxury'] }),
  });
  assert.equal(response.status, 200);
  assert.ok((await response.json()).length > 0);
});
