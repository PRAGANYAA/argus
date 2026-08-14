export const mockJailerRequests = [
  {
    id: "REQ-081",
    inmateId: "INM-98234",
    inmateName: "Prisoner 1",
    proposalType: "Parole Recommendation",
    wardenNotes: "Inmate has completed 360 days of sentence. Behavior rating: Excellent. Lead carpenter in workshop. AI index predicts 88% parole fit. Fully supporting recommendation.",
    aiScore: 88,
    status: "Pending",
    submissionDate: "2026-08-12"
  },
  {
    id: "REQ-082",
    inmateId: "INM-91043",
    inmateName: "Prisoner 2",
    proposalType: "Release Order Clearance",
    wardenNotes: "Completed 9 months of a 12-month term. Behavior credits accumulated: 25 days. Highly fit for immediate clearance. AI score: 96%. Recommend immediate signing.",
    aiScore: 96,
    status: "Pending",
    submissionDate: "2026-08-14"
  },
  {
    id: "REQ-083",
    inmateId: "INM-77291",
    inmateName: "Prisoner 4",
    proposalType: "Bail Petition Fast-track",
    wardenNotes: "Under-trial in gardening custody. Non-violent offense. AI score predicts 91% bail fit. Supporting fast-track trial access.",
    aiScore: 91,
    status: "Pending",
    submissionDate: "2026-08-11"
  }
];

export const mockPrisonsList = [
  {
    id: "PRIS-01",
    name: "Central Jail, Region A",
    occupancy: 850,
    capacity: 1000,
    wardenName: "Officer R. Singh",
    undertrialCount: 420,
    staffCount: 145,
    releaseRate: 74,
    incidentCount: 0,
    wardenReport: "Workshop rehabilitation programs operating at 84% capacity. Submitting release audits for Prisoner 2 and Prisoner 1. Facility logs certified."
  },
  {
    id: "PRIS-02",
    name: "District Jail A, Region B",
    occupancy: 420,
    capacity: 500,
    wardenName: "Warden K. Sharma",
    undertrialCount: 290,
    staffCount: 78,
    releaseRate: 68,
    incidentCount: 1,
    wardenReport: "Security systems certified. Legal aid audit completed by DLSA. High density of under-trial inmates. Requesting speedy trial reviews."
  },
  {
    id: "PRIS-03",
    name: "Sub-Jail B, Region C",
    occupancy: 180,
    capacity: 200,
    wardenName: "Superintendent M. Roy",
    undertrialCount: 85,
    staffCount: 40,
    releaseRate: 82,
    incidentCount: 0,
    wardenReport: "Clean conduct audits across cell blocks. Medical evaluations updated. Submitting budgets logs."
  },
  {
    id: "PRIS-04",
    name: "Special Jail C, Region D",
    occupancy: 120,
    capacity: 150,
    wardenName: "Officer A. Pillai",
    undertrialCount: 40,
    staffCount: 35,
    releaseRate: 90,
    incidentCount: 0,
    wardenReport: "Juvenile rehabilitation program logs compiled. Labor credit registers synced."
  }
];

export const mockJudiciaryStats = {
  totalPrisons: 4,
  totalInmates: 1570,
  totalCells: 600,
  spaceRatio: "4.2 sqm per Inmate",
  medicalRating: "88% Compliance Index",
  complianceScore: 94,
  welfareBudget: "₹45,00,000",
  allocatedBudget: "₹4,50,000",
  pendingBailsCount: 120,
  rehabProgramCount: 12
};

export const mockSubscription = {
  planType: "Judicial Enterprise Platform Lease (Annual)",
  validityUntil: "2027-08-14", // Extended
  remainingDays: 365,
  monthlyRent: "₹15,000",
  billingHistory: [
    { id: "INV-2026-08", date: "2026-08-14", amount: "₹1,80,000", period: "Aug 2026 - Aug 2027", status: "Paid" },
    { id: "INV-2025-08", date: "2025-08-14", amount: "₹1,80,000", period: "Aug 2025 - Aug 2026", status: "Paid" }
  ]
};
