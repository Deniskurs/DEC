# CLAUDE.md - Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run typecheck` - Run TypeScript type checking (add this command to package.json)

## Code Style
- **TypeScript**: Use strict typing (no `any` unless absolutely necessary) with React.FC<PropsType>
- **Components**: Functional components with hooks, use named exports
- **CSS**: TailwindCSS with custom theme colors (rich-blue, cream) from theme.ts
- **Imports**: Group by: 1) React/libraries, 2) components, 3) hooks, 4) utils/types
- **Animation**: Use framer-motion for animations with consistent patterns
- **Error Handling**: Try/catch with console.error, provide user feedback UI
- **Naming**: PascalCase for components, camelCase for variables/functions, UPPER_CASE for constants
- **State Management**: Use React Query for server state, React context for app-wide state

## Project Structure
- Components are organized by feature/function with nested hierarchy
- Shared utilities in utils/ and hooks/ directories
- Pages/routes should be in pages/ directory with matching route names