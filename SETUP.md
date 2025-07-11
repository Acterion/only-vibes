# Modern Full-Stack TypeScript Project Setup Guide

This guide documents a comprehensive setup for a modern TypeScript project with React frontend, Cloudflare Workers backend, and sophisticated tooling including TailwindCSS v4, Vite, and ESLint.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Dependencies](#dependencies)
3. [TypeScript Configuration](#typescript-configuration)
4. [Build & Development Setup](#build--development-setup)
5. [Frontend Configuration](#frontend-configuration)
6. [Backend Configuration](#backend-configuration)
7. [CLI Tools](#cli-tools)
8. [Project Structure](#project-structure)
9. [Scripts](#scripts)
10. [Step-by-Step Setup](#step-by-step-setup)

## Project Overview

This is a monorepo setup that includes:

- **Frontend**: React 19 with TypeScript, TailwindCSS v4, shadcn/ui components
- **Backend**: Cloudflare Workers with D1 database, R2 storage, AI bindings
- **CLI Tools**: TypeScript-based command line utilities
- **Build System**: Vite with multi-entry support
- **Type Safety**: Comprehensive TypeScript project references
- **Code Quality**: ESLint 9 with modern TypeScript rules

## Dependencies (use the ones that are relevant to your project)

### Core Frontend Dependencies

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.5.0",
  "@vitejs/plugin-react": "^4.3.4"
}
```

### UI Framework & Styling

```json
{
  "tailwindcss": "^4.0.17",
  "@tailwindcss/vite": "^4.0.17",
  "tailwind-merge": "^3.1.0",
  "clsx": "^2.1.1",
  "class-variance-authority": "^0.7.1",
  "next-themes": "^0.4.6",
  "tw-animate-css": "^1.2.5"
}
```

### Radix UI Components

```json
{
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-avatar": "^1.1.4",
  "@radix-ui/react-collapsible": "^1.1.11",
  "@radix-ui/react-dialog": "^1.1.7",
  "@radix-ui/react-dropdown-menu": "^2.1.7",
  "@radix-ui/react-label": "^2.1.3",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-separator": "^1.1.3",
  "@radix-ui/react-slot": "^1.2.0",
  "@radix-ui/react-tabs": "^1.1.12",
  "@radix-ui/react-tooltip": "^1.2.0"
}
```

### Form Management

```json
{
  "react-hook-form": "^7.55.0",
  "@hookform/resolvers": "^5.0.1",
  "zod": "^3.24.2"
}
```

### Drag & Drop

```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0"
}
```

### AI Integration

```json
{
  "@ai-sdk/openai": "^1.3.6",
  "ai": "^4.2.10"
}
```

### Cloudflare Dependencies

```json
{
  "@cloudflare/d1": "^1.4.1",
  "@cloudflare/vite-plugin": "^1.0.7",
  "@cloudflare/workers-types": "^4.20250415.0",
  "wrangler": "^4.11.0"
}
```

### Development Dependencies

```json
{
  "typescript": "^5.0.0",
  "@types/react": "^19.0.10",
  "@types/react-dom": "^19.0.4",
  "@types/node": "^22.13.14",
  "vite": "^6.2.0",
  "eslint": "^9.21.0",
  "typescript-eslint": "^8.24.1",
  "vitest": "^3.1.1",
  "tsx": "^4.19.3",
  "concurrently": "^9.1.2"
}
```

## TypeScript Configuration

### Project References Structure

The project uses TypeScript project references for better build performance and separation of concerns:

#### `tsconfig.json` (Root Configuration)
```jsonc
{
  "compilerOptions": {
    "types": ["vite/client", "vitest/globals"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "files": [],
  "include": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.cli.json" },
    { "path": "./tsconfig.worker.json" }
  ]
}
```

#### `tsconfig.base.json` (Shared Configuration)
```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/app/*": ["./src/*"],
      "@/types/*": ["./types/*"],
      "@/types": ["./types"]
    },
    "allowImportingTsExtensions": true
  }
}
```

#### `tsconfig.app.json` (Frontend App)
```jsonc
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "jsx": "react-jsx",
    "composite": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts", "./types/**/*.ts"]
}
```

#### `tsconfig.cli.json` (CLI Tools)
```jsonc
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.cli.tsbuildinfo",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "target": "ES2022",
    "composite": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@types": ["./types"]
    },
    "outDir": "dist/cli"
  },
  "include": ["cli/**/*.ts", "types/**/*.ts"]
}
```

#### `tsconfig.worker.json` (Cloudflare Worker)
```jsonc
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist-worker",
    "types": ["@cloudflare/workers-types"],
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "paths": {
      "cloudflare:*": [
        "./node_modules/@cloudflare/workers-types/experimental/cloudflare-*",
        "./node_modules/@cloudflare/workers-types/experimental"
      ]
    }
  },
  "include": ["worker/**/*", "types/**/*", "cli/**/*"]
}
```

## Build & Development Setup

### Vite Configuration

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { cloudflare } from "@cloudflare/vite-plugin";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare(), devtoolsJson()],
  resolve: {
    alias: {
      "@/app": path.resolve(__dirname, "./src"),
      "@/types": path.resolve(__dirname, "./types"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "cv-upload": path.resolve(__dirname, "cv-upload.html"), // Multiple entry points
      },
    },
  },
});
```

### ESLint Configuration (v9)

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

## Frontend Configuration

### TailwindCSS v4 Configuration

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./cv-upload.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### CSS Variables & Theming (change color and theme depending on the project)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}
```

### shadcn/ui Configuration

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Utility Functions

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}
```

## Backend Configuration

### Wrangler Configuration

```jsonc
{
  "name": "your-project-name",
  "main": "worker/index.ts",
  "compatibility_date": "2025-03-07",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  },
  "build": {
    "command": "npm run build"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "your_db_name",
      "database_id": "your-database-id"
    }
  ],
  "r2_buckets": [
    {
      "binding": "FILES_BUCKET",
      "bucket_name": "your-bucket-name",
      "preview_bucket_name": "your-bucket-name-dev"
    }
  ],
  "ai": {
    "binding": "AI"
  },
  "workflows": [
    {
      "name": "your-workflow",
      "binding": "YOUR_WORKFLOW",
      "class_name": "YourWorkflowClass"
    }
  ],
  "observability": {
      "enabled": true,
      "head_sampling_rate": 1
  }
}
```

## CLI Tools

The project includes TypeScript-based CLI tools with their own TypeScript configuration:

### CLI Structure
```
cli/
├── index.ts                    # Main CLI entry point
├── core/                      # Core business logic
│   ├── candidates.ts
│   ├── ensureAPIKey.ts
│   ├── processCV.ts
│   └── processJobDescription.ts
├── scripts/                   # Utility scripts
│   ├── preprocess-job-description.ts
│   ├── summarize-text-test.ts
│   └── summarize-text.ts
└── utils/                     # CLI utilities
    └── script-finder.ts
```

## Project Structure

```
project-root/
├── package.json
├── tsconfig.json              # Root TS config with project references
├── tsconfig.base.json         # Shared TS configuration
├── tsconfig.app.json          # Frontend app configuration
├── tsconfig.cli.json          # CLI tools configuration
├── tsconfig.worker.json       # Worker configuration
├── tsconfig.node.json         # Node tools configuration
├── vite.config.ts             # Vite build configuration
├── eslint.config.js           # ESLint v9 configuration
├── wrangler.jsonc             # Cloudflare Workers configuration
├── components.json            # shadcn/ui configuration
├── index.html                 # Main app entry point
├── cv-upload.html             # Additional entry point (optional)
├── src/                       # Frontend source code
│   ├── main.tsx              # React app entry
│   ├── index.css             # Global styles with CSS variables
│   ├── tailwind.config.ts    # TailwindCSS configuration
│   ├── routes.tsx            # React Router setup
│   ├── vite-env.d.ts         # Vite type definitions
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Frontend utilities
│   ├── views/               # Page components
│   └── assets/              # Static assets
├── types/                    # Shared TypeScript types
│   ├── index.ts             # Main type exports
│   ├── schemas.ts           # Zod schemas
│   └── factories.ts         # Type factories
├── worker/                   # Cloudflare Worker backend
│   ├── index.ts             # Worker entry point
│   ├── api/                 # API routes
│   ├── db/                  # Database schemas
│   ├── scripts/             # Worker scripts
│   └── utils/               # Worker utilities
├── cli/                      # Command line tools
│   ├── index.ts             # CLI entry point
│   ├── core/                # CLI business logic
│   ├── scripts/             # CLI scripts
│   └── utils/               # CLI utilities
├── data/                     # Development data
│   ├── input/               # Input files
│   └── output/              # Output files
└── public/                   # Static public assets
    ├── logo.svg
    ├── logo.jpg
    └── vite.svg
```

## Scripts

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:worker\"",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "cli": "tsx --tsconfig tsconfig.cli.json cli/index.ts",
    "cli:interactive": "tsx --tsconfig tsconfig.cli.json cli/index.ts --interactive",
    "build:types": "tsc --build tsconfig.base.json",
    "build:cli": "tsc --project tsconfig.cli.json",
    "build:app": "tsc --build tsconfig.app.json",
    "dev:frontend": "vite",
    "dev:worker": "wrangler dev --local",
    "dev:db": "wrangler d1 execute your_db_name --local --file=./worker/db/schema.sql",
    "deploy": "npm run build && wrangler deploy"
  }
}
```

## Step-by-Step Setup

### 1. Initialize Project

```bash
mkdir your-project-name
cd your-project-name
npm init -y
```

### 2. Initialize Git

```bash
git init
echo "node_modules\ndist\n.env*\n.wrangler" > .gitignore
```

### 3. Install Dependencies

```bash
# Core dependencies
npm install react@^19.0.0 react-dom@^19.0.0 react-router-dom@^7.5.0

