# 💱 Exchange Rates Dashboard

> A React application for viewing historical currency exchange rates.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.10.1-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.5-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Axios](https://img.shields.io/badge/Axios-1.13.2-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)

---

## 📋 Table of Contents

- [About](#-about)
- [Demo](#-demo)
- [Getting Started](#-getting-started)
- [Task Requirements](#-task-requirements)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [API Information](#-api-information)
- [Best Practices Implemented](#-best-practices-implemented)
- [Future Enhancements](#-future-enhancements)

---

## 🎯 About

The application allows users to view exchange rates for a selected base currency against other currencies over the last 7 days from a chosen date (up to 90 days in the past).

## 🎬 Demo

Check out the live demo: [View Demo](https://jam.dev/c/7775ce23-ef5c-46d1-8fca-a711eb4cbde0)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: latest LTS version)
- **npm** 9+ (comes with Node.js 18+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/poormohammadi/exchange-rates.git
   cd exchange-rates
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload when you make changes

---

## 📝 Task Requirements

This application was built to fulfill the following requirements:

✅ **Core Functionality**
- Display exchange rates for the last 7 days from a selected date
- Allow date selection up to 90 days in the past
- Default base currency: GBP
- Show 7 default currencies in a table format

✅ **User Interactions**
- Change the base currency for comparison
- Add/remove currencies from the table
- Minimum 3 currencies, maximum 7 currencies at any time
- Select dates within the allowed range

✅ **Technical Requirements**
- Built with React.js
- State management using Redux Toolkit
- Styling with Material-UI (MUI)
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Unit tests with Jest and React Testing Library
- Clean Git commit history
- Following best practices (DRY, KISS, SOLID)

---

## ✨ Features

- 🔄 **Exchange Rates**: Fetch and display rates from the last 7 days
- 📅 **Date Selection**: Choose any date up to 90 days in the past
- 💱 **Currency Management**: Add/remove currencies with validation (3-7 limit)
- 🔍 **Base Currency Selection**: Switch between any available currency
- 📊 **Data Visualization**: Clean table layout showing rates across multiple days
- ⚡ **Error Handling**: User-friendly error messages with retry functionality
- 🎨 **Modern UI**: Material-UI components for a polished user experience
- 🔒 **Type Safety**: Full TypeScript implementation

---

## 🛠 Tech Stack

### Core Technologies
- **React 19.2.0** - UI library
- **TypeScript 4.9.5** - Type safety
- **Redux Toolkit 2.10.1** - State management
- **React Redux 9.2.0** - React bindings for Redux

### UI & Styling
- **Material-UI (MUI) 7.3.5** - Component library and theming
- **@mui/x-date-pickers 8.18.0** - Date selection component

### Data Fetching & Utilities
- **Axios 1.13.2** - HTTP client
- **Day.js 1.11.19** - Date manipulation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Create React App** - Build tooling

---

## 📁 Project Structure

```
exchange-rates/
├── public/                 # Static assets
├── src/
│   ├── api/               # API layer
│   │   ├── currency.ts    # Currency API functions
│   │   └── index.ts       # API exports
│   ├── components/        # Reusable UI components
│   │   ├── __tests__/     # Component tests
│   │   │   └── DatePicker.test.tsx
│   │   ├── DatePicker/    # Date selection component
│   │   │   ├── DatePicker.tsx
│   │   │   └── index.ts
│   │   └── index.ts       # Component exports
│   ├── pages/             # Page components
│   │   └── exchange-rates/
│   │       ├── ExchangeRatesPage.tsx  # Main page component
│   │       ├── CurrencySelector.tsx   # Currency selection UI
│   │       ├── CurrencyTable.tsx      # Rates table display
│   │       └── index.ts               # Page exports
│   ├── store/             # Redux store
│   │   ├── slices/
│   │   │   └── currencySlice.ts       # Currency state slice
│   │   ├── hooks.ts                   # Typed Redux hooks
│   │   ├── store.ts                   # Store configuration
│   │   └── index.ts                   # Store exports
│   ├── theme/             # MUI theme configuration
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Root component
│   └── index.tsx          # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

---


## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the development server on `http://localhost:3000` |
| `npm run build` | Creates an optimized production build in the `build` folder |
| `npm test` | Launches the test runner in interactive watch mode |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run lint:fix` | Automatically fixes ESLint issues where possible |
| `npm run format` | Formats code using Prettier |
| `npm run format:check` | Checks if code is formatted according to Prettier rules |

---

## 🌐 API Information

The application uses the **free currency API** provided by `@fawazahmed0/currency-api` via CDN:

- **Base URL**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest`
- **Available Currencies**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
- **Exchange Rates**: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/currencies/{currency-code}.json`

**Example API Call:**
```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/gbp.json
```

> **Note**: No API key is required. The API is publicly available via CDN.

---

## 🎓 Best Practices Implemented

### Code Quality
- ✅ **DRY (Don't Repeat Yourself)**: Reusable components and utility functions
- ✅ **KISS (Keep It Simple, Stupid)**: Clean, straightforward implementation
- ✅ **SOLID Principles**: Separation of concerns, single responsibility
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **ESLint**: Consistent code style and error prevention
- ✅ **Prettier**: Automated code formatting

### Architecture
- ✅ **Redux Toolkit**: Modern Redux patterns with async thunks
- ✅ **Component Composition**: Modular, reusable components
- ✅ **API Layer Separation**: Centralized API logic
- ✅ **Type Definitions**: Shared types for consistency
- ✅ **Error Handling**: User-friendly error states

### Testing
- ✅ **Jest**: Unit testing framework
- ✅ **React Testing Library**: Component testing utilities
- ✅ **Test Structure**: Organized test files

### Version Control
- ✅ **Clean Git History**: Meaningful commit messages
- ✅ **Logical Commits**: Atomic, focused changes

---

## 🔮 Future Enhancements

The following improvements are planned for future iterations:

### High Priority
- [ ] **App Router**: A router should be added to handle different urls and pages. Currently we only have one page so I used the component directly
- [ ] **React Query Integration**: Implement React Query for better caching, retries, and background data synchronization
- [ ] **Internationalization (i18n)**: Add `react-i18next` for multi-language support and localized currency formatting

### Medium Priority
- [ ] **Toast Notifications**: Add user-friendly notification system for API errors and success messages
- [ ] **Enhanced Testing**: Expand test coverage with integration tests and e2e tests
- [ ] **Accessibility**: Improve ARIA labels, keyboard navigation, and screen reader support

### Low Priority
- [ ] **Performance Optimization**: Implement code splitting and lazy loading
- [ ] **Dark Mode**: Add theme switching capability

