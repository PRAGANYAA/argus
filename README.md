<div align="center">

<img src="https://img.shields.io/badge/SDG%2016-Peace%20%26%20Justice-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/SRCAS-Hackathon%203.0-darkgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/Team-EUPHORIA-purple?style=for-the-badge" />
<img src="https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge" />

<br /><br />

```
 █████╗ ██████╗  ██████╗ ██╗   ██╗███████╗
██╔══██╗██╔══██╗██╔════╝ ██║   ██║██╔════╝
███████║██████╔╝██║  ███╗██║   ██║███████╗
██╔══██║██╔══██╗██║   ██║██║   ██║╚════██║
██║  ██║██║  ██║╚██████╔╝╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝
```

### **A**I-Powered **R**ights **G**uidance for **U**ndertrial **S**upport

*Turning a legal entitlement that exists on paper into freedom in reality.*

</div>

---

## The Problem, In One Number

> **76%** of India's 4+ lakh prisoners have not been convicted of anything. They are waiting.

Section 436A of the CrPC says anyone who has served half their maximum sentence must be released. The Supreme Court mandated district-level committees (UTRCs) to find and free these people every quarter.

The mechanism exists. **It is failing.**

| What Should Happen | What Actually Happens |
|---|---|
| Every district reviews all eligible undertrials quarterly | 85% of districts don't meet the Supreme Court's full mandate |
| UTRC recommendations lead to release | Of 2,112 recommendations, only 515 releases happened |
| Families are informed when their relative qualifies | Families hear nothing — no phone, no letter, nothing |
| Free legal aid (Tele-Law, NALSA) reaches those in need | It exists, but remains structurally unreachable for the poorest |

Every single day of wrongful detention is a documented **Article 21 violation** — and it's happening at scale, silently.

---

## What ARGUS Does

ARGUS is not a new system. It is **the missing layer** between India's existing justice infrastructure — eCourts, NALSA, Tele-Law, UTRCs — doing the connective work none of them are built to do.

```
┌──────────────────────────────────────────────────────────────────┐
│                   HALF A — COMPLIANCE ENGINE                     │
│         Auto Eligibility · Dossiers · Tracking · RTI            │
├──────────────────────────────────────────────────────────────────┤
│                   HALF B — CITIZEN BRIDGE                        │
│        SMS / IVR Alerts · Feature Phone · Legal Aid Routing     │
├──────────────────────────────────────────────────────────────────┤
│                   HALF C — PUBLIC PLATFORM                       │
│       Multilingual Bot · Intake Classification · Lawyer Booking  │
└──────────────────────────────────────────────────────────────────┘
          ↕                    ↕                    ↕
       eCourts               NALSA              Tele-Law
       (NJDG)               UTRCs               Citizens
```

---

## Features

### ⚙️ Half A — Compliance Engine
> *For jail officials, DLSA Secretaries, and UTRC Chairpersons*

- **Auto Eligibility Detection** — Computes Section 436A eligibility from eCourts/NJDG data. No manual checking. No missed cases. Fires in real time as prisoners cross the qualifying threshold.
- **Pre-Meeting Dossier Generation** — Auto-generates structured eligibility dossiers per district, delivered to officials before every quarterly UTRC meeting. Exported as PDF for offline access.
- **Recommendation-to-Execution Tracker** — Logs every UTRC recommendation and follows up against eCourts case status to confirm whether release actually happened.
- **RTI-Ready Compliance Reports** — Unacted recommendations auto-flag as downloadable, citation-backed RTI documents. The first accountability layer this process has ever had.
- **Justice Clock Dashboard** — Public, district-wise scoreboard showing meeting frequency, categories reviewed, and recommendation-to-release conversion rates. A live pressure tool for the judiciary and civil society.
- **14-Category NALSA SOP Coverage** — All mandated review categories tracked, not just 436A.
- **Immutable Audit Trail** — Every recommendation, follow-up, and escalation event permanently logged.

---

### 📱 Half B — Citizen Bridge
> *For undertrial families — works on any ₹500 feature phone*

- **Verified Registration** — Next-of-kin registered through jail intake records at time of admission. No open self-registration. No spoofing. No unauthorized case tracking.
- **Two-Trigger Alert System** — SMS or IVR voice alert fires on exactly two events:
  - `[1]` Prisoner crosses Section 436A eligibility threshold
  - `[2]` UTRC makes a recommendation on their case