# TailwindCSS v4
npm install -D tailwindcss@^4.0.17 @tailwindcss/vite@^4.0.17 tailwind-merge@^3.1.0 clsx@^2.1.1

# Radix UI (install as needed)
npm install @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-dialog

# Form handling (install as needed)
npm install react-hook-form @hookform/resolvers zod

# Utilities (install as needed)
npm install class-variance-authority next-themes lucide-react sonner tw-animate-css

# AI Integration (optional)
npm install @ai-sdk/openai ai

# Development dependencies
npm install -D typescript@^5.0.0 @types/react@^19.0.10 @types/react-dom@^19.0.4 @types/node@^22.13.14

# Vite
npm install -D vite@^6.2.0 @vitejs/plugin-react@^4.3.4

# ESLint v9
npm install -D eslint@^9.21.0 typescript-eslint@^8.24.1 @eslint/js globals eslint-plugin-react-hooks eslint-plugin-react-refresh

# Testing
npm install -D vitest@^3.1.1 jsdom@^26.0.0 @testing-library/react@^16.2.0 @testing-library/jest-dom@^6.6.3

# CLI tools
npm install -D tsx@^4.19.3 chalk@^5.4.1 inquirer@^12.5.0 @types/inquirer@^9.0.7

# Cloudflare
npm install -D @cloudflare/d1@^1.4.1 @cloudflare/vite-plugin@^1.0.7 @cloudflare/workers-types@^4.20250415.0 wrangler@^4.11.0

