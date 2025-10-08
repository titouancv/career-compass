# Career Compass 🧭

A modern web application built with Nuxt.js to help students navigate their educational journey by discovering and exploring high schools (lycées) in Paris. This platform provides comprehensive information about schools, their specialties, and helps students make informed decisions about their academic path.

## 🌟 Features

- **School Discovery**: Browse and search through Parisian high schools
- **Interactive Selection**: Choose schools, classes, and specialties through an intuitive interface
- **Detailed Information**: Access comprehensive data about each school including:
  - Contact information and location
  - Available specialties and programs
  - Student enrollment and success rates
  - School type (public/private)
- **Smart Filtering**: Filter schools by arrondissement, specialties, and other criteria
- **Responsive Design**: Optimized for all devices with Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: [Nuxt.js 4](https://nuxt.com/) with Vue 3
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Type Safety**: TypeScript
- **API**: Server-side API routes for school data management

## 📁 Project Structure

```
career-compass/
├── app/                    # Main application entry
├── components/            # Reusable Vue components
│   ├── AppButton.vue
│   ├── AppHeader.vue
│   ├── ClasseSelector.vue
│   ├── HighSchoolSelector.vue
│   └── ...
├── composables/           # Vue composables for shared logic
├── pages/                 # Application routes
│   ├── lycees.vue         # School listing page
│   ├── recherche-lycees.vue
│   └── test-lycee.vue
├── server/api/           # API endpoints
│   └── lycees/           # School-related endpoints
├── types/                # TypeScript type definitions
└── docs/                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, pnpm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/titouancv/career-compass.git
cd career-compass
```

2. Install dependencies:
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Building for Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Preview the production build locally:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📚 API Documentation

The application includes a comprehensive API for managing school data. See [`docs/API_LYCEES.md`](./docs/API_LYCEES.md) for detailed endpoint documentation.

### Key Endpoints

- `GET /api/lycees` - Retrieve all schools
- `GET /api/lycees/[id]` - Get specific school details
- `GET /api/lycees/search` - Search schools with filters

## 🎯 Usage

1. **Browse Schools**: Navigate to the schools page to view all available lycées
2. **Select Preferences**: Use the interactive selectors to choose your preferred school, class level, and specialties
3. **Explore Details**: Click on schools to view detailed information including contact details, programs, and statistics
4. **Filter Results**: Use search and filter options to narrow down schools based on your criteria

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is private and proprietary.

## 🔗 Additional Resources

- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Built with ❤️ using Nuxt.js and Vue 3