- **Zero Device Barrier** — Plain SMS + IVR voice. No app. No internet. No smartphone. Works on anything.
- **Multilingual** — Hindi, Tamil, and all major Indic languages via **Bhashini** (Government of India's public language AI platform).
- **Direct Legal Aid Hand-Off** — Every alert immediately connects the family to a free Tele-Law/NALSA panel lawyer. Information becomes action.
- **DPDP Act 2023 Compliant** — Minimal data retention, purpose limitation, consent at source.

---

### 🌐 Half C — Public Platform
> *For any citizen with an unresolved legal problem*

- **Multilingual Legal Intake Bot** — Text and voice bot classifies any legal issue in the citizen's own language.
- **Strict Classification Only** — Bot classifies and routes — the same function a Para Legal Volunteer is already authorised to perform under NALSA's SOP. No legal advice. Zero Advocates Act exposure.
- **Tele-Law Form Auto-Fill** — Pre-fills the existing Tele-Law application with classified issue details.
- **Free Lawyer Booking** — Routes directly into NALSA's panel-lawyer scheduling, available outside CSC hours.
- **NGO Monitor Interface** — Civil society partners can flag non-compliant districts and download documentation directly from the dashboard.
- **Role-Based Access** — Separate views for jail officials, DLSA staff, UTRC members, and NGO monitors.

---

## Tech Stack

### Frontend *(Current Build)*
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | Core UI framework |
| Vite 8 | Build tooling |
| React Router DOM v7 | Client-side routing |
| Recharts | Justice Clock data visualizations |
| Lucide React | Icon system |
| Tailwind CSS | Styling |
| Progressive Web App | Low-bandwidth, offline-capable access |

### Backend *(Planned)*
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Core API layer |
| Python (FastAPI) | Eligibility engine and data processing |
| PostgreSQL | Primary relational database |
| Redis | Job queuing and scheduled sync |
| Firebase Firestore | Real-time data sync |

### AI & NLP
| Technology | Purpose |
|---|---|
| OpenAI GPT | Legal issue classification — intake bot |
| LangChain | Prompt orchestration |
| Hugging Face | Indic language NLP models |
| Bhashini | Government-grade Indic TTS and STT |
| Google Translate API | Multilingual fallback |
| Google Speech-to-Text / TTS | Voice interface layer |

### Communication
| Technology | Purpose |
|---|---|
| Twilio | SMS dispatch and IVR voice calls |
| WhatsApp Business API | Optional WhatsApp channel |
| Gmail API | Dossier delivery to DLSA/UTRC officials |

### Security & Infrastructure
| Technology | Purpose |
|---|---|
| Firebase Auth + JWT | Authentication and role-based access |
| AES-256 Encryption | Data at rest and in transit |
| Docker + Nginx | Containerization and reverse proxy |
| Google Cloud / MeghRaj | Primary cloud hosting |
| GitHub Actions | CI/CD pipeline |
| Google Analytics + Firebase Analytics | Usage and event tracking |

---

## How It Works — End to End

```
eCourts / NJDG Public Data
          │
          ▼
  ┌───────────────────┐
  │  Scheduled Sync   │  ← Redis Job Queue
  └────────┬──────────┘
           │
           ▼
  ┌───────────────────────┐
  │   Eligibility Engine  │  ← 436A computation
  │  (IPC/BNSS lookup)    │    against offense table
  └──────┬────────────────┘
         │
   ┌─────┴──────┐
   ▼            ▼
┌──────────┐  ┌────────────────────┐
│ Dossier  │  │  Recommendation    │
│ Builder  │  │  Tracker           │
└────┬─────┘  └──────────┬─────────┘
     │                   │
     ▼                   ▼
DLSA / UTRC         RTI Compliance
  Officials            Reports
     │                   │
     └──────────┬─────────┘
                ▼
         Justice Clock
          Dashboard
                │
                ▼
       ┌─────────────────┐
       │  Citizen Bridge │  ← SMS / IVR → Family Alert
       └────────┬────────┘
                │
                ▼
       Tele-Law / NALSA
         Panel Lawyer
                │
                ▼
       ┌─────────────────┐
       │   Public Bot    │  ← Web + Voice → Classification
       └─────────────────┘
```

---

## Development Phases

### Phase 1 — Compliance Engine ✅ In Progress
> *Foundation. Everything else depends on this.*

- eCourts/NJDG data integration and scheduled sync
- Section 436A eligibility calculator with IPC/BNSS lookup table
- Edge case handling — multiple charges, state amendments, death penalty exclusions
- UTRC eligibility dossier auto-generation and PDF export
- Recommendation logging and execution tracking
- RTI-ready non-compliance flagging
- Justice Clock public dashboard

### Phase 2 — Citizen Bridge 🔜 Planned
> *Built only after Phase 1 eligibility data is verified and stable.*

- Verified next-of-kin registration via jail intake records
- Two-trigger SMS and IVR voice alert system
- Multilingual support via Bhashini
- Direct Tele-Law/NALSA panel-lawyer routing

### Phase 3 — Public Platform 🔜 Planned
> *Built on Phase 1 data infrastructure and Phase 2 legal aid routing.*

- Multilingual legal intake bot (text + voice)
- Legal issue classification and Tele-Law form auto-fill
- Free lawyer consultation booking
- NGO monitor interface with compliance flagging

---

## SDG Alignment

| SDG | Target | ARGUS Contribution |
|---|---|---|
| **SDG 16** — Justice & Strong Institutions | 16.3 — Equal access to justice | Closes the gap between a legal entitlement and its delivery |
| **SDG 16** | 16.6 — Accountable institutions | First-ever recommendation-to-execution audit trail for UTRCs |
| **SDG 16** | 16.10 — Public access to information | RTI-ready reports and Justice Clock operationalize existing disclosure obligations |
| **SDG 10** — Reduced Inequalities | 10.2 — Inclusion of marginalized communities | Built specifically for poor, non-literate, no-internet populations |
| **SDG 17** — Partnerships for the Goals | 17.17 — Multi-stakeholder partnerships | Integrates with eCourts, DLSA, UTRC, NALSA, and Tele-Law — not competing with any of them |

---

## Impact

| Impact | What It Means |
|---|---|
| Direct liberty | Fewer people held past their legal release date — a direct Article 21 outcome |
| Prison overcrowding | Undertrial detention directly tied to India's 114% average jail overcrowding |
| Public accountability | First district-wise compliance scores for the UTRC process — anywhere in India |
| State cost savings | Every unnecessary detention day is a direct cost to the exchequer |
| Official workload | Automates the manual step audits confirm is failing — reduces work, doesn't add to it |
| Family agency | Families receive actionable information, not silence |
| Legal aid reach | Citizens who would never find Tele-Law get routed in via voice and SMS |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/PRAGANYAA/argus.git

# Navigate to project directory
cd argus

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> Requires Node.js 18+ and npm 9+

---

## Legal & Compliance Notes

- The intake bot performs **classification and routing only** — identical in function to what a Para Legal Volunteer is authorised to do under NALSA's SOP. No legal advice. No Advocates Act exposure.
- Registration is through **verified jail intake records only** — no open self-registration, no spoofing risk.
- Built **DPDP Act 2023 compliant** from day one — minimal retention, purpose limitation, consent at source.
- Aligned with **Section 436A CrPC/BNSS**, Supreme Court UTRC mandates, NALSA SOP, and RTI Act Section 4(1)(b).

---

## References & Evidence Base

- Prison Statistics India — NCRB 2022 (76% undertrial figure, 114% overcrowding)
- CHRI Audit 2018 — 85% district non-compliance with Supreme Court UTRC mandate
- NALSA-CHRI Joint Report — 2,112 recommendations, 515 releases tracked across 16 states
- *Re: Inhuman Conditions in 1382 Prisons*, Supreme Court of India (2016) — single day delay in release = rights violation
- Section 436A, Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita (BNSS)

---

## Team EUPHORIA

| Name | Role | Branch |
|---|---|---|
| **R Rithin** *(Lead)* | Backend & Eligibility Engine | BE — CSE, 3rd Year |
| **Praganya A** | Data Pipeline & Dossier Generation | BE — CSE, 3rd Year |
| **Vasanthavel K** | Recommendation Tracking & Compliance Layer | BE — CSE, 3rd Year |
| **G R Niteshraj** | Dashboard, Frontend & Public Accountability | BE — CSE, 3rd Year |

**Institution:** Chennai Institute of Technology
**Hackathon:** SRCAS Hackathon 3.0 — Innovate · Build · Impact
**Sponsors:** iGenius · Microsoft · Programming Club

---

<div align="center">

*Built for SDG 16. Grounded in existing law. Designed for the people the system was always supposed to reach.*

**One platform. Three layers. One purpose.**
*No one who is legally entitled to go home should still be waiting.*

</div>
