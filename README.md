# 🚀 Modern Portfolio & CMS

This is a premium, high-performance portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Magic UI**. It features a custom-built **Admin Dashboard** with a markdown editor and automated Git-based content syncing.

---

## 👨‍💼 About Me

**Deepak Singh**
*Product Manager | Data Engineer | MBA Candidate @ IIT Roorkee*

I leverage data and engineering expertise to build scalable, user-centric products that drive business growth. Currently pursuing an MBA at **IIT Roorkee**, I combine business acumen with over **3 years of hands-on engineering experience**.

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Magic UI](https://magicui.design/), [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **CMS**: custom-built Admin Dashboard with **MDX** support
- **Infrastructure**: [Docker](https://www.docker.com/), [PostgreSQL](https://www.postgresql.org/)

---

## ✨ Key Features

- **Dynamic Blog**: MDX-powered blog with category filtering and SEO optimization.
- **Admin Dashboard**: Secure CMs for creating, editing, and managing blog posts.
- **Automated Git Sync**: Custom integration that pushes blog content to a **private** GitHub repository while keeping the portfolio code **public**.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.
- **Premium UI**: Integrated with Magic UI for high-quality animations and visual excellence.

---

## 📦 Project Structure

```text
├── content/              # Blog posts (Private Submodule)
├── public/               # Static assets & images
├── src/
│   ├── app/              # Next.js App Router (blog, admin, main)
│   ├── components/       # Reusable UI components
│   ├── data/             # Static site data (resume, projects)
│   └── lib/              # Utility functions and Git sync logic
└── ...
```

---

## 🛡️ Setup & Configuration

### Environment Variables
Create a `.env.local` file with the following keys:
```env
ADMIN_PASSWORD=your_password
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO=your_username/your_private_blog_repo
```

### Installation
```bash
npm install
npm run dev
```

---

## 📬 Contact

- **LinkedIn**: [deepak-singh-iitr](https://www.linkedin.com/in/deepak-singh-iitr/)
- **Email**: [deepaksingh4.iitr@gmail.com](mailto:deepaksingh4.iitr@gmail.com)
- **Website**: [dillion.io](https://dillion.io)

---

<p align="center">Made with ❤️ by Deepak Singh</p>