# Development utilities
npm install -D concurrently@^9.1.2 dotenv@^16.4.7 autoprefixer@^10.4.21 postcss@^8.5.3
```

### 4. Create Configuration Files

Create all the TypeScript configuration files as shown above:
- `tsconfig.json`
- `tsconfig.base.json`
- `tsconfig.app.json`
- `tsconfig.cli.json`
- `tsconfig.worker.json`
- `tsconfig.node.json`

### 4. Create Build Configuration

- `vite.config.ts`
- `eslint.config.js`
- `wrangler.jsonc`

### 5. Create Frontend Configuration

- `src/tailwind.config.ts`
- `src/index.css`
- `components.json`

### 6. Create Project Structure

```bash
# Frontend
mkdir -p src/{components/{ui,layout},hooks,utils,views,assets}

# Backend
mkdir -p worker/{api/routes,db,scripts,utils}

# CLI
mkdir -p cli/{core,scripts,utils}

# Types
mkdir -p types

# Data
mkdir -p data/{input,output}

# Public
mkdir -p public
```

### 7. Create Entry Points

- `index.html`
- `src/main.tsx`
- `worker/index.ts`
- `cli/index.ts`

### 8. Setup shadcn/ui

```bash
npx shadcn@latest init
```

### 9. Configure Cloudflare

```bash
# Login to Cloudflare
npx wrangler login

# Create D1 database
npx wrangler d1 create your-database-name

# Create R2 bucket
npx wrangler r2 bucket create your-bucket-name
```

## Environment Variables

Create `.env.local`:

```bash
# API Keys
OPENAI_API_KEY=your_openai_key

# Cloudflare (for local development)
CLOUDFLARE_API_TOKEN=your_token
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

## Additional Features

### Testing Setup

The project includes Vitest configuration for testing:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

### Path Aliases

The setup includes comprehensive path aliases:
- `@/app/*` → `./src/*`
- `@/types/*` → `./types/*`
- `@/components` → `./src/components`
- `@/utils` → `./src/utils`

### Multi-Entry Build

Vite is configured to support multiple entry points, allowing for different HTML pages with shared code.

## Best Practices

1. **Type Safety**: Use TypeScript project references for better build performance
2. **Code Quality**: ESLint v9 with modern TypeScript rules
3. **Styling**: TailwindCSS v4 with CSS variables for theming
4. **Components**: shadcn/ui for consistent, accessible components
5. **State Management**: React hooks with proper TypeScript typing
6. **Testing**: Vitest with React Testing Library
7. **Backend**: Cloudflare Workers for serverless backend
8. **Database**: D1 for SQLite-compatible database
9. **Storage**: R2 for object storage
10. **CLI**: TypeScript-based command line tools

This setup provides a robust, type-safe, and scalable foundation for modern web applications with full-stack TypeScript development.
