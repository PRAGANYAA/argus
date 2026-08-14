export const mockInmate = {
  id: "INM-98234",
  name: "Ramesh Kumar",
  relation: "Brother",
  status: "Incarcerated",
  location: "Central Prison, Block B",
  admissionDate: "2025-08-15",
  expectedRelease: "2028-08-14",
  sentenceTotal: "3 Years",
  timeServed: "1 Year",
  goodBehaviorCredits: "15 Days",
  healthStatus: "Good",
  nextHearingDate: "2026-09-12"
};

export const mockWorkDone = [
  { id: 1, type: "Carpentry", hours: 120, rating: "Excellent", creditEarned: "5 Days" },
  { id: 2, type: "Tailoring", hours: 85, rating: "Good", creditEarned: "3 Days" },
  { id: 3, type: "Library Assistant", hours: 45, rating: "Excellent", creditEarned: "2 Days" },
  { id: 4, type: "Kitchen Duty", hours: 60, rating: "Satisfactory", creditEarned: "2 Days" },
];

export const mockNotifications = [
  { id: 1, date: "2026-08-14", title: "Upcoming Court Hearing", desc: "Next hearing scheduled for Sept 12, 2026 at District Court Room 4.", type: "warning" },
  { id: 2, date: "2026-08-10", title: "Work Credit Applied", desc: "5 days of good behavior credit added for Carpentry work.", type: "success" },
  { id: 3, date: "2026-08-01", title: "Visitation Request Approved", desc: "Your visitation slot for Aug 15 is confirmed.", type: "primary" },
  { id: 4, date: "2026-07-20", title: "Medical Checkup", desc: "Routine health checkup completed. Status: Good.", type: "success" },
  { id: 5, date: "2026-07-15", title: "Transferred to Block B", desc: "Inmate was moved from Block A to Block B.", type: "primary" },
  { id: 6, date: "2026-06-30", title: "Bail Application Rejected", desc: "The bail plea submitted on June 15 was rejected by the court.", type: "danger" },
];

export const mockLegalDocs = [
  { id: "DOC-001", name: "First Information Report (FIR)", date: "2024-01-10", size: "2.4 MB", status: "Verified" },
  { id: "DOC-002", name: "Chargesheet", date: "2024-02-05", size: "5.1 MB", status: "Verified" },
  { id: "DOC-003", name: "Bail Rejection Order", date: "2026-06-30", size: "1.2 MB", status: "Verified" },
  { id: "DOC-004", name: "Medical Certificate", date: "2024-01-15", size: "0.8 MB", status: "Verified" },
  { id: "DOC-005", name: "Sentence Order", date: "2024-02-14", size: "3.5 MB", status: "Verified" },
];

export const mockRights = [
  { id: 1, category: "Inmate Rights", title: "Right to Legal Aid", desc: "Every inmate has the right to consult a legal practitioner." },
  { id: 2, category: "Inmate Rights", title: "Right to Health", desc: "Access to basic healthcare facilities within the prison premises." },
  { id: 3, category: "Family Rights", title: "Right to Visitation", desc: "Family members have scheduled visitation rights (twice a month)." },
  { id: 4, category: "Family Rights", title: "Information Right", desc: "Right to be informed about the inmate's transfer, illness, or death." },
  { id: 5, category: "Case Laws", title: "Article 21", desc: "Protection of Life and Personal Liberty. Extends to prisoners as well." },
  { id: 6, category: "Case Laws", title: "Article 39A", desc: "Equal justice and free legal aid." },
];

export const mockHelplines = [
  { name: "National Legal Services Authority", number: "15100" },
  { name: "State Women's Helpline", number: "181" },
  { name: "Human Rights Commission", number: "14433" },
  { name: "Prison Grievance Cell", number: "1800-123-4567" },
];

export const mockFreeLawyers = [
  { id: 1, name: "Lawyer 1", specialty: "Criminal Defense (Pro Bono)", contact: "lawyer1@legalaid.org", experience: "8 Years" },
  { id: 2, name: "Lawyer 2", specialty: "Parole & Bail (Pro Bono)", contact: "lawyer2@legalaid.org", experience: "12 Years" },
  { id: 3, name: "Lawyer 3", specialty: "Human Rights (Pro Bono)", contact: "lawyer3@legalaid.org", experience: "5 Years" },
];

export const mockPaidLawyers = [
  { id: 101, name: "Lawyer 4", specialty: "Senior Criminal Defense", fees: "₹5000/Consultation", experience: "20 Years" },
  { id: 102, name: "Lawyer 5", specialty: "High Court Appeals", fees: "₹4000/Consultation", experience: "15 Years" },
  { id: 103, name: "Lawyer 6", specialty: "Criminal Trials & Bail", fees: "₹3500/Consultation", experience: "10 Years" },
];
