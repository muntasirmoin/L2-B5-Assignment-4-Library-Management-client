<h1 align="center">📚 Library Management System Client 📚</h1>

# Library Management Client

Frontend application for the Library Management system built with React, Vite, Redux Toolkit Query, and shadcn UI.

<p align="center">
  A full-featured RESTful API for managing books & borrowing in a library.
</p>

## Overview

This frontend app provides a user interface to browse, search, and manage library books. It fetches and manages data via RTK Query from a backend REST API built with Express, TypeScript, and MongoDB.

The UI uses **shadcn UI**, a Tailwind CSS + Radix UI based component library for accessible and customizable UI components.

---

## 🛠️ Tech Stack

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🧩 shadcn UI (based on Radix UI)
- 🔄 Redux Toolkit
- 🚀 Vite

Backend:

- **Express.js** — Server framework
- **TypeScript** — Backend typing
- **MongoDB (Mongoose)** — Database

## 📂 Structure Overview

├── public/ </br>  
├── src/ </br>  
| |── main.tsx </br>  
├ |── app.tsx </br>
│ ├── components/ </br>  
│ ├── constants/ </br>  
│ ├── pages/ </br>  
│ ├── provider/ </br>  
│ ├── redux/ </br>  
│ └── route/ </br>  
├── .gitignore </br>  
├── components.json </br>  
├── eslint.config.js </br>  
├── index.html </br>  
├── package-lock.json </br>  
├── package.json </br>  
├── tsconfig.app.json </br>  
├── tsconfig.json </br>  
├── tsconfig.node.json </br>  
├── vercel.json </br>  
└── vite.config.ts </br>

# 📘 Landing Page Components

This directory contains the UI components used to build the **Landing Page** of the Library Management App. These components are built with **shadcn UI** and **Tailwind CSS**, ensuring accessibility and customizability.

## 📚 Components Overview

### 🧭 Navbar

A responsive navigation bar that allows users to access major sections of the app.

#### Features:

- app name
- Navigation links:
  - **All Books**
  - **Add Book**
  - **Borrow Summary**
- Responsive design for desktop and mobile

---

### 📖 Book Grid

Displays a collection of books in a responsive grid layout.

#### Features:

- Shows book title, author, and availability
- Core actions for each book (e.g. **Borrow**, **Edit**, **Delete**)
- Handles empty state and loading indicators

---

### 🚪 Footer

A simple footer displayed at the bottom of the page.

#### Features:

- Copyright info
- Social Media links
- Responsive and accessible

---

# 📊 Borrow Summary Component

This component displays a summary of all borrowed books using data retrieved from an **aggregation API**. It is part of the **Library Management App**.

---

## 🔍 Purpose

To provide administrators or users with a clear overview of how many times each book has been borrowed.

---

## 📦 Features

- 📚 Displays the following columns:
  - **Book Title**
  - **ISBN**
  - **Total Quantity Borrowed**
  - **Book Detail**
- 📡 Fetches data from an **aggregation API**
- ⏳ Includes loading and error states

---

# ➕ Add New Book Component

This component allows users to create a new book record via a form. Upon successful submission, it redirects the user back to the **Book List** and updates the UI instantly.

# ⚙️ Book Action Buttons & Icons

This module provides individual action buttons for each book entry in the system. These allow users to **Edit**, **Delete**, or **Borrow** a book directly from the UI.

All actions use accessible **shadcn UI** components and follow clean, confirm-driven UX patterns.

---

# 📄 Page List & Route Overview

This directory contains all route-based pages used in the **Library Management App**. Each page handles core features like managing books, borrowing, and viewing summaries.

---

## 🌐 Routes & Pages

### `/books`

📚 **All Books Page**

- Displays a grid of all books.
- Actions: Edit, Delete, Borrow

---

### `/create-book`

➕ **Create New Book**

- Displays a form to add a new book.
- On success: redirects to `/books` and updates UI.

---

### `/books/:id`

🔍 **Book Details Page**

- Shows full details of a single book.
- Useful for read-only views .

---

### `/edit-book/:id`

✏️ **Edit Book**

- Loads book info by ID and allows edits.
- On submit: updates book and redirects to `/books`.

---

### `/borrow/:bookId`

📥 **Borrow Book Form**

- Allows users to borrow a specific book.

---

### `/borrow-summary`

📊 **Borrow Summary Page**

- Aggregated report of books borrowed.
- Fetched from an aggregation API.
- Columns: Title, ISBN, Total Borrowed

---

## 🚀 Getting Started

Follow the steps below to clone, install, and run the project.

---

### 📥 Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/muntasirmoin/L2-B5-Assignment-4-Library-Management-client.git
```

2. **Navigate into the project folder:**

```bash
cd L2-B5-Assignment-4-Library-Management-client
```

3. **Install dependencies:**

Using **npm**:

```bash
npm install
```

---

### ▶️ Run the Development Server

To start the local server:

```bash
npm run dev
```

Then open your browser and visit:

```
http://localhost:5173/
```

---
