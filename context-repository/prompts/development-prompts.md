# Development Prompts for Human Geography Map

## Project Setup Prompt
```
I'm building a Human Geography Map application using Next.js 15 App Router, React 19, TypeScript, and TailwindCSS. The app should be an interactive world map where users can:

1. Navigate between continents (tabs on desktop, dropdown on mobile)
2. Click countries to isolate them and view detailed information
3. See geographic features (mountains, rivers, lakes, etc.)
4. View country statistics (population, GDP, cultural data)
5. Explore administrative divisions (states/provinces)

Tech stack:
- Next.js 15 with App Router
- React 19 with TypeScript
- TailwindCSS for styling
- Server Actions for authentication
- React-Leaflet for mapping
- REST Countries API and World Bank API for data

Please help me [specific task - e.g., "set up the basic project structure" or "implement the map component"].

Context: I have a context-repository directory with full project documentation.
Current progress: Check /context-repository/progress-tracker.md for current status.
```

## Component Development Prompt
```
I need help building a React component for the Human Geography Map app. Here are the requirements:

Component: [Component Name]
Purpose: [What this component does]
Props needed: [List expected props with types]
Behavior: [How it should behave]

Technical requirements:
- Next.js 15 App Router patterns
- React 19 features where applicable
- TypeScript with strict types
- TailwindCSS for styling
- Responsive design (desktop/mobile)
- Accessibility compliance

Context: This is part of an interactive world map application. Users can click countries to view details, navigate between continents, and explore geographic data.

Current progress: Check /context-repository/progress-tracker.md
Project context: See /context-repository/project-context.md

Please create the component with:
1. Proper TypeScript interfaces
2. Error handling
3. Loading states
4. Responsive design
5. Accessibility features

After completion, please update /context-repository/progress-tracker.md with progress.
```

## API Integration Prompt
```
I'm integrating APIs for the Human Geography Map application. I need help with:

API: [API Name - e.g., REST Countries API, World Bank API]
Endpoint: [Specific endpoint URL]
Purpose: [What data this provides]
Usage pattern: [Server-side fetch, client-side, cached, etc.]

Requirements:
- Next.js 15 Server Actions where appropriate
- TypeScript interfaces for API responses
- Error handling and retry logic
- Data caching strategy
- Rate limiting considerations

Context: This data will be used in an interactive map where users explore countries, their statistics, and geographic features.

Reference files:
- API documentation: /context-repository/api-documentation/
- Current progress: /context-repository/progress-tracker.md
- Project context: /context-repository/project-context.md

Please provide:
1. TypeScript interfaces for the API response
2. Server Action or API route implementation
3. Error handling strategy
4. Caching recommendations
5. Usage example in a component

After completion, update progress-tracker.md and add any new schemas to /context-repository/data-schemas/
```

## Styling and Layout Prompt
```
I need help styling components for the Human Geography Map using TailwindCSS. The design should be:

Component/Section: [What needs styling]
Desktop layout: [Description of desktop layout]
Mobile layout: [Description of mobile layout]
Interactions: [Hover states, active states, etc.]

Design requirements:
- Responsive design (desktop sidebar, mobile bottom panel)
- Modern, clean aesthetic
- Good contrast and accessibility
- Smooth transitions and animations
- TailwindCSS utility classes only

Context: This is an educational geography application with a world map interface. Users click countries to see detailed information panels.

Reference files:
- Design specs: /context-repository/design-specs/
- Progress tracker: /context-repository/progress-tracker.md

Please provide:
1. TailwindCSS classes for the layout
2. Responsive breakpoint handling
3. Animation/transition classes
4. Accessibility considerations
5. Color scheme suggestions

Update progress-tracker.md when complete.
```

## Data Management Prompt
```
I need help with data management for the Human Geography Map application:

Data type: [Countries, Geographic features, User interactions, etc.]
Source: [API, static files, user input]
Usage: [How and where this data is used]
Update frequency: [Static, real-time, periodic]

Requirements:
- TypeScript interfaces
- Data validation
- Caching strategy
- Error handling
- Performance optimization

Context: This app displays country information, geographic features, and statistics from multiple APIs. Data should be efficiently cached and validated.

Reference files:
- Data schemas: /context-repository/data-schemas/
- API docs: /context-repository/api-documentation/
- Progress: /context-repository/progress-tracker.md

Please help with:
1. Data schemas and TypeScript interfaces
2. Fetching and caching strategy
3. Data transformation logic
4. Error handling approaches
5. Performance optimization techniques

Save new schemas to /context-repository/data-schemas/ and update progress tracker.
```

