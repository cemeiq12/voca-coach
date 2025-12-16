# Voca-Coach 🎙️

**Voca-Coach** is an AI-powered vocal coaching and mental wellness application designed to help users find peace and confidence in their conversations.

Combining real-time vocal analysis with cognitive behavioral therapy (CBT) techniques, Voca-Coach acts as a supportive companion for mastering difficult conversations and managing vocal health.

## 🌿 "Headspace Vocals" Aesthetic
The application features a custom **Emerald & Lime** theme inspired by nature and clarity (referencing the clean, friendly style of Headspace and TalkHelp).
- **Primary Color**: Emerald (`#10B981`)
- **Secondary Color**: Lime (`#dcfce7`)
- **Design Philosophy**: Calm, spacious, and supportive.

## ✨ Key Features

### 1. 🌬️ Real-time De-escalation
- **Visual Tone Analysis**: Watch your vocal tone in real-time.
- **Stress Detection**: Receive gentle nudges when your pitch or volume indicates rising stress.
- **Goal**: Pause, breathe, and reset before a conversation spirals.

### 2. 📊 Vocal Biomarker Trends
- **Long-term Tracking**: Monitor changes in your voice over days and weeks.
- **Health Indicators**: Detect signs of fatigue, anxiety, or strain through acoustic analysis.
- **Insights**: Get actionable advice on when to rest your voice.

### 3. 📓 Socratic Insight Journal
- **AI Guided Reflection**: A chat-based journal that asks the right questions.
- **CBT Integration**: Challenge negative thought patterns ("distortions") with Socratic questioning.
- **Privacy**: Your thoughts are safe and processed securely.

### 4. 🎭 Persona Practice
- **Simulation**: Practice difficult conversations with AI personas (e.g., "Critical Boss," "Anxious Friend").
- **Cloning**: (Experimental) Clone specific vocal styles to practice mirroring or adaptation.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Bundler**: Turbopack
- **Styling**: Tailwind CSS (with `@tailwindcss/postcss`) + Custom CSS Variables
- **AI Integration**: Google Vertex AI (Gemini Models)
- **State Management**: React Hooks & Context

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

3.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

- `src/app`: App Router pages (`/`, `/dashboard`, `/de-escalation`, etc.)
- `src/components`: Reusable UI components (`Navbar`, `TrendChart`, `ToneVisualizer`).
- `src/lib`: Utility functions and AI client configuration (`vertex.ts`).
- `public/assets`: Static images and SVGs.

---

© 2025 Voca-Coach. All rights reserved.
