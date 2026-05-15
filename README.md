# Homeland Jobs — Frontend Assessment 

## Component Architecture (Q11)

```
App
├── Header
├── SearchFilters
├── SortDropdown
├── JobList
│   └── JobCard (multiple)
├── JobModal (shows on job click)
│   └── ProposalForm
├── LoadingSkeleton
├── EmptyState
├── ErrorState
```

**Component Details:**
- **Header**: Receives no props. Manages no state. Parent: App.
- **SearchFilters**: Receives filter values and onChange handlers as props. Manages no state. Parent: App.
- **SortDropdown**: Receives sort value and onChange handler as props. Manages no state. Parent: App.
- **JobList**: Receives filtered/sorted jobs as props. Manages no state. Parent: App.
- **JobCard**: Receives job data and onClick handler as props. Manages no state. Parent: JobList.
- **JobModal**: Receives selected job and onClose handler as props. Manages modal open/close state. Parent: App.
- **ProposalForm**: Receives no props. Manages form state and validation. Parent: JobModal.
- **LoadingSkeleton**: No props/state. Parent: App.
- **EmptyState**: No props/state. Parent: App.
- **ErrorState**: Receives error message and retry handler as props. Parent: App.

---

## Features (Q12–Q15)
- Responsive Job Listings Page (3-col desktop, 2-col tablet, 1-col mobile)
- Sticky header with navigation
- Search bar and 3 filters (Category, Location, Budget)
- Real-time filtering and sorting (Newest, Budget High–Low, Budget Low–High)
- Job cards with all required info and Apply button
- Job Detail Modal with Proposal Submission Form (validation, accessibility)
- Loading skeleton, empty state, and error state with Retry
- Semantic HTML5, no inline styles, meaningful alt text, code comments

---

## Setup Instructions
1. Clone the repo
2. `cd homeland/homeland-jobs`
3. `npm install`
4. `npm run dev`

---

## AI Tools Used
- GitHub Copilot (for code suggestions, refactoring, and documentation)
- ChatGpt (for component structure )

---

## Known Limitations
- No backend/API integration (uses local JSON data)
- Modal accessibility tested for keyboard and screen reader basics only
- No deployment URL provided (local only)

---

Candidate Name: Alma Mideva
Candidate ID: HEH/DK1/006
