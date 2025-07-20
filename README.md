# College Application Portal

A comprehensive React-based college application portal with AI assistance, video tutorials, and streamlined application management. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### ✅ Core Features Completed

#### 1. **Multi-Step Application Form**

- 5-step guided application process with progress tracking
- Auto-save functionality (every 30 seconds)
- Draft saving and loading capabilities
- Application preview mode before submission
- Profile completeness indicator

#### 2. **AI-Powered Assistant**

- Intelligent chatbot using OpenAI GPT-4-turbo
- Real-time typing indicators during AI responses
- Message history management with search functionality
- Quick question templates for common queries
- Chat statistics and conversation clearing

#### 3. **Interactive Video Tutorials**

- Custom video player with full controls (play, pause, forward, backward)
- Individual progress tracking for each tutorial
- Timestamp-based note-taking system
- Video transcript display
- Tutorial playlist navigation
- Progress persistence across sessions

#### 4. **Document Management**

- Drag-and-drop file upload with PDF validation
- File size limits (10MB max)
- Support for transcripts, recommendations, and additional documents
- Visual upload feedback and error handling

#### 5. **Accessibility & UX**

- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- Dark/Light mode toggle with system preference detection
- Responsive design for all screen sizes
- High contrast support
- Focus management and visual indicators

### 🛠️ Technical Stack

- **Frontend**: React 18, Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: AI SDK with OpenAI
- **State Management**: Custom React hooks
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### 1. Clone the Repository

### 2. Install Dependencies

\`\`\`bash
npm install

# or

yarn install
\`\`\`

### 3. Environment Setup

Create a \`.env.local\` file in the root directory:

\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev

# or

yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
college-application-portal/
├── app/
│ ├── api/chat/route.ts # AI chat API endpoint
│ ├── layout.tsx # Root layout with theme provider
│ ├── page.tsx # Main application page
│ └── globals.css # Global styles and Tailwind
├── components/
│ ├── ui/ # shadcn/ui components
│ ├── application-form.tsx # Multi-step application form
│ ├── ai-assistant.tsx # AI chatbot interface
│ ├── video-tutorial.tsx # Video player with notes
│ ├── file-upload.tsx # Drag-and-drop file upload
│ ├── profile-completeness.tsx # Progress indicator
│ ├── header.tsx # Navigation header
│ └── mode-toggle.tsx # Dark/light mode toggle
├── hooks/
│ ├── use-application-form.ts # Form state management
│ ├── use-chat-history.ts # Chat history management
│ └── use-video-progress.ts # Video progress tracking
└── README.md
\`\`\`

## 🎯 Component Documentation

### ApplicationForm Component

**Purpose**: Multi-step form for college application submission

**Props**: None (uses internal state management)

**Key Features**:

- 5-step wizard interface
- Auto-save and draft functionality
- Progress tracking
- Preview mode

**Usage**:
\`\`\`tsx
import { ApplicationForm } from '@/components/application-form'

<ApplicationForm />
\`\`\`

### AIAssistant Component

**Purpose**: AI-powered chat interface for application assistance

**Props**: None (uses AI SDK hooks)

**Key Features**:

- Real-time AI responses
- Message history with search
- Typing indicators

**Usage**:
\`\`\`tsx
import { AIAssistant } from '@/components/ai-assistant'

<AIAssistant />
\`\`\`

### VideoTutorial Component

**Purpose**: Interactive video player with note-taking capabilities

**Props**: None (manages internal tutorial state)

**Key Features**:

- Custom video controls
- Progress tracking per tutorial
- Timestamp-based notes
- Tutorial playlist

**Usage**:
\`\`\`tsx
import { VideoTutorial } from '@/components/video-tutorial'

<VideoTutorial />
\`\`\`

### FileUpload Component

**Purpose**: Drag-and-drop file upload with validation

**Props**:

- \`label\`: string - Display label for the upload area
- \`description\`: string - Help text for users
- \`onFileSelect\`: (file: File | null) => void - Callback when file is selected
- \`acceptedTypes\`: string - Accepted file types (default: ".pdf")

**Usage**:
\`\`\`tsx
import { FileUpload } from '@/components/file-upload'

<FileUpload
label="Upload Transcript"
description="Upload your official transcript (PDF only)"
onFileSelect={(file) => handleFileSelect(file)}
acceptedTypes=".pdf"
/>
\`\`\`

## 🎨 Key Interface Screenshots

### 1. Application Overview Dashboard

![Dashboard Overview](https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop)
_Main dashboard with feature cards and navigation_

### 2. Multi-Step Application Form

![Application Form](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop)
_Step-by-step application form with progress tracking_

### 3. AI Assistant Interface

![AI Assistant](https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop)
_AI-powered chat interface with message history_

### 4. Video Tutorial Player

![Video Tutorials](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop)
_Interactive video player with note-taking capabilities_

### 5. Dark Mode Interface

![Dark Mode](https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=500&fit=crop)
_Full dark mode support with theme toggle_

## 🔧 Custom Hooks

### useApplicationForm

Manages application form state, validation, and persistence.

**Returns**:

- \`formData\`: Current form data object
- \`updateFormData\`: Function to update form fields
- \`currentStep\`: Current step index
- \`setCurrentStep\`: Function to change steps
- \`completeness\`: Profile completion statistics

### useChatHistory

Manages AI chat message history and search functionality.

**Parameters**:

- \`messages\`: Array of chat messages

**Returns**:

- \`chatHistory\`: Stored chat messages
- \`searchHistory\`: Function to search through messages
- \`clearHistory\`: Function to clear chat history

### useVideoProgress

Tracks video progress and manages notes for each tutorial.

**Parameters**:

- \`videoId\`: Unique identifier for the video

**Returns**:

- \`progress\`: Current video progress (0-100)
- \`updateProgress\`: Function to update progress
- \`notes\`: Array of timestamped notes
- \`addNote\`: Function to add new notes

## 🌟 Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Comprehensive ARIA labels and live regions
- **Focus Management**: Proper focus indicators and management
- **High Contrast**: Support for high contrast mode
- **Semantic HTML**: Proper heading structure and landmarks
- **Alternative Text**: Descriptive alt text for all images and icons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] College database integration
- [ ] Application status tracking
- [ ] Email notifications for deadlines
- [ ] Faculty review portal
- [ ] Mobile app version
- [ ] Integration with Common Application
- [ ] Scholarship matching system
