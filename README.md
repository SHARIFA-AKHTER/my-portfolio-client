Frontend README.md

# My Portfolio Website – Frontend

## 📝 Project Overview

This is a **personal portfolio website frontend** built using **Next.js**, **TypeScript**, and **Tailwind CSS**.  
It allows the portfolio owner to showcase blogs, projects, and personal information, while providing a secure dashboard for content management.

### **Main Features**

- **Public Pages (Accessible to all visitors):**
  - All Blogs & Individual Blog Pages
  - About Me Section
  - Project Showcase
- **Private Pages (Owner Only):**
  - Dynamic Dashboard to manage blogs and projects
- Responsive and polished UI/UX
- Notifications using `react-hot-toast`

---

## ⚙️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Notifications:** react-hot-toast
- **Routing:** Next.js built-in routing
- **Optional Rich Text Editor:** React Quill (for blog/project content)

---

## 🗂 Folder Structure

/frontend
├─ /components # Reusable UI components (Navbar, Sidebar, Cards)
├─ /pages # Next.js Pages
│ ├─ index.tsx # Home Page
│ ├─ about.tsx # About Me Page
│ ├─ projects.tsx # Project Showcase
│ ├─ blogs # Blogs Page & [id].tsx
│ └─ dashboard # Owner-only Dashboard
├─ /public # Static assets (images, icons)
├─ /styles # Tailwind or custom CSS
├─ /utils # Helper functions
├─ /services # API request functions
└─ package.json

---

## 🚀 Installation & Setup

1. Clone the repository:

```bash
git clone <https://github.com/SHARIFA-AKHTER/my-portfolio-client>


Install dependencies:

cd frontend
npm install


Create .env.local file and add:

NEXT_PUBLIC_API_URL=http://localhost:5000/api


Start the development server:

npm run dev


Visit http://localhost:3000

🔗 Live Deployment

Frontend Live URL: https://your-frontend-link.com

🧑‍💻 Admin Credentials (for testing)

Email: sr0589071@gmail.com

Password: 123456

📹 Demo Video

Project walkthrough: Demo Video Link
