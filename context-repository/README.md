# Human Geography Map - Context Repository

This directory contains all the context, prompting data, and configuration for the Human Geography Map project.

## Directory Structure
```
context-repository/
├── README.md
├── project-context.md
├── progress-tracker.md          # Track completed features and next steps
├── api-documentation/
│   ├── countries-api.md
│   ├── world-bank-api.md
│   ├── geographic-data.md
├── data-schemas/
│   ├── country-schema.json
│   ├── city-schema.json
│   ├── geographic-feature-schema.json
├── design-specs/
│   ├── ui-components.md
│   ├── responsive-design.md
│   ├── user-interactions.md
├── prompts/
│   ├── development-prompts.md
│   ├── feature-prompts.md
│   ├── debugging-prompts.md
└── assets/
    ├── sample-data/
    └── references/
```

## Quick Start
1. Review `project-context.md` for full project overview
2. Check `progress-tracker.md` for current status and next steps
3. Check `api-documentation/` for API integration guides
4. Use prompts in `prompts/` directory for Claude assistance
5. Reference data schemas when building components

## Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Server Actions
- **Mapping**: React-Leaflet + OpenStreetMap
- **Data**: REST Countries API, World Bank API, GeoJSON

## For Claude: Context Update Instructions

### How to Update Context
When working on this project, Claude should:

1. **Always check `progress-tracker.md` first** to understand current status
2. **Update progress tracker** after completing any feature or task
3. **Add new schemas** to `data-schemas/` when creating new data structures
4. **Document new APIs** in `api-documentation/` when integrating new services
5. **Update prompts** in `prompts/` when creating reusable development patterns

### Files to Monitor for Changes
- `progress-tracker.md` - **MOST IMPORTANT** - update after every task completion
- `project-context.md` - Update when requirements change
- Data schema files - Update when TypeScript interfaces change
- API documentation - Update when adding new endpoints or services

### Progress Tracking Format
In `progress-tracker.md`, use this format:
```markdown
## [Date] - [Feature/Task Name]
- Status: ✅ Complete | 🚧 In Progress | ⏳ Planned | ❌ Blocked
- Description: What was accomplished
- Files Changed: List of files modified
- Next Steps: What to do next
- Notes: Any important details
```
