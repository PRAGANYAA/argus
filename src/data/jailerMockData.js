export const initialPrisoners = [
  {
    id: "INM-98234",
    name: "Prisoner 1",
    crime: "Petty Theft",
    sentence: "3 Years (36 Months)",
    timeServedMonths: 12,
    timeServedDays: 360,
    behaviorCreditsDays: 15,
    eligibilityScore: 88,
    eligibilityStatus: "Eligible for Parole",
    arrestingOfficer: "Inspector R. D'Souza",
    arrestDate: "2025-08-15",
    block: "Block B, Cell 12",
    rehabilitationDetails: "Highly Cooperative, Lead Carpenter in Prison Workshop",
    caseSummary: "Arrested for stealing copper cables. First-time offender. Trial delayed due to procedural lags in court documents submission. Prison conduct is excellent, no disciplinary infractions."
  },
  {
    id: "INM-91043",
    name: "Prisoner 2",
    crime: "Trespassing & Vagrancy",
    sentence: "1 Year (12 Months)",
    timeServedMonths: 9,
    timeServedDays: 270,
    behaviorCreditsDays: 25,
    eligibilityScore: 96,
    eligibilityStatus: "Eligible for Release",
    arrestingOfficer: "Sub-Inspector V. Joshi",
    arrestDate: "2025-11-10",
    block: "Block A, Cell 4",
    rehabilitationDetails: "Kitchen Assistant, Exemplary Conduct",
    caseSummary: "Detained for trespassing on commercial railway property. Completed 9 months of a 12-month sentence. Excellent behavior has earned 25 credits, placing him in the highest tier of release eligibility."
  },
  {
    id: "INM-88341",
    name: "Prisoner 3",
    crime: "Financial Fraud",
    sentence: "5 Years (60 Months)",
    timeServedMonths: 24,
    timeServedDays: 730,
    behaviorCreditsDays: 40,
    eligibilityScore: 45,
    eligibilityStatus: "Ineligible",
    arrestingOfficer: "Inspector S. Deshmukh (EOW)",
    arrestDate: "2024-08-15",
    block: "Block C, Cell 2",
    rehabilitationDetails: "Library Coordinator",
    caseSummary: "Involved in bank transaction discrepancies under trial. Served 2 years. Due to the high financial value of the charge and non-completion of mandatory minimum term, the AI model predicts low bail eligibility."
  },
  {
    id: "INM-77291",
    name: "Prisoner 4",
    crime: "Arson (Property Damage)",
    sentence: "2 Years (24 Months)",
    timeServedMonths: 8,
    timeServedDays: 240,
    behaviorCreditsDays: 5,
    eligibilityScore: 91,
    eligibilityStatus: "Eligible for Bail",
    arrestingOfficer: "Inspector M. Kulkarni",
    arrestDate: "2025-12-14",
    block: "Block D, Cell 9",
    rehabilitationDetails: "Gardening & Landscaping",
    caseSummary: "Charged with property destruction. Under-trial. The offense is classified as bail-eligible under standard judicial directives due to absence of bodily harm. Good behavior report filed."
  },
  {
    id: "INM-66102",
    name: "Prisoner 5",
    crime: "Public Disturbance",
    sentence: "1.5 Years (18 Months)",
    timeServedMonths: 12,
    timeServedDays: 365,
    behaviorCreditsDays: 18,
    eligibilityScore: 68,
    eligibilityStatus: "Under Review",
    arrestingOfficer: "Officer Toby Flenderson",
    arrestDate: "2025-08-14",
    block: "Block A, Cell 5",
    rehabilitationDetails: "Office Administration & Literacy Program Helper",
    caseSummary: "Detained during protest march. Disciplinary record shows minor compliance dispute in Oct 2025. Currently cooperative and aiding in inmate education programs. Release is under legal review."
  },
  {
    id: "INM-55483",
    name: "Prisoner 6",
    crime: "Assault (Affray)",
    sentence: "1 Year (12 Months)",
    timeServedMonths: 4,
    timeServedDays: 120,
    behaviorCreditsDays: 8,
    eligibilityScore: 35,
    eligibilityStatus: "Ineligible",
    arrestingOfficer: "Officer Jim Halpert",
    arrestDate: "2026-04-14",
    block: "Block C, Cell 1",
    rehabilitationDetails: "Agriculture Workshop",
    caseSummary: "Arrested for violent altercation. Served 4 months. High risk score due to nature of charge. Model recommends completing behavior therapy before next evaluation."
  }
];

export const monthlyAnalytics = {
  eligibilityDistribution: [
    { name: 'Eligible for Release', value: 12, fill: 'var(--success-color)' },
    { name: 'Eligible for Parole', value: 18, fill: 'var(--primary-color)' },
    { name: 'Eligible for Bail', value: 25, fill: 'var(--warning-color)' },
    { name: 'Ineligible', value: 45, fill: 'var(--danger-color)' },
    { name: 'Under Review', value: 20, fill: 'var(--accent-color)' },
  ],
  crimeBreakdown: [
    { category: 'Theft/Property', count: 48 },
    { category: 'Financial', count: 32 },
    { category: 'Assault/Violence', count: 15 },
    { category: 'Public Disorder', count: 18 },
    { category: 'Others', count: 7 },
  ],
  behaviorTrend: [
    { month: 'Jan', avgScore: 72 },
    { month: 'Feb', avgScore: 75 },
    { month: 'Mar', avgScore: 74 },
    { month: 'Apr', avgScore: 79 },
    { month: 'May', avgScore: 82 },
    { month: 'Jun', avgScore: 85 },
    { month: 'Jul', avgScore: 88 },
  ]
};

export const initialJailerNotifications = [
  {
    id: "J-NOTE-1",
    title: "Add New Prisoner Request",
    desc: "Prisoner 7 has been processed by court. Action Required: Register to cell registry.",
    type: "action",
    actionPayload: {
      name: "Prisoner 7",
      crime: "Theft (Under Trial)",
      sentence: "2 Years (24 Months)",
      block: "Block B, Cell 8",
      arrestingOfficer: "Inspector P. Rawat",
      caseSummary: "Arrested for shoplifting. Under trial. Recommending Block B placement."
    },
    status: "unread"
  },
  {
    id: "J-NOTE-2",
    title: "DLSA Parole Review Audit",
    desc: "District Legal Services Authority requests conduct verification report for Prisoner 1.",
    type: "info",
    status: "unread"
  },
  {
    id: "J-NOTE-3",
    title: "Update Warden Logs - Block C",
    desc: "System flag: Block C carpentry workshop logs for July are missing supervisor signatures.",
    type: "task",
    status: "unread"
  },
  {
    id: "J-NOTE-4",
    title: "Add New Prisoner Request",
    desc: "Prisoner 8 has been processed. Action Required: Register to cell registry.",
    type: "action",
    actionPayload: {
      name: "Prisoner 8",
      crime: "Trespassing",
      sentence: "1 Year (12 Months)",
      block: "Block A, Cell 9",
      arrestingOfficer: "Inspector T. Deshmukh",
      caseSummary: "Detained for trespassing in restricted govt forest nursery. First offender."
    },
    status: "unread"
  }
];
