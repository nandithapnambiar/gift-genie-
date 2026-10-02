import cors from 'cors';
import crypto from 'node:crypto';
import express from 'express';
import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDirectory = join(__dirname, '..', 'data');
const databasePath = join(dataDirectory, 'gift-genie.sqlite');
if (!existsSync(dataDirectory)) mkdirSync(dataDirectory, { recursive: true });

const db = new Database(databasePath);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    avatar TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS gifts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating REAL NOT NULL,
    reviews INTEGER NOT NULL,
    category TEXT NOT NULL,
    badge TEXT,
    image TEXT NOT NULL,
    explanation TEXT NOT NULL,
    tags TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS saved_gifts (
    user_id TEXT NOT NULL,
    gift_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, gift_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (gift_id) REFERENCES gifts(id) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const seedGifts = [
  ['Personalized Tumbler Bottle', 799, 4.8, 1200, 'Home', 'Best Match', 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop', 'Perfect for their everyday adventures and something they can truly call their own.', ['Practical', 'Personalized']],
  ['The Midnight Library', 499, 4.7, 3400, 'Books', 'Trending', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop', 'A beautiful novel about second chances and infinite possibilities.', ['Books', 'Thoughtful']],
  ['Cute Desk Plant', 599, 4.6, 890, 'Home', 'Budget Friendly', 'https://images.unsplash.com/photo-1460071712208-8d5668ffd1e4?w=500&h=500&fit=crop', 'Bring life and freshness to their workspace with this adorable plant.', ['Home Decor', 'Self-care']],
  ['Custom Photo Frame', 1199, 4.8, 2100, 'Personalized', 'Personalized', 'https://images.unsplash.com/photo-1532694215381-6d2e3fb6b8b9?w=500&h=500&fit=crop', 'Display your favorite memories in style with this elegant custom frame.', ['Personalized', 'Memory']],
  ['Wireless Earbuds', 2499, 4.5, 5600, 'Technology', 'Top Rated', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'Premium audio quality with noise cancellation for music lovers.', ['Technology', 'Practical']],
  ['Smart Watch', 4999, 4.7, 3200, 'Technology', 'Great for Them', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 'Stay connected and track fitness with this stylish smartwatch.', ['Technology', 'Fitness']],
  ['Coffee Mug Set', 1299, 4.7, 1500, 'Home', 'Trending', 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop', 'Start their day right with this beautiful matching mug collection.', ['Home', 'Practical']],
  ['Fashion Tote Bag', 1999, 4.5, 2800, 'Fashion', 'Best Match', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', 'A versatile and stylish bag perfect for any occasion.', ['Fashion', 'Practical']],
  ['Scented Candle Set', 1699, 4.8, 4100, 'Self-care', 'Trending', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop', 'Create a spa-like atmosphere with these luxury scented candles.', ['Self-care', 'Luxury']],
  ['Bluetooth Speaker', 3499, 4.6, 2900, 'Technology', 'Budget Friendly', 'https://images.unsplash.com/photo-1589003077984-894e133814c9?w=500&h=500&fit=crop', 'Portable speaker with incredible sound quality for music enthusiasts.', ['Technology', 'Music']],
  ['Skincare Kit', 2299, 4.7, 1800, 'Beauty', 'Best Match', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop', 'Complete skincare routine for a healthy, glowing complexion.', ['Beauty', 'Self-care']],
  ['Travel Journal', 899, 4.6, 1200, 'Travel', 'Personalized', 'https://images.unsplash.com/photo-1550399105-dff4a826807a?w=500&h=500&fit=crop', 'Document adventures with this beautiful leather-bound journal.', ['Travel', 'Thoughtful']],
];

if (db.prepare('SELECT COUNT(*) AS count FROM gifts').get().count === 0) {
  const insertGift = db.prepare(`
    INSERT INTO gifts (id, name, price, rating, reviews, category, badge, image, explanation, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const seed = db.transaction(() => {
    seedGifts.forEach((gift, index) => insertGift.run(index + 1, ...gift.slice(0, -1), JSON.stringify(gift.at(-1))));
  });
  seed();
}

const app = express();
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1):5\d{2}$/.test(origin);
};
app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json());

const toGift = (gift) => ({ ...gift, tags: JSON.parse(gift.tags) });
const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) =>
  `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
const verifyPassword = (password, stored) => {
  const [salt, key] = stored.split(':');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  const storedKey = Buffer.from(key || '', 'hex');
  const derivedKey = Buffer.from(derived, 'hex');
  return storedKey.length === derivedKey.length && crypto.timingSafeEqual(storedKey, derivedKey);
};
const publicUser = ({ id, name, email, avatar }) => ({ id, name, email, avatar });
const createSession = (userId) => {
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + Number(process.env.SESSION_TTL_DAYS || 30) * 86400000).toISOString();
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(tokenHash, userId, expiresAt);
  return token;
};
const playfulValidationError = (detail = 'Please try again.') => `Oops, even genies get confused sometimes… ${detail}`;
const requireUser = (request, response, next) => {
  const authorization = request.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const session = db.prepare('SELECT user_id, expires_at FROM sessions WHERE token_hash = ?').get(tokenHash);
  if (!session || new Date(session.expires_at) <= new Date()) {
    if (session) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
    return response.status(401).json({ error: 'Authentication required' });
  }
  request.userId = session.user_id;
  request.tokenHash = tokenHash;
  return next();
};

app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.get('/api/gifts', (request, response) => {
  const { q = '', category = '', minPrice, maxPrice } = request.query;
  const parsedMinPrice = minPrice === undefined || minPrice === '' ? null : Number(minPrice);
  const parsedMaxPrice = maxPrice === undefined || maxPrice === '' ? null : Number(maxPrice);
  if ((parsedMinPrice !== null && !Number.isFinite(parsedMinPrice)) ||
      (parsedMaxPrice !== null && !Number.isFinite(parsedMaxPrice)) ||
      (parsedMinPrice !== null && parsedMinPrice < 0) ||
      (parsedMaxPrice !== null && parsedMaxPrice < 0)) {
    return response.status(400).json({ error: 'Price filters must be non-negative numbers' });
  }
  const gifts = db.prepare(`
    SELECT * FROM gifts
    WHERE (@q = '' OR lower(name || ' ' || category || ' ' || explanation) LIKE '%' || lower(@q) || '%')
      AND (@category = '' OR category = @category)
      AND (@minPrice IS NULL OR price >= @minPrice)
      AND (@maxPrice IS NULL OR price <= @maxPrice)
    ORDER BY rating DESC, reviews DESC
  `).all({
    q: String(q),
    category: String(category),
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  });
  response.json(gifts.map(toGift));
});

app.get('/api/gifts/:id', (request, response) => {
  const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(Number(request.params.id));
  if (!gift) return response.status(404).json({ error: 'Gift not found' });
  return response.json(toGift(gift));
});

app.post('/api/auth/signup', (request, response) => {
  const { name = '', email = '', password = '' } = request.body ?? {};
  const normalizedName = String(name).trim();
  const normalizedEmail = String(email).trim().toLowerCase();
  if (normalizedName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || String(password).length < 6) {
    return response.status(400).json({ error: playfulValidationError('please enter a valid name, email, and a 6+ character password.') });
  }
  try {
    const id = crypto.randomUUID();
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(normalizedName)}`;
    db.prepare('INSERT INTO users (id, name, email, password_hash, avatar) VALUES (?, ?, ?, ?, ?)')
      .run(id, normalizedName, normalizedEmail, hashPassword(String(password)), avatar);
    const token = createSession(id);
    return response.status(201).json({ token, user: publicUser({ id, name: normalizedName, email: normalizedEmail, avatar }) });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'An account already exists for this email' });
    throw error;
  }
});

app.post('/api/auth/login', (request, response) => {
  const { email, password } = request.body ?? {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email ?? '').trim().toLowerCase());
  if (!user || !verifyPassword(String(password ?? ''), user.password_hash)) {
    return response.status(401).json({ error: playfulValidationError('that email and password combo seems to have wandered off the map.') });
  }
  const token = createSession(user.id);
  return response.json({ token, user: publicUser(user) });
});

app.post('/api/auth/logout', requireUser, (request, response) => {
  db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(request.tokenHash);
  response.status(204).end();
});

app.get('/api/me/saved', requireUser, (request, response) => {
  const gifts = db.prepare(`
    SELECT g.* FROM gifts g
    INNER JOIN saved_gifts s ON s.gift_id = g.id
    WHERE s.user_id = ?
    ORDER BY s.created_at DESC
  `).all(request.userId);
  response.json(gifts.map(toGift));
});

app.put('/api/me/saved/:giftId', requireUser, (request, response) => {
  const giftId = Number(request.params.giftId);
  const gift = db.prepare('SELECT id FROM gifts WHERE id = ?').get(giftId);
  if (!gift) return response.status(404).json({ error: 'Gift not found' });
  const existing = db.prepare('SELECT 1 FROM saved_gifts WHERE user_id = ? AND gift_id = ?').get(request.userId, giftId);
  if (existing) db.prepare('DELETE FROM saved_gifts WHERE user_id = ? AND gift_id = ?').run(request.userId, giftId);
  else db.prepare('INSERT INTO saved_gifts (user_id, gift_id) VALUES (?, ?)').run(request.userId, giftId);
  return response.json({ saved: !existing });
});

app.post('/api/recommendations', (request, response) => {
  const { budget = '', interests = [], giftStyle = [] } = request.body ?? {};
  const budgetBounds = {
    '500-1000': [500, 1000],
    '1000-2500': [1000, 2500],
    '2500-5000': [2500, 5000],
    '5000-10000': [5000, 10000],
    '10000+': [10000, null],
  }[budget] ?? [null, null];
  const requestedInterests = Array.isArray(interests) ? interests.map(String) : [];
  const requestedStyles = Array.isArray(giftStyle) ? giftStyle.map(String) : [String(giftStyle || '')].filter(Boolean);
  const allGifts = db.prepare('SELECT * FROM gifts ORDER BY rating DESC, reviews DESC').all();
  let gifts = allGifts.filter((gift) =>
    (!budgetBounds[0] || gift.price >= budgetBounds[0]) &&
    (!budgetBounds[1] || gift.price <= budgetBounds[1])
  );
  const score = (gift) => {
    const tags = JSON.parse(gift.tags);
    return requestedInterests.filter((interest) => tags.includes(interest)).length * 3 +
      requestedStyles.filter((style) => tags.includes(style)).length * 2 +
      gift.rating;
  };
  gifts = gifts.sort((a, b) => score(b) - score(a) || b.rating - a.rating || b.reviews - a.reviews);
  if (gifts.length === 0) {
    gifts = allGifts
      .map((gift) => ({ gift, score: score(gift) }))
      .sort((a, b) => b.score - a.score || b.gift.rating - a.gift.rating)
      .slice(0, 4)
      .map(({ gift }) => gift);
  }
  response.json(gifts.map(toGift));
});

const port = Number(process.env.API_PORT || 8787);
export { app };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => console.log(`Gift Genie API running on http://localhost:${port}`));
}
