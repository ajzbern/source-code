# Taskpilot Labs

> AI-powered project management for software development teams

Taskpilot Labs is an intelligent project management platform that streamlines the entire software development lifecycle—from initial client requirements to task completion. Leveraging AI to generate detailed specifications, task breakdowns, and project insights, it empowers teams to work smarter and faster.

## 🚀 Features

### For Project Managers & CTOs

- **AI-Enhanced Requirement Processing**: Enter basic project requirements and let AI transform them into comprehensive, production-ready specifications
- **Intelligent Feature Identification**: Automatically extract and identify key features from project descriptions with AI assistance
- **Automated SRS Generation**: Generate complete Software Requirement Specifications with visual diagrams including:
  - System architecture diagrams
  - Workflow diagrams
  - Detailed functional and non-functional requirements
- **Team Assignment**: Seamlessly add and assign team members to projects
- **Project Overview Dashboard**: Get a complete summary before finalizing project creation
- **Advanced Analytics**:
  - Employee work tracking and performance metrics
  - Performance report generation
  - Interactive Gantt charts for timeline visualization
  - Comprehensive event logs and project history
- **AI Research Assistant**: Get instant answers from the internet about technologies, best practices, and solutions

### For Developers & Team Members

- **Jira-like Kanban Board**: Intuitive drag-and-drop interface for task management
- **Task Status Management**: Move tasks through workflow stages (To Do → In Progress → Done)
- **Personal Dashboard**: View all assigned tasks and project details
- **Collaborative Comments**: Add comments and updates to tasks
- **Real-time Updates**: Stay synchronized with team progress

## 📋 Project Creation Workflow

1. **Initial Input**: Enter basic project details and client requirements
2. **AI Enhancement**: System generates an enhanced, detailed project prompt
3. **Feature Identification**: AI identifies key features; review and edit as needed
4. **SRS Generation**: Complete Software Requirement Specification created with diagrams
5. **Team Assembly**: Add team members to the project
6. **Project Summary**: Review complete project overview
7. **Finalization**: Confirm and create project with auto-assigned tasks

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: Next.js, React
- **Authentication**: JWT, NextAuth.js
- **AI Integration**: Google Gemini API
- **Search Integration**: SearXNG
- **Payment Processing**: Razorpay
- **Validation**: Zod

## 🔧 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Razorpay account (for payments)
- Google Cloud account (for OAuth)
- Gemini API key (for AI features)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd source-code
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   
   ```env
   # API Configuration
   API_KEY=your_api_key_here
   
   # JWT Secrets
   JWT_SECRET=your_jwt_secret_here
   JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
   
   # AI Integration
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Search Integration
   SEARCH_API_BASE=your_search_api_base_url
   SEARXNG_API_BASE=your_searxng_api_base_url
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Run the application**
   ```bash
   docker compose up --build
   ```

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000` for nexus go to `http://localhost:3001`

## 📡 API Documentation

The API is built using Express.js and TypeScript with JWT authentication. All routes are relative to the base URL: `http://localhost:8000/api/v1`

### Key Endpoints

- **Authentication**: `/api/v1/admins/login`, `/api/v1/employees/login`
- **Projects**: `/api/v1/projects` (CRUD operations, AI generation)
- **Tasks**: `/api/v1/tasks` (CRUD operations)
- **Employees**: `/api/v1/employees` (Management and assignments)
- **Documents**: `/api/v1/documents` (SRS and documentation)
- **Research**: `/api/v1/research` (AI-powered internet research)

## 🔐 Authentication

- Admin and employee authentication using JWT tokens
- Access tokens for API requests
- Refresh tokens for token renewal
- Google OAuth integration for quick sign-in

## 💳 Subscription & Payments

Integrated with Razorpay for:
- Subscription order creation
- Recurring billing management
- Webhook processing for payment events
- Subscription cancellation

## 🤖 AI Features

- **Smart Prompt Enhancement**: Transforms basic requirements into detailed specifications
- **Feature Extraction**: Identifies key features from project descriptions
- **SRS Generation**: Creates comprehensive Software Requirement Specifications
- **Task Generation**: Automatically breaks down projects into actionable tasks
- **Research Assistant**: Answers technical questions using internet search

## 📊 Analytics & Reporting

- Real-time employee work tracking
- Automated performance reports
- Interactive Gantt charts for project timelines
- Complete audit logs and event history
- Dashboard with project metrics and KPIs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ by the Taskpilot Labs team
