<div align="center">
  <img src="src/assets/logo2 cut.png" width="80" alt="NEXUS Logo" />
  <h1>NEXUS</h1>
  <p>A modern social networking platform built with React</p>

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-indigo?style=for-the-badge)](https://sco-nexus.vercel.app/)
  [![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge&logo=github)](https://github.com/Scoopy-Dooo/13-NEXUS)
</div>

---

## About

NEXUS is a full-featured social media web app where users can post, comment, like, follow others, and manage their profiles — all in a sleek dark UI.

## Features

- Auth — register, login, protected routes
- Posts — create, edit, delete, like, bookmark, image upload
- Comments — add, edit, delete, like
- Profile — view, edit, upload profile photo, follow/unfollow
- Post Details — full post view with likes and comments list
- Notifications — (coming soon)
- Messaging — (coming soon)
- Responsive — mobile bottom nav + desktop sidebar

## Tech Stack

- **React 19** + **Vite**
- **React Router v7**
- **TanStack Query v5** — server state & caching
- **React Hook Form** + **Zod** — form validation
- **HeroUI** — component library
- **Tailwind CSS v4**
- **Axios**
- **React Toastify**

## Getting Started

```bash
# Install dependencies
npm install

# Add your environment variables
cp .env.example .env
# Set VITE_API_BASE_URL in .env

# Run dev server
npm run dev
```

## Environment Variables

```env
VITE_API_BASE_URL=https://your-api-url.com/api
```

## Project Structure

```
src/
├── Assets/
├── Components/
│   ├── Layouts/     # NavBar, Layout
│   └── UI/          # ProfileImg, HomeHeader, CommentCard...
├── Contexts/        # Auth & User context
├── Pages/
│   ├── Auth/        # Login, Register
│   ├── Home/
│   ├── Post/
│   ├── Profile/
│   ├── Notifications/
│   ├── Chatting/
│   ├── Settings/
│   └── NotFound/
└── Services/        # API calls
```

---

<div align="center">
  Made with ❤️ by <strong>Mohamed Saad</strong> aka <strong>Scoopy Doo</strong>
</div>
