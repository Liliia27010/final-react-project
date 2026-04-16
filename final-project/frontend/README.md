# Final Project – React in Docker

A portfolio front page rebuilt from static HTML into a React application, running inside Docker.

## Project Structure

```
final-project/
├─ Dockerfile
├─ docker-compose.yml
├─ .dockerignore
├─ .gitignore
├─ package.json
├─ vite.config.js
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ index.css
│  ├─ App.jsx
│  └─ components/
│     ├─ Navbar.jsx / Navbar.module.css
│     ├─ Hero.jsx   / Hero.module.css
│     ├─ Skills.jsx / Skills.module.css
│     ├─ Projects.jsx / Projects.module.css
│     ├─ Contact.jsx  / Contact.module.css
│     └─ Footer.jsx   / Footer.module.css
└─ originalPage/
   └─ index.html   ← the original static HTML page
```

## Run with Docker

```bash
docker compose up --build
```

Then open: http://localhost:5173

## Run locally (without Docker)

```bash
npm install
npm run dev
```

## Original Page

The original static HTML page is in `originalPage/index.html`.  
The React version rebuilds the same page using proper component structure.
