# GETTING STARTED - Gift Genie App

## Quick Setup Guide

### 1. Install Dependencies
```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Lucide Icons
- Vite (build tool)

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Start the Backend API
In a second terminal:
```bash
npm run api
```

The API runs at `http://localhost:8787`. To start both services together:
```bash
npm run dev:full
```

### 4. Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder

## 📱 Testing the App

### Initial Login
The app starts with a login page. You can:
1. Enter any email and password to log in
2. Or click "Create an account" to go to signup
3. After signup, you'll see an optional onboarding flow

### Gift Data
The API seeds 12 realistic gift products into SQLite on first start:
- Home page displays popular/trending gifts
- Discover page allows browsing all products
- Gift Finder recommends products based on questionnaire
- All products have ratings, prices, and descriptions

### Test Different Flows

**Gift Finder Flow:**
1. Home → "Find the Perfect Gift ✨" button
2. Answer 5 questions about the recipient
3. Wait for the Genie to load recommendations from the API
4. See personalized recommendations
5. Click "View Details" on any gift

**Discover Flow:**
1. Bottom nav → Discover
2. Search or filter by category
3. Browse all available gifts
4. Click on any gift for details

**Save/Wishlist:**
1. Click the heart icon on any gift card
2. Saved gifts appear in "Saved" tab
3. Can remove from saved by clicking again

**Profile:**
1. Bottom nav → Profile
2. Adjust text size, contrast, motion preferences
3. View account settings
4. Log out to return to login

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
```javascript
colors: {
  sage: '#B8D8BA',
  olive: '#D9DBBC',
  cream: '#FCDDBC',
  coral: '#EF959D',
  mauve: '#69585F',
}
```

### Typography
Default font: Plus Jakarta Sans (from Google Fonts)
Edit `src/index.css` to change fonts

### Products
Edit `src/constants.ts` to add/modify the MOCK_PRODUCTS array

## 📝 Project Features

✅ Fully responsive (mobile-first design)
✅ Beautiful component library
✅ Zustand state management
✅ Accessibility features (text size, high contrast, reduced motion)
✅ API-backed authentication
✅ SQLite persistence for users and saved gifts
✅ Local storage persistence
✅ Loading states and animations
✅ Empty states with helpful messages
✅ Error handling
✅ Keyboard navigation ready

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run backend API tests
npm run test:api
```

## 📁 Key Files to Modify

- `src/constants.ts` - Add/edit gift products and options
- `src/store.ts` - Modify state management logic
- `src/components/` - Edit or create new components
- `src/pages/` - Edit page layouts
- `tailwind.config.js` - Customize design tokens
- `src/index.css` - Global styles

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🆘 Troubleshooting

**App won't start?**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Make sure Node.js version is 16+

**Styles not loading?**
- Ensure Tailwind is configured correctly in tailwind.config.js
- Check that src/index.css imports are present

**Images not showing?**
- Mock products use Unsplash URLs which require internet connection
- Can be replaced with local image paths

## 📚 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Full page components
├── App.tsx        # Main app component
├── store.ts       # State management
├── constants.ts   # Data and constants
└── index.css      # Global styles
```

## 🎯 Next Steps

1. ✅ All pages and features are implemented
2. Ready to customize with your own data
3. Can integrate with backend API
4. Deploy to production (Vercel, Netlify, etc.)

## 📞 Support

Refer to README.md for detailed documentation
