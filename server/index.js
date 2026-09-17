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
const sessions = new Map();
app.use(cors());
app.use(express.json());

const toGift = (gift) => ({ ...gift, tags: JSON.parse(gift.tags) });
const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) =>
  `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
const verifyPassword = (password, stored) => {
  const [salt, key] = stored.split(':');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(derived, 'hex'));
};
const publicUser = ({ id, name, email, avatar }) => ({ id, name, email, avatar });
const requireUser = (request, response, next) => {
  const userId = sessions.get(request.headers.authorization?.replace('Bearer ', ''));
  if (!userId) return response.status(401).json({ error: 'Authentication required' });
  request.userId = userId;
  return next();
};

app.get('/api/health', (_request, response) => response.json({ ok: true }));
app.get('/api/gifts', (request, response) => {
  const { q = '', category = '', minPrice, maxPrice } = request.query;
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
    minPrice: minPrice ? Number(minPrice) : null,
    maxPrice: maxPrice ? Number(maxPrice) : null,
  });
  response.json(gifts.map(toGift));
});

app.get('/api/gifts/:id', (request, response) => {
  const gift = db.prepare('SELECT * FROM gifts WHERE id = ?').get(Number(request.params.id));
  if (!gift) return response.status(404).json({ error: 'Gift not found' });
  return response.json(toGift(gift));
});

app.post('/api/auth/signup', (request, response) => {
  const { name, email, password } = request.body ?? {};
  if (!name || !email || !password || password.length < 6) {
    return response.status(400).json({ error: 'Name, email, and a 6+ character password are required' });
  }
  try {
    const id = crypto.randomUUID();
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    db.prepare('INSERT INTO users (id, name, email, password_hash, avatar) VALUES (?, ?, ?, ?, ?)')
      .run(id, name.trim(), email.trim().toLowerCase(), hashPassword(password), avatar);
    const token = crypto.randomUUID();
    sessions.set(token, id);
    return response.status(201).json({ token, user: publicUser({ id, name, email, avatar }) });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') return response.status(409).json({ error: 'An account already exists for this email' });
    throw error;
  }
});

app.post('/api/auth/login', (request, response) => {
  const { email, password } = request.body ?? {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email ?? '').trim().toLowerCase());
  if (!user || !verifyPassword(String(password ?? ''), user.password_hash)) {
    return response.status(401).json({ error: 'Invalid email or password' });
  }
  const token = crypto.randomUUID();
  sessions.set(token, user.id);
  return response.json({ token, user: publicUser(user) });
});

app.post('/api/auth/logout', requireUser, (request, response) => {
  sessions.delete(request.headers.authorization?.replace('Bearer ', ''));
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
  const { budget = '', interests = [], giftStyle = '' } = request.body ?? {};
  const budgetBounds = {
    '500-1000': [500, 1000],
    '1000-2500': [1000, 2500],
    '2500-5000': [2500, 5000],
    '5000-10000': [5000, 10000],
    '10000+': [10000, null],
  }[budget] ?? [null, null];
  let gifts = db.prepare('SELECT * FROM gifts ORDER BY rating DESC, reviews DESC').all();
  gifts = gifts.filter((gift) =>
    (!budgetBounds[0] || gift.price >= budgetBounds[0]) &&
    (!budgetBounds[1] || gift.price <= budgetBounds[1]) &&
    (!interests.length || JSON.parse(gift.tags).some((tag) => interests.includes(tag))) &&
    (!giftStyle || JSON.parse(gift.tags).includes(giftStyle))
  );
  response.json(gifts.map(toGift));
});

const port = Number(process.env.API_PORT || 8787);
app.listen(port, () => console.log(`Gift Genie API running on http://localhost:${port}`));
