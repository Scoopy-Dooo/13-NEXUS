<div align="center">

<img src="src/assets/logo2 cut.png" width="100" alt="NEXUS Logo" />

<h1>✦ NEXUS</h1>

<p><em>Connect. Share. Belong.</em></p>

<p>
  <strong>Crafted by <a href="https://github.com/Scoopy-Dooo">Mohamed Saad</a> — Scoopy Doo</strong>
</p>

<br/>

<a href="https://sco-nexus.vercel.app/">
  <img src="https://img.shields.io/badge/🚀 Live Demo-Visit Now-6366f1?style=for-the-badge" alt="Live Demo" />
</a>
&nbsp;
<a href="https://github.com/Scoopy-Dooo/13-NEXUS">
  <img src="https://img.shields.io/badge/GitHub-Source Code-181717?style=for-the-badge&logo=github" alt="GitHub" />
</a>

<br/><br/>

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Zod](https://img.shields.io/badge/Zod_Validation-3E67B1?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

</div>

---

## 🌐 What is NEXUS?

NEXUS is a dark-themed, full-featured social networking platform built with modern React. It's designed to feel fast, clean, and intuitive — think Twitter/X but with a deep space aesthetic.

Users can sign up, share posts with images, interact through likes and comments, follow each other, and manage their profiles — all wrapped in a fully responsive layout that works great on both mobile and desktop.

---

## ✨ Features

### 🔐 Authentication
- Secure register & login with full form validation (Zod + React Hook Form)
- Protected routes — guests can't access the app, logged-in users can't revisit auth pages
- Token & user data persisted in localStorage

### 📝 Posts
- Create posts with text, images, and emojis
- Edit and delete your own posts
- Like, bookmark, and share posts
- Real-time optimistic like counter
- Auto-refetch every 2 minutes to keep the feed fresh

### 💬 Comments
- Add, edit, and delete comments on any post
- Like individual comments
- Full comment list on post detail page

### 👤 Profile
- View any user's profile with their posts, followers & following count
- Upload and update your profile photo (instantly reflected across the whole app)
- Follow / Unfollow other users
- Change password from your profile

### 📱 Responsive Design
- Desktop: fixed sidebar navigation
- Mobile: floating bottom navigation bar
- Optimized layout for all screen sizes

### 🔜 Coming Soon
- 🔔 Notifications
- 💬 Real-time Messaging

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| Server State | TanStack Query v5 |
| Forms & Validation | React Hook Form + Zod |
| UI Components | HeroUI |
| Styling | Tailwind CSS v4 |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Icons | React Icons |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Scoopy-Dooo/13-NEXUS.git
cd 13-NEXUS

# 2. Install dependencies
npm install

# 3. Configure environment
echo "VITE_API_BASE_URL=https://your-api-url.com/api" > .env

# 4. Run the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── assets/                  # Images & static files
├── Components/
│   ├── Layouts/             # NavBar, Layout wrapper
│   └── UI/                  # Reusable UI components
├── Contexts/                # Auth & User global state
├── Pages/
│   ├── Auth/                # Login & Register
│   ├── Home/                # Feed
│   ├── Post/                # Post card, details, modal
│   ├── Profile/             # User profile & edit
│   ├── Notifications/       # (coming soon)
│   ├── Chatting/            # (coming soon)
│   ├── Settings/            # (coming soon)
│   └── NotFound/            # 404 page
└── Services/                # All API call functions
```

---

## 📄 License

This project is open source and available under my License.

---

<div align="center">

⭐ If you like this project, give it a star on GitHub!

<br/>

Made with ❤️ and lots of ☕ by **Mohamed Saad** — *Scoopy Doo*

</div>
