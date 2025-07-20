# College Application Portal

A comprehensive React-based college application portal with AI assistance, video tutorials, and streamlined application management. Built with Next.js, TypeScript, and Tailwind CSS.

Live Demo https://college-application-portal.netlify.app/)

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

### 1. Overview Dashboard

![Dashboard Overview]<img width="1341" height="643" alt="Screenshot 2025-07-20 at 2 26 41 PM" src="https://github.com/user-attachments/assets/0300d23c-b0b1-43ad-92f2-d74aaeef80ec" />

_Main dashboard with feature cards and navigation_

### 2. Multi-Step Application Form

![Application Form]<img width="1330" height="815" alt="Screenshot 2025-07-20 at 2 27 42 PM" src="https://github.com/user-attachments/assets/3706a37f-5ecb-4777-9c0f-70e60c4a9edc" />

_Step-by-step application form with progress tracking_

### 3. AI Assistant Interface

![AI Assistant]<img width="1350" height="814" alt="Screenshot 2025-07-20 at 2 32 49 PM" src="https://github.com/user-attachments/assets/9991f8dc-a6b6-4abe-88af-99d7735e97cf" />

_AI-powered chat interface with message history_

### 4. Video Tutorial Player

![Video Tutorials]<img width="1411" height="813" alt="Screenshot 2025-07-20 at 2 28 40 PM" src="https://github.com/user-attachments/assets/31aab9cc-7315-4188-846e-9b0f0520daad" />

_Interactive video player with note-taking capabilities_

### 5. Light Mode Interface

![Light Mode]<img width="1297" height="626" alt="Screenshot 2025-07-20 at 2 34 11 PM" src="https://github.com/user-attachments/assets/3a52ab0d-6fde-427e-aeb1-33e8eb3b0904" />

_Full light mode support with theme toggle_

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
