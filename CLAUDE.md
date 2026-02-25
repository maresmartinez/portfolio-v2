# CLAUDE.md

## Project Overview
Personal portfolio website built with Next.js and TypeScript. Deployed on Vercel at `mares-martinez-portfolio.vercel.app`.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **UI**: Tailwind CSS v4 + shadcn-style components (Radix UI + CVA)
- **Icons**: lucide-react
- **Theming**: next-themes (class-based dark mode)
- **Animations**: framer-motion v11
- **Data Fetching**: SWR v2 (GitHub API only, no custom API routes)
- **Styling**: Tailwind v4 (`@import "tailwindcss"`, no tailwind.config.js)
- **Package Manager**: npm

## Project Structure
```
app/                 # Next.js App Router pages
  layout.tsx         # Root layout — wraps with Providers, Navbar, Footer
  providers.tsx      # ThemeProvider wrapper ('use client')
  page.tsx           # Home (/)
  about-me/
  projects/
  technical-writing/
    page.tsx
    raspberrypi-web-server/
    setup-adds/
    using-wds/
    adds-forest/
components/
  ui/                # Primitive components (button, card)
  Navbar/            # Sticky navbar with mobile menu + theme toggle
  ThemeToggle/       # Dark/light mode toggle button
  AnimatedSection/   # framer-motion whileInView wrapper
  Footer/            # Site footer
  ProjectList/       # Fetches GitHub repos via SWR ('use client')
  ProjectItem/       # Individual project card
lib/
  types.ts           # GithubRepo type (named export)
  utils.ts           # cn() utility (clsx + tailwind-merge)
public/              # Static assets — referenced with absolute paths (e.g. /Mares.png)
styles/
  globals.css        # Tailwind v4 imports + @custom-variant dark
```

## Coding Conventions

### Components
- Named exports only: `export function Navbar()` — no default exports
- No `index.ts` re-export files
- Import as: `import { Navbar } from "@/components/Navbar/Navbar"`
- Props typed with a `Type` suffix (e.g. `ProjectItemProps`)
- Destructure props in function parameters
- Client components marked with `'use client'` at the top

### TypeScript
- Strict mode is enabled
- Path alias `@/` resolves to project root (defined in tsconfig.json)
- `GithubRepo` type in `lib/types.ts` — must be imported explicitly
- Use `type` (not `interface`) for prop shapes and data models

### Styling
- Tailwind utility classes only — no CSS Modules
- Dark mode via `dark:` prefix (responds to `.dark` class on `<html>`)
- `cn()` from `lib/utils.ts` for conditional class merging

### Assets
- Images go in `public/` and are referenced with absolute paths: `/image.png`
- Organized by section (e.g. `/raspberrypi-web-server/image001.png`)
- Use `next/image` for regular images; `<img>` is acceptable inside prose article pages

## Common Commands
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # Check lint
```

## Key Patterns

### Adding a new technical writing article
1. Create `app/technical-writing/<slug>/page.tsx`
2. Add the route to the dropdown in `components/Navbar/Navbar.tsx`
3. Add a card entry in `app/technical-writing/page.tsx`

### Data fetching (GitHub repos)
```typescript
const { data, error } = useSWR<GithubRepo[]>(
  'https://api.github.com/users/maresmartinez/repos?sort=updated',
  (url: string) => fetch(url).then((res) => res.json())
);
```
Handle three states: `error`, `!data` (loading), and success.

### No testing framework configured.
