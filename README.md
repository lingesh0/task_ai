# Wise-Agenda

**Wise-Agenda** is an AI-powered task and schedule management web application. It lets users create, view, edit, and delete tasks/events using natural language, also supports voice commands, smart priority, multilingual interface, and notifications.

---

## 🚀 Features

- User Authentication (Sign up, Login, Password Reset)  
- Task / Event creation with both typed input and voice command  
- Natural‐Language Parsing of text to extract date, time, priority, etc.  
- Calendar View + Task Board / Kanban View  
- Smart Prioritization & AI suggestions  
- Notifications / Alerts for upcoming tasks  
- Multi-language support  
- Settings (theme, languages, notifications)  
- (Optional) Admin Panel for user management and oversight  
- Reports / Analytics dashboard  

---

## 🧱 Tech Stack

| Layer | Technology / Library |
|-------|----------------------|
| Frontend | React (with TypeScript) |
| State / Data Fetching | React Query (`@tanstack/react-query`) |
| Routing | React Router |
| UI Components | TailwindCSS, shadcn/ui, Lucide Icons |
| Voice Recognition | Web Speech API or custom hook + maybe external API |
| Backend | Node.js + Express / alternatively Firebase functions (if using Firebase) |
| Database | Firestore (Firebase) or PostgreSQL / MongoDB if custom backend |
| Authentication | Firebase Auth or custom JWT system |
| AI / NLP | OpenAI or Hugging Face for parsing, prioritization models |
| Notifications | Push / Email / In-App toast notifications |
| Multilingual | i18n library (react-i18next or similar) + translation API |

---

## 🔧 How to Run Locally

1. Clone the repository  
   ```bash
   git clone <repo-url>
   cd wise-agenda
