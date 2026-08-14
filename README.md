# Keyloop Intelligent Inventory Dashboard

A modern, fast, and interactive web dashboard for dealership managers to view and act upon their vehicle inventory, built with Next.js, Tailwind CSS v4, and shadcn/ui components.

## Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm, yarn, or pnpm

### Installation
1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the App
1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
The project uses Vitest and React Testing Library to test component logic and rendering.
```bash
pnpm test
```

### Linting
To check for code quality and ESLint rules:
```bash
pnpm lint
```

## AI Collaboration Narrative

This project was built entirely through a guided collaboration with an advanced Agentic AI pair programmer. 

### High-level Strategy
My strategy for guiding the AI began by conducting an interactive `/grill-me` session. Instead of upfront micromanagement, I instructed the AI to interview me on critical design decisions—such as the styling preference (Vanilla CSS vs Tailwind), layout (Sidebar vs Top Navigation), and mocked backend architecture. 

### Verification & Debugging Process
Once the plan was mutually agreed upon in the `implementation_plan.md`, the AI autonomously initialized the Next.js App Router codebase, configured Tailwind CSS v4, and integrated `shadcn/ui` for premium, accessible components.

When the AI encountered technical hurdles (e.g., Next.js 15 beta peer-dependency conflicts with testing libraries or strict React hooks linting rules), I verified its debugging approach. I ensured it correctly recognized the difference between local component state and the mocked API layer (`/api/inventory`), preventing cascading effect bugs while preserving the simulated network latency requirement.

### Final Quality Assurance
To ensure the final quality, we set up ESLint and a robust Vitest suite to automatically validate the `InventoryTable`'s sorting and filtering logic. The final architecture cleanly separates the simulated persistence layer from the React UI, delivering the exact "Intelligent Dashboard" requested in Scenario B with a polished, modern aesthetic.
