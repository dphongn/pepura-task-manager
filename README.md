[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)
# Pepura - Smart Task Management for Vietnamese Students

## 🚀 Project Setup & Usage

1. Clone and install:
   ```bash
   git clone https://github.com/NAVER-Vietnam-AI-Hackathon/web-track-naver-vietnam-ai-hackathon-dphongn.git
   cd web-track-naver-vietnam-ai-hackathon-dphongn
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

## 🔗 Deployed Web URL
🚀 **Live Demo:** [https://pepura-task-manager.vercel.app/](https://pepura-task-manager.vercel.app/)

## 🎥 Demo Video
🎬 **Demo Video:** [https://youtu.be/fdACPqlczgM](https://youtu.be/fdACPqlczgM)

## 💻 Project Introduction

### a. Overview
**Pepura** is a comprehensive time management solution designed for Vietnamese university students. It addresses time management challenges students face while juggling classes, group projects, and personal life.

The app provides an intuitive, procrastination-aware task management system with a focus on visual clarity and user experience, transforming student chaos into manageable, trackable progress.

**Core Problem Solved:** Consolidates scattered student tasks into one smart, adaptive system that works with human psychology.

### b. Key Features & Function Manual

**📝 Core Functionality**
- **Full CRUD Operations:** Create, read, update, delete tasks with priority, status, estimated time, and due dates
- **Three Views:** Tasks dashboard, Calendar view, Analytics dashboard
- **Smart Search & Filtering:** Real-time search, status/priority/date filtering
- **Responsive Design:** Works on desktop, tablet, and mobile

**⏰ Beauty Clock Timer (Signature Feature)**
- **Circular Countdown:** Stunning SVG-based timer with real-time animations
- **Visual States:** Color-coded states (green/orange/red) with pulse effects
- **Deep Integration:** Auto-syncs with task estimated time
- **Keyboard Controls:** Space (start/pause), Ctrl+S (stop)
- **Desktop Notifications:** Alerts when timer completes
- **Persistent Session:** Timer continues across views and restarts

**📊 Analytics & Insights**
- **Time Tracking:** Estimated vs. actual completion time
- **Productivity Charts:** Line, bar, and pie charts for task patterns
- **Progress Visualization:** Completion rates and productivity trends

**🎨 User Experience**
- **Dual Themes:** Light/dark mode with smooth transitions
- **Smooth Animations:** Professional transitions without flashing
- **Persistent Storage:** Local storage with automatic backup

### c. Unique Features (What's special about this app?)

**🎨 Revolutionary Beauty Clock Timer**
- **SVG-Powered Animations:** Smooth, hardware-accelerated countdown ring
- **Intelligent Visualization:** Dynamic color transitions with pulse effects
- **Always-Present Design:** Seamlessly integrated without workflow disruption
- **Context-Aware:** Auto-syncs timer with task estimated time

**🧠 Student-Centric Design**
- **Vietnamese Academic Focus:** MM/DD/YYYY formatting, group project workflows
- **Procrastination Psychology:** Reality check analytics and gentle accountability
- **Academic Priority System:** Three-tier priority for student workload management
- **Mobile-First:** Optimized for studying on-the-go

**⚡ Advanced Integration**
- **Multi-View Sync:** Instant updates across Tasks, Calendar, Analytics views
- **Context Preservation:** Active sessions persist across browser restarts
- **Time Intelligence:** Pattern recognition and predictive insights

### d. Technology Stack

**🔧 Core Technologies**
- **React 19.1.1** with TypeScript 5.8.3
- **Vite 7.1.2** for lightning-fast builds
- **Material-UI (MUI) 7.3.2** for UI components
- **Recharts 3.2.0** for analytics visualization
- **date-fns 4.1.0** for date/time management

**🏗️ Architecture**
- **Context API** for state management
- **localStorage** for persistence
- **Component-based** modular architecture
- **CSS-in-JS** with theme system

### e. Service Architecture & Database Structure

**Frontend Structure:**
```
src/
├── components/          # UI components (Analytics, Calendar, Clock, TaskList)
├── context/            # TaskContext for global state
├── types/              # TypeScript definitions
├── utils/              # Date helpers, storage, UUID
└── assets/             # Static resources
```

**Data Schema:**
```typescript
Task: {
  id: string, title: string, description?: string,
  status: 'todo' | 'in-progress' | 'completed',
  priority: 'low' | 'medium' | 'high',
  estimatedTime?: number, actualTime?: number,
  createdAt: Date, dueDate?: Date, updatedAt: Date
}
```

## 🧠 Reflection

### a. Future Expansions
- **AI Integration:** Smart task categorization, procrastination pattern learning
- **Collaboration:** Group project management, study buddy system
- **Mobile Enhancement:** PWA, voice input, gesture controls
- **Academic Integration:** University LMS sync, academic calendar integration

### b. AI API Integration Ideas
- **OpenAI GPT:** Intelligent task breakdown, study plan generation
- **NLP:** Vietnamese text analysis, smart search, auto-tagging
- **ML Analytics:** Completion time prediction, procrastination risk assessment
- **AI Assistant:** Vietnamese chatbot, academic stress management

## ✅ Checklist
- [x] Code runs without errors
- [x] All required features implemented (CRUD operations)
- [x] All sections completed
- [x] 3+ views (Tasks, Calendar, Analytics)
- [x] Time/date handling with tracking
- [x] 20+ items support with search/filtering
- [x] Responsive UI with dual themes
- [x] TypeScript implementation
- [x] **Beauty Clock Timer** with real-time animations
- [x] Production ready deployment