<div align="center">

<img src="public/voca-coach-icon.svg" alt="Voco-Coach Logo" width="120" height="120" />

<br />

<h1>Voco-Coach</h1>

### AI-Powered Voice & Emotional Intelligence Coaching Platform

A comprehensive therapy and communication coaching application that helps users improve their vocal delivery, emotional awareness, and conversation skills through real-time AI feedback.

<br />

[Report Bug](https://github.com/cemeiq12/voco-coach/issues) · [Request Feature](https://github.com/cemeiq12/voco-coach/issues)

<br />

![Next.js](https://img.shields.io/badge/Next.js-16.0-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

<br />

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)
![Maintenance](https://img.shields.io/badge/Maintained-yes-green?style=flat-square)

</div>

<br />

---

## Table of Contents

<details>
<summary>Click to expand</summary>

- [About The Project](#about-the-project)
  - [The Problem](#the-problem)
  - [Our Solution](#our-solution)
  - [Who Is This For](#who-is-this-for)
- [Features In Depth](#features-in-depth)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Team](#team)
- [Acknowledgments](#acknowledgments)
- [License](#license)

</details>

---

## About The Project

### The Problem

Public speaking and social interactions are among the top fears for people worldwide. Whether it's a job interview, a difficult conversation with a boss, or just daily social anxiety, many struggle to communicate effectively.
- Professional coaching is often expensive and inaccessible.
- "Soft skills" like tone regulation and emotional intelligence are hard to practice alone.
- Traditional journals don't offer feedback or guidance.

### Our Solution

**Voco-Coach** is an intelligent partner that bridges the gap between self-help and professional therapy. We provide three distinct modes:

<table>
<tr>
<td width="50%" valign="top">

#### 🎙️ Live Coaching

Real-time voice analysis for immediate feedback on your communication style.

**How it works:**
1. Start a recording session
2. Speak naturally about any topic
3. Receive instant analysis on tone, clarity, and stress
4. Get AI-generated guidance on how to improve
5. Track your calm scores over time

</td>
<td width="50%" valign="top">

#### 🧠 Socratic Journal

A reflective tool that helps you process emotions through guided questioning.

**How it works:**
1. Write down your thoughts and feelings
2. AI analyzes your entry for cognitive distortions
3. Receive Socratic questions ($Q \rightarrow A \rightarrow Q'$)
4. Engage in a deep, reflective conversation
5. Gain clarity and emotional balance

</td>
</tr>
</table>

### Who Is This For

| User Profile | How Voco-Coach Helps |
|:----------|:----------------------|
| **Job Seekers** | Practice interview answers with "Difficult Boss" personas |
| **Public Speakers** | Monitor pitch variation and clarity to improve delivery |
| **Social Anxiety** | Low-stakes environment to practice social interactions |
| **Students** | Build confidence for presentations and oral exams |
| **Anyone** | Track emotional well-being and build resilience |

---

## Features In Depth

<table>
<tr>
<td width="50%" valign="top">

### 🎭 AI Persona Practice

Simulate high-stakes scenarios with customizable AI characters:

- **Pre-built Personas**: Difficult Boss, Supportive Friend, Anxious Client
- **Custom Personas**: Create unique characters with specific traits
- **Real-time Interaction**: Voice-to-voice conversation
- **Adaptive Responses**: AI reacts to your tone and content
- **Scenario Replay**: Review your performance

</td>
<td width="50%" valign="top">

### 📊 Biomarker Analytics

Visualize your vocal health and emotional trends:

- **Pitch Tracking**: Monitor Hz variation for engagement
- **Clarity Scoring**: AI assessment of articulation
- **Stress Indicators**: Detect vocal tension
- **7-Day Trends**: Visualize progress over time
- **Health Insights**: AI-generated tips based on data

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Professional Therapy

Seamlessly connect with human professionals:

- **Therapist Finder**: Browse and filter approved therapists
- **Online Status**: See who is available for immediate chat
- **Integrated Booking**: Schedule sessions directly in-app
- **Session Notes**: Shared notes between you and your therapist
- **Secure Chat**: Private, real-time messaging

</td>
<td width="50%" valign="top">

### Admin & Security

Robust management and protection:

- **Role-Based Access**: User, Therapist, and Admin roles
- **Dashboard Stats**: Platform-wide usage metrics
- **User Management**: Approve therapists and manage users
- **Secure Auth**: JWT with bcrypt hashing & auto-logout
- **Data Privacy**: Protected API routes and private sessions

</td>
</tr>
</table>

---

## Technology Stack

### Frontend Architecture

| Technology | Version | Purpose |
|:-----------|:--------|:--------|
| **Next.js** | 16.0 | React framework with App Router |
| **React** | 19.x | Component-based UI library |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.x | Utility-first styling |
| **Framer Motion** | 12.x | High-performance animations |

### Backend & Database

| Technology | Purpose |
|:-----------|:--------|
| **Node.js** | Runtime environment |
| **Prisma ORM** | Type-safe database client |
| **SQLite** | Lightweight relational database (Dev) |
| **Socket.IO** | Real-time bidirectional communication |
| **JWT** | Secure stateless authentication |

### AI & Services

| Technology | Purpose |
|:-----------|:--------|
| **Google Gemini 2.0** | LLM for persona & Socratic logic |
| **ElevenLabs** | Ultra-realistic Text-to-Speech |
| **Web Audio API** | Real-time waveform visualization |
| **Bcrypt** | Password encryption |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│   │   Dashboard  │  │   Live       │  │   Journal    │  │   Persona    │        │
│   │    Home      │  │   Session    │  │    Chat      │  │   Practice   │        │
│   └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                   API LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│   │   /auth    │ │   /tts     │ │ /analyze   │ │ /sessions  │ │ /socket    │    │
│   │    JWT     │ │ ElevenLabs │ │  Gemini    │ │   CRUD     │ │ Real-time  │    │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘    │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              EXTERNAL SERVICES                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐              │
│   │   Google Vertex  │  │    ElevenLabs    │  │   Socket.IO      │              │
│   │   Gemini 2.0     │  │       TTS        │  │     Server       │              │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘              │
│                                                                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                DATABASE LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌─────────────────────────────────────────────────────────────────────────┐   │
│   │                        SQLite + Prisma ORM                              │   │
│   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │
│   │  │  Users  │ │Sessions │ │ Journals│ │Personas │ │Therapy  │           │   │
│   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │   │
│   └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- [ElevenLabs API Key](https://elevenlabs.io)
- [Google Gemini API Key](https://ai.google.dev)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/cemeiq12/voco-coach
cd voco-coach

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# (Edit .env.local with your keys)

# 4. Initialize database
npx prisma generate
npx prisma db push

# 5. Seed database (Optional)
npx tsx prisma/seed.ts

# 6. Run development server
npm run dev
```

---

## Usage Guide

### Tracking Biomarkers
1. Navigate to **Analytics**
2. View 7-day charts for **Pitch**, **Clarity**, and **Stress**
3. Read AI-generated health insights
4. Monitor progress with circular indicators

### Socratic Journal
1. Navigate to **Journal**
2. Type your thoughts in the chat
3. Reflect on the AI's Socratic questions
4. Identify cognitive distortions automatically

### Booking Therapy
1. Navigate to **Therapy**
2. Browse available therapists
3. Select a time and book a session
4. Use the **Chat** feature to communicate securely

---

## Team

| Team Member | Email |
| :--- | :--- |
| **Abdullah Bin Aqeel** | abdul575@hotmail.com |
| **Muhammad Abdullah Ramzan** | abdullahramzan120@gmail.com |
| **Iqra Muhammad** | iqra1804@gmail.com|
| **Hasnaat Malik** | hasnaatmalik2003@gmail.com |

---

## Acknowledgments

- **Google Gemini** for powerful AI language understanding
- **ElevenLabs** for natural text-to-speech synthesis
- **Next.js** team for an amazing framework
- **Prisma** for elegant database management

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**Built with for better communication and emotional well-being**

[Back to Top](#voco-coach)

</div>
