[![Review Assignment Due Date](https://cl## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌### c. Unique Features (What's special about this app?) 

**🧠 Procrastination-Aware Intelligence**
- **Reality vs. Expectation Tracking:** The app learns your actual completion patterns vs. your initial estimates, helping you plan more realistically for future tasks
- **Time Tracking Analytics:** Visual charts showing when you're most productive and how long different types of tasks actually take
- **Smart Deadline Warnings:** Adaptive notifications based on your historical completion patterns

**🎨 Adaptive Visual Design**
- **Stress-Responsive UI:** Clean, calming pastel design that reduces visual overwhelm during busy periods
- **Context-Aware Color Coding:** Priority and status indicators that help you quickly identify what needs attention
- **Smooth Mode Transitions:** Seamless dark/light mode switching for different study environments

**📊 Data-Driven Insights**
- **Productivity Patterns:** Analytics showing your peak performance times and completion rates
- **Task Complexity Learning:** The system observes which types of tasks take longer than expected
- **Progress Visualization:** Multiple chart types (line, bar, pie) showing different aspects of your productivity

**🔄 Seamless Integration**
- **Cross-View Synchronization:** Tasks created in one view immediately appear in all others with consistent formatting
- **Flexible Time Formats:** MM/DD/YYYY HH:mm format optimized for Vietnamese academic schedules
- **Persistent State Management:** Your work session continues exactly where you left off, even after browser restarts

**💡 Student-Centric Design**
- **Academic Priority System:** Three-tier priority system (Low/Medium/High) aligned with student workload management
- **Group Project Ready:** Task structure designed to handle both individual assignments and collaborative work
- **Mobile-First Responsiveness:** Optimized for studying on-the-go with smartphone and tablet layoutsVideo Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- "Unlisted" videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

🎬 **Demo Video:** [Coming Soon - Will be uploaded to YouTube as Unlisted]github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# Pepura - Smart Task Management for Vietnamese Students
⚠️ Please complete **all sections marked with the ✍️ icon** — these are required for your submission.

👀 Please Check ASSIGNMENT.md file in this repository for assignment requirements.

## 🚀 Project Setup & Usage
**How to install and run your project:**  

1. Clone the repository:
   ```bash
   git clone https://github.com/NAVER-Vietnam-AI-Hackathon/web-track-naver-vietnam-ai-hackathon-dphongn.git
   cd web-track-naver-vietnam-ai-hackathon-dphongn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## 🔗 Deployed Web URL or APK file
🚀 **Live Demo:** [Coming Soon - Will be deployed to Vercel/Netlify]

📱 **Local Development:** Run `npm run dev` and visit `http://localhost:5173`


## 🎥 Demo Video
**Demo video link (≤ 2 minutes):**  
📌 **Video Upload Guideline:** when uploading your demo video to YouTube, please set the visibility to **Unlisted**.  
- “Unlisted” videos can only be viewed by users who have the link.  
- The video will not appear in search results or on your channel.  
- Share the link in your README so mentors can access it.  

✍️ [Paste your video link here]


## 💻 Project Introduction

### a. Overview

**Pepura** is a comprehensive time management solution specifically designed for Vietnamese university students. The app addresses the daily crisis of time management that students face while juggling classes, group projects, part-time work, and personal life.

The solution provides an intuitive, procrastination-aware task management system that learns from user behavior and helps students better organize their academic and personal responsibilities. With a focus on visual clarity and user experience, Pepura transforms the chaos of student life into manageable, trackable progress.

**Core Problem Solved:** Vietnamese university students struggle to manage dozens of tasks across multiple platforms. Pepura consolidates everything into one smart, adaptive system that works with human psychology rather than against it.

### b. Key Features & Function Manual

**📝 Task Management (CRUD Operations)**
- **Create Tasks:** Add new tasks with title, description, priority (Low/Medium/High), status, estimated time, and due dates
- **Read/View Tasks:** Multiple viewing options including list view and grid view with intuitive status indicators
- **Update Tasks:** Edit task details, update progress, start/stop time tracking with built-in timer
- **Delete Tasks:** Remove completed or cancelled tasks with confirmation prompts

**🎯 Three Distinct Views**
1. **Tasks View:** Main dashboard with task statistics, advanced filtering, search functionality, and interactive task cards
2. **Calendar View:** Monthly calendar with task visualization, deadline tracking, and 24-hour time slot integration
3. **Analytics View:** Comprehensive time tracking dashboard with productivity metrics, charts, and insights

**⏰ Advanced Time Management**
- **Time Estimation vs. Reality:** Track estimated vs. actual completion time for better future planning
- **Built-in Timer:** Start/stop timer for active tasks with real-time tracking
- **Deadline Awareness:** Visual indicators for approaching deadlines and overdue tasks
- **Productivity Analytics:** Charts showing completion patterns, time usage, and productivity trends

**🔍 Smart Organization**
- **Advanced Filtering:** Filter by status (To Do, In Progress, Completed), priority level, and date ranges
- **Real-time Search:** Instant search across task titles and descriptions
- **Visual Status System:** Color-coded priority levels and status indicators with intuitive icons
- **Responsive Layout:** Works seamlessly on desktop, tablet, and mobile devices

**🎨 User Experience**
- **Dual Theme Support:** Light mode (pastel teal/green) and dark mode (blue/purple) with smooth transitions
- **Smooth Animations:** Appear animations and transitions for professional feel
- **Persistent Storage:** All data saved locally with automatic backup and restore
- **Accessibility:** High contrast ratios, clear typography, and intuitive navigation

### c. Unique Features (What’s special about this app?) 

✍️ [Write your content here]

### d. Technology Stack and Implementation Methods

**🔧 Frontend Framework**
- **React 19.1.1:** Latest React with modern hooks and concurrent features for optimal performance
- **TypeScript 5.8.3:** Full type safety and enhanced developer experience
- **Vite 7.1.2:** Lightning-fast build tool and development server

**🎨 UI/UX Libraries**
- **Material-UI (MUI) 7.3.2:** Complete component library with theming system
  - `@mui/material`: Core components (buttons, cards, chips, etc.)
  - `@mui/icons-material`: Comprehensive icon set for visual clarity
  - `@mui/x-date-pickers`: Advanced date/time picker components
  - `@emotion/react & @emotion/styled`: CSS-in-JS styling solution

**📊 Data Visualization**
- **Recharts 3.2.0:** React-based charting library for analytics dashboard
  - Line charts for time tracking trends
  - Bar charts for task completion statistics
  - Pie charts for priority distribution

**⏰ Date/Time Management**
- **date-fns 4.1.0:** Lightweight date manipulation and formatting library
- Custom date helpers for MM/DD/YYYY HH:mm format
- Timezone-aware date handling for accurate deadline tracking

**💾 State Management & Storage**
- **React Context API:** Centralized task state management with custom hooks
- **localStorage:** Persistent client-side storage with automatic serialization
- **Custom Storage Utilities:** Backup/restore functionality and data migration support

**🛠️ Development Tools**
- **ESLint 9.33.0:** Code quality and consistency enforcement
- **TypeScript ESLint:** Enhanced linting for TypeScript-specific patterns
- **React-specific plugins:** Hooks and refresh plugins for optimal development experience

**🏗️ Architecture Patterns**
- **Component-Based Architecture:** Modular, reusable components with clear separation of concerns
- **Custom Hooks Pattern:** Encapsulated logic for task management, theme switching, and storage
- **Context Provider Pattern:** Global state management without prop drilling
- **CSS-in-JS with Theme System:** Centralized styling with light/dark mode support

**📱 Responsive Design Implementation**
- **Mobile-First Approach:** Responsive breakpoints starting from mobile devices
- **CSS Grid & Flexbox:** Modern layout techniques for complex responsive designs
- **Theme-Aware Components:** Automatic adaptation to light/dark mode preferences

### e. Service Architecture & Database structure (when used)

**🏗️ Frontend Architecture**

```
src/
├── components/           # Reusable UI components
│   ├── Analytics/        # Time tracking dashboard
│   │   ├── index.tsx     # Main analytics view
│   │   ├── styles.css    # Component-specific styles
│   │   └── Charts/       # Chart components
│   ├── Calendar/         # Calendar view components
│   │   ├── index.tsx     # Calendar container
│   │   ├── TaskCalendar.tsx # Calendar table logic
│   │   └── styles.css    # Calendar styling
│   ├── Navigation/       # App navigation
│   │   ├── index.tsx     # Navigation bar with theme toggle
│   │   └── styles.css    # Navigation styling
│   └── TaskList/         # Main task management
│       ├── index.tsx     # Task list container
│       ├── TaskForm.tsx  # Task creation/editing form
│       ├── TaskItem.tsx  # Individual task component
│       └── styles.css    # Task-specific styling
├── context/              # State management
│   └── TaskContext.tsx   # Global task state and operations
├── types/                # TypeScript definitions
│   └── Task.ts           # Task interface and enums
├── utils/                # Utility functions
│   ├── dateHelpers.ts    # Date formatting and manipulation
│   ├── localStorage.ts   # Storage operations
│   └── uuid.ts           # Unique ID generation
└── assets/               # Static resources
```

**💾 Data Storage Structure**

**Local Storage Schema:**
```typescript
// Tasks storage
localStorage['tasks'] = [
  {
    id: string,              // Unique identifier
    title: string,           // Task title
    description?: string,    // Optional description
    status: 'todo' | 'in-progress' | 'completed',
    priority: 'low' | 'medium' | 'high',
    estimatedHours?: number, // Time estimation
    actualHours?: number,    // Tracked time
    createdAt: Date,         // Creation timestamp
    dueDate?: Date,          // Optional deadline
    isTimerRunning: boolean, // Timer state
    timerStartTime?: Date    // Timer session start
  }
]

// User preferences
localStorage['theme'] = 'light' | 'dark'
localStorage['viewMode'] = 'grid' | 'list'
```

**🔄 State Management Flow**

1. **TaskContext Provider:** Central state management using React Context
2. **Custom Hooks:** `useTasks()` hook provides CRUD operations and state
3. **Automatic Persistence:** All state changes automatically sync to localStorage
4. **Cross-Component Sync:** Real-time updates across all views (Tasks, Calendar, Analytics)

**📊 Data Flow Architecture**

```
User Action → Component → TaskContext → State Update → localStorage → UI Re-render
     ↑                                                                      ↓
     └── UI Feedback ←── Component Update ←── State Subscription ←──────────┘
```

**🔧 Component Communication**

- **Parent-to-Child:** Props for configuration and data
- **Child-to-Parent:** Callback functions for actions
- **Cross-Component:** Context API for shared state
- **Side Effects:** useEffect hooks for localStorage sync and timer management

**⚡ Performance Optimizations**

- **Lazy Loading:** Components loaded only when needed
- **Memoization:** React.memo for expensive re-renders
- **Efficient Updates:** Minimal state updates with proper dependency arrays
- **Local Storage Debouncing:** Batched writes to prevent excessive storage operations

## 🧠 Reflection

### a. If you had more time, what would you expand?

**🤖 Advanced AI Integration**
- **Smart Task Categorization:** AI-powered automatic tagging and categorization of tasks based on content analysis
- **Procrastination Pattern Learning:** Machine learning model that adapts to individual procrastination patterns and provides personalized productivity recommendations
- **Intelligent Scheduling:** AI assistant that suggests optimal task scheduling based on deadline pressure, estimated difficulty, and personal productivity patterns

**👥 Collaboration Features**
- **Group Project Management:** Real-time collaboration tools for Vietnamese university group assignments with role assignments and progress tracking
- **Study Buddy System:** Connect with classmates for accountability and shared goal tracking
- **Peer Progress Sharing:** Optional social features to share achievements and motivate each other

**📱 Enhanced Mobile Experience**
- **Progressive Web App (PWA):** Full offline functionality with push notifications for deadline reminders
- **Mobile-Specific Gestures:** Swipe actions for quick task updates and intuitive mobile navigation
- **Voice Input:** Vietnamese voice recognition for hands-free task creation during busy periods

**🔗 Academic Integration**
- **University LMS Integration:** Sync with common Vietnamese university systems to automatically import assignment deadlines
- **Academic Calendar Sync:** Integration with university academic calendars and exam schedules
- **Grade Correlation Tracking:** Link task completion patterns with academic performance metrics

**📊 Advanced Analytics**
- **Predictive Analytics:** Forecast completion probability based on historical patterns and current workload
- **Stress Level Monitoring:** Workload analysis with recommendations for task redistribution during high-stress periods
- **Long-term Trend Analysis:** Semester and year-long productivity patterns with improvement suggestions


### b. If you integrate AI APIs more for your app, what would you do?

**🧠 OpenAI GPT Integration**
- **Intelligent Task Breakdown:** Use GPT-4 to automatically break down large assignments into smaller, manageable sub-tasks with realistic time estimates
- **Study Plan Generation:** AI-generated personalized study schedules based on assignment complexity, deadline pressure, and individual learning patterns
- **Smart Reminders:** Context-aware reminder messages that adapt tone and urgency based on task importance and user stress levels

**🔍 Natural Language Processing**
- **Vietnamese Text Analysis:** Process Vietnamese task descriptions to automatically extract deadlines, priority levels, and task categories
- **Smart Search:** Semantic search functionality that understands context and intent, not just keyword matching
- **Auto-Tagging:** Intelligent categorization of tasks using NLP to identify subjects, task types, and difficulty levels

**📊 Predictive Analytics with Machine Learning**
- **Completion Time Prediction:** ML models trained on user behavior to provide accurate time estimates for different types of tasks
- **Procrastination Risk Assessment:** AI algorithms that identify when users are likely to delay tasks and suggest proactive interventions
- **Performance Optimization:** Recommend optimal work sessions and break patterns based on individual productivity data

**🎯 Personalized AI Assistant**
- **Vietnamese Language Chatbot:** AI assistant that understands Vietnamese student context and provides culturally relevant productivity advice
- **Academic Stress Management:** AI-powered recommendations for workload balancing during exam periods and assignment deadlines
- **Learning Pattern Recognition:** Analyze study habits and suggest improvements based on successful patterns from similar student profiles

**🔗 Multi-Platform AI Services**
- **Google Calendar AI:** Intelligent integration with academic schedules and automatic conflict detection
- **Email Processing:** AI scanning of university emails to automatically extract assignment details and deadlines
- **Document Analysis:** OCR and AI processing of syllabus documents to automatically populate semester task lists

**⚡ Real-Time AI Features**
- **Live Productivity Coaching:** Real-time suggestions during work sessions based on current task progress and historical patterns
- **Adaptive Difficulty Adjustment:** AI that learns from completion rates and adjusts task complexity recommendations
- **Contextual Motivation:** Personalized motivational messages and study tips delivered at optimal timing based on user behavior patterns


## ✅ Checklist
- [x] Code runs without errors  
- [x] All required features implemented (add/edit/delete/complete tasks)  
- [x] All ✍️ sections are filled
- [x] Full CRUD operations on tasks (Create, Read, Update, Delete)
- [x] Persistent storage using localStorage
- [x] At least 3 different views (Tasks, Calendar, Analytics)
- [x] Time/date handling with tracking and analytics
- [x] Support for 20+ items with search and filtering
- [x] Clean, responsive UI with dark/light theme
- [x] TypeScript implementation for type safety
- [x] Professional animations and smooth transitions  
