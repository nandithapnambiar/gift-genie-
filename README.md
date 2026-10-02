# 🎁 Gift Genie

**Find a gift they'll never forget.**

A beautiful, production-quality web application that helps users discover personalized gift recommendations through an intuitive questionnaire and visual discovery interface.

## 🌟 Features

### Core Features
- **Gift Finder**: 5-step guided questionnaire to find personalized gift recommendations
- **Discover**: Browse gifts by category, price, and occasion
- **Smart Recommendations**: AI-powered suggestions based on recipient and preferences
- **Saved Gifts**: Create wishlists and save your favorite gift ideas
- **Gift Details**: Comprehensive product information with multiple purchase options
- **User Profile**: Manage preferences, accessibility settings, and account

### Design & UX
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop
- **Accessibility First**: WCAG compliance with built-in accessibility features
- **Beautiful UI**: Premium design system with carefully curated color palette
- **Micro-interactions**: Smooth animations and delightful transitions
- **Dark Mode Ready**: Preference-based theme support

### Accessibility Features
- Text size adjustment (4 levels)
- High contrast mode
- Reduced motion support
- Keyboard navigation
- Screen reader labels
- Simplified experience mode for users who need it

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: Zustand
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
gift-genie-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GiftCard.tsx
│   │   ├── Input.tsx
│   │   ├── GenieMascot.tsx
│   │   ├── Navigation.tsx
│   │   ├── OptionCard.tsx
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── OnboardingPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── GiftFinderPage.tsx
│   │   ├── RecommendationsPage.tsx
│   │   ├── DiscoverPage.tsx
│   │   ├── SavedGiftsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── GiftDetailPage.tsx
│   │   └── index.ts
│   ├── App.tsx              # Main application component
│   ├── store.ts             # Zustand state management
│   ├── constants.ts         # Color palette, data, and constants
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Sage Green**: `#B8D8BA` - Soft backgrounds, positive states
- **Soft Olive**: `#D9DBBC` - Secondary backgrounds, filters
- **Warm Cream**: `#FCDDBC` - Primary background, cards
- **Coral Pink**: `#EF959D` - Primary accent, CTAs, highlights
- **Deep Mauve**: `#69585F` - Text, headings, navigation

### Typography
- Font Family: Plus Jakarta Sans (Google Fonts)
- Fallback: Inter, System UI
- Clear hierarchy with semantic sizing

### Components
- Button (Primary, Secondary, Ghost variants)
- Input with validation
- Card with hover effects
- Badge for labels
- GiftCard with heart save functionality
- OptionCard for questionnaire
- FilterChip for filtering
- GenieMascot animated SVG
- EmptyState for no data scenarios
- ProgressBar for step indication

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start the backend API in another terminal
npm run api

# Start both services together
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will open at `http://localhost:5173`. The API runs at
`http://localhost:8787`.

## 📝 Features in Detail

### Gift Finder Questionnaire
1. **Who is this gift for?** - Recipient type selection
2. **What do they love?** - Interest selection (multi-select)
3. **What's the occasion?** - Occasion selection
4. **What's your budget?** - Budget range selection
5. **What kind of gift?** - Gift style selection (multi-select)

### Smart Filtering
- Budget ranges from ₹500 to ₹10,000+
- Occasion-based recommendations
- Category filtering
- Rating-based sorting
- Price-based sorting

### User Preferences
- Text size adjustment
- High contrast mode toggle
- Motion reduction support
- Screen reader enhancements
- Simplified experience option
- Language selection (prepared for multi-language)

## 🔌 Backend API

The project includes a Node.js + Express + SQLite API in `server/index.js`.

Available endpoints:
- `GET /api/health`
- `GET /api/gifts`
- `GET /api/gifts/:id`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/me/saved`
- `PUT /api/me/saved/:giftId`
- `POST /api/recommendations`

The SQLite database is created at `data/gift-genie.sqlite` and ignored by Git.
Passwords are salted and hashed with Node's `scrypt` implementation.
Authentication sessions are stored in SQLite with an expiry, so users remain
signed in when the API restarts. Configure `SESSION_TTL_DAYS` to change the
session lifetime.

## 🚀 Deployment

Deployment configuration is included for Vercel and Render:

1. Deploy the repository to Render using `render.yaml`.
2. Copy the Render service URL.
3. Deploy the repository to Vercel.
4. Set the Vercel environment variable `VITE_API_URL` to:
   `https://your-render-service.onrender.com/api`

The Render service includes a persistent disk for the SQLite database.
Set `ALLOWED_ORIGINS` on Render to the deployed Vercel URL (comma-separated
for multiple origins). Do not use `*` for a production deployment.

## 💾 State Management

Using Zustand for lightweight state management:
- Authentication state
- Questionnaire responses
- Saved gifts
- User preferences
- Current page navigation
- Search history

UI preferences and cached state persist to localStorage. Authentication and saved gifts
are synchronized with the Express API when it is running.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Focus indicators on interactive elements
- Reduced motion support via media queries
- Screen reader friendly

## 🎯 Seed Data

The application includes 12 realistic gift products with:
- High-quality product images
- Realistic pricing
- Customer ratings and review counts
- Product descriptions
- Tags and categories

## 🌐 Multi-language Ready

The codebase is structured to support additional languages:
- Hindi
- Malayalam
- Tamil
- Kannada
- Telugu

Language switching can be implemented by connecting to a translation library.

## 📱 Responsive Breakpoints

- Mobile: 320px and above
- Tablet: 768px and above
- Desktop: 1024px and above
- Large Desktop: 1440px and above

## 🔐 Authentication

API-backed authentication:
- Login with email/password
- Signup for new users
- Saved gifts persist in SQLite
- User profile persistence

## 🎬 Animations & Micro-interactions

- Smooth page transitions
- Card hover lift effects
- Heart save animation
- Genie mascot floating animation
- Button press animations
- Loading spinners
- Progress bar transitions

All animations respect `prefers-reduced-motion` preference.

## 📦 Dependencies

- `react`: UI library
- `react-dom`: React rendering
- `zustand`: State management
- `lucide-react`: Icon library
- `tailwindcss`: Utility-first CSS
- `typescript`: Type safety

## 🚀 Future Enhancements

- Real backend integration
- API for gift recommendations
- User accounts and authentication
- Real payment integration
- Browser notifications
- Push notifications
- Email notifications
- Advanced filtering
- Wishlist sharing
- Gift reminders
- Review system
- Social features
- Admin dashboard

## 📄 License

This project is created as a premium consumer startup product.

## 👨‍💼 Contact & Support

For support or questions, please contact the development team.

---

**Made with ❤️ by the Gift Genie Team**

*"Find a gift they'll never forget."*