## Debugging and Optimization Prompt
```
I'm experiencing an issue with the Human Geography Map application:

Issue: [Describe the problem]
Component/Feature: [Where the issue occurs]
Expected behavior: [What should happen]
Actual behavior: [What's actually happening]
Error messages: [Any console errors]

Context:
- Next.js 15 App Router
- React 19 with TypeScript
- React-Leaflet for mapping
- [Any other relevant context]

Reference files:
- Progress tracker: /context-repository/progress-tracker.md
- Project context: /context-repository/project-context.md

Code snippet: [Paste relevant code if applicable]

Please help me:
1. Identify the root cause
2. Provide a solution
3. Suggest prevention strategies
4. Recommend testing approaches
5. Optimize performance if applicable

Update progress tracker with resolution details.
```

## Feature Implementation Prompt
```
I want to implement a new feature for the Human Geography Map:

Feature: [Feature name and description]
User story: [As a user, I want to... so that...]
Acceptance criteria: [List of requirements for completion]

Technical considerations:
- Integration with existing map component
- Data requirements and sources
- UI/UX requirements
- Performance implications
- Mobile responsiveness

Context: This feature will be part of an interactive world map where users explore countries and geographic data.

Reference files:
- Project context: /context-repository/project-context.md
- Progress tracker: /context-repository/progress-tracker.md
- Current codebase structure

Please provide:
1. Implementation strategy
2. Component structure
3. Data flow design
4. UI mockup or description
5. Testing approach
6. Integration points with existing code

Move this feature from planned to in-progress in progress-tracker.md when starting.
```

## Code Review Prompt
```
Please review this code for the Human Geography Map application:

File: [filename]
Purpose: [What this code does]
Context: [Where it fits in the app]

[Paste code here]

Please review for:
1. Next.js 15 and React 19 best practices
2. TypeScript usage and type safety
3. Performance considerations
4. Accessibility compliance
5. Code organization and maintainability
6. Error handling
7. Security considerations

Reference files:
- Project standards: /context-repository/project-context.md
- Progress tracker: /context-repository/progress-tracker.md

Specific concerns: [Any specific areas you're unsure about]

Please provide suggestions for improvement and update progress tracker if needed.
```

## Testing Prompt
```
I need help writing tests for the Human Geography Map application:

Component/Feature: [What to test]
Test type: [Unit, integration, e2e]
Testing framework: [Jest, React Testing Library, Playwright, etc.]

Requirements:
- Test user interactions (clicking countries, navigation)
- Test data fetching and error states
- Test responsive behavior
- Test accessibility

Context: This is an interactive map application with complex user interactions and API integrations.

Reference files:
- Component code in /src/
- Progress tracker: /context-repository/progress-tracker.md

Please provide:
1. Test setup and configuration
2. Test cases and scenarios
3. Mock strategies for APIs
4. Accessibility testing approaches
5. Performance testing considerations

Update progress tracker with testing progress.
```

## Quick Reference for Claude

### Essential Files to Check First
1. `/context-repository/progress-tracker.md` - **ALWAYS CHECK FIRST**
2. `/context-repository/project-context.md` - Full requirements
3. `/context-repository/api-documentation/` - API integration guides
4. `/context-repository/data-schemas/` - TypeScript interfaces

### After Each Task
1. Update `/context-repository/progress-tracker.md`
2. Add new schemas to `/context-repository/data-schemas/` if created
3. Document new APIs in `/context-repository/api-documentation/` if integrated
4. Note any architectural decisions in progress tracker

### File Naming Conventions
- Component files: PascalCase (e.g., `WorldMap.tsx`)
- Utility files: camelCase (e.g., `apiUtils.ts`)
- Type files: camelCase with `.types.ts` suffix
- Schema files: kebab-case with `.json` extension
