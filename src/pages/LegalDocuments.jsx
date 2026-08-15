import React, { useState } from 'react';
import { mockLegalDocs } from '../data/mockData';
import { ShieldCheck, UploadCloud, FileText, Download, Eye, Lock, CheckCircle2, X } from 'lucide-react';

// Document content map keyed by doc ID
const docContents = {
  'DOC-001': `FIRST INFORMATION REPORT (FIR)
=====================================
FIR No.        : 0142/2024
Police Station : Adyar Police Station, Chennai
District       : Chennai, Tamil Nadu
Date of Filing : 10 January 2024
Time           : 14:35 Hours

COMPLAINANT DETAILS:
Name           : Suresh Kumar
Address        : 14, Gandhi Nagar, Adyar, Chennai - 600020
Phone          : 98XXXXXXXX

ACCUSED DETAILS:
Name           : Ramesh Kumar
Age            : 32 Years
Address        : 14, Gandhi Nagar, Adyar, Chennai - 600020

OFFENCE DETAILS:
Section        : IPC Section 392 (Robbery), IPC Section 34 (Common Intention)
Date of Offence: 09 January 2024
Place          : Near Adyar Bus Terminus

BRIEF DESCRIPTION:
The complainant reported that on the night of January 9, 2024, at approximately
22:00 hours, the accused allegedly committed robbery near the Adyar Bus Terminus.
The incident was witnessed by two bystanders. Police registered the FIR and began
investigation under Sections 392 and 34 of the Indian Penal Code.

Investigating Officer: SI Rajendran (Badge No. 4521)
Station Head         : Inspector K. Muthukumar

[CERTIFIED TRUE COPY — ARGUS JUDICIAL MANAGEMENT SYSTEM]
Ref: INM-98234 | Case: CR-2024-0142`,

  'DOC-002': `CHARGESHEET
=====================================
Case No.       : CR-2024-0142
Court          : III Additional Sessions Court, Chennai
Date Filed     : 05 February 2024

ACCUSED:
Name           : Ramesh Kumar
Age            : 32
Occupation     : Daily Wage Worker
Address        : 14, Gandhi Nagar, Adyar, Chennai

CHARGES:
1. Section 392 IPC — Robbery
   Maximum Punishment: Up to 10 years rigorous imprisonment + fine

2. Section 34 IPC — Acts done by several persons in furtherance of common intention
   Applied jointly with primary charge

EVIDENCE SUBMITTED:
  [1] CCTV footage from Adyar Bus Terminus (Exhibit A)
  [2] Witness statement — Mr. V. Krishnamurthy (Exhibit B)
  [3] Witness statement — Ms. T. Meenakshi (Exhibit C)
  [4] Recovered stolen articles — Gold chain, Mobile Phone (Exhibit D)
  [5] Medical Examination Report of complainant (Exhibit E)

PROSECUTION WITNESSES: 8 listed
DOCUMENTARY EVIDENCE: 5 exhibits marked

Submitted by: Public Prosecutor, Chennai Sessions Court
Date         : 05 February 2024

[CERTIFIED TRUE COPY — ARGUS JUDICIAL MANAGEMENT SYSTEM]
Ref: INM-98234 | Case: CR-2024-0142`,

  'DOC-003': `BAIL REJECTION ORDER
=====================================
IN THE SESSIONS COURT OF CHENNAI
Case No.       : Crl.MP No. 4821/2026
Date of Order  : 30 June 2026

PETITIONER : Ramesh Kumar (Accused)
RESPONDENT : State of Tamil Nadu

COUNSEL FOR PETITIONER : Adv. M. Sundarajan
COUNSEL FOR STATE       : Addl. PP K. Raghavan

ORDER:
The bail petition filed by the accused under Section 439 CrPC has been
carefully considered. The court notes the following:

1. The offence under Section 392 IPC is serious in nature.
2. There exists a reasonable apprehension of the accused tampering with witnesses.
3. Two witnesses are yet to be examined in trial proceedings.
4. The accused does not have a clean antecedent record.

In view of the above, this court is not inclined to grant bail at this stage.

The bail petition is DISMISSED.

However, the petitioner is at liberty to file a fresh petition before this
court or the Hon'ble High Court if circumstances change.

                                              Sd/-
                                    Sessions Judge, Chennai
                                       Date: 30.06.2026

[CERTIFIED TRUE COPY — ARGUS JUDICIAL MANAGEMENT SYSTEM]
Ref: INM-98234 | Case: CR-2024-0142`,

  'DOC-004': `MEDICAL CERTIFICATE
=====================================
CENTRAL PRISON MEDICAL WING
Chennai — 600002

Certificate No. : MED-2024-0891
Date            : 15 January 2024

INMATE DETAILS:
Prisoner Name   : Ramesh Kumar
Inmate ID       : INM-98234
Age             : 32 Years
Ward / Block    : Block B, Cell 14

EXAMINATION DETAILS:
Examined by     : Dr. Priya Subramaniam, MBBS, MD
Date of Exam    : 15 January 2024
Type            : Routine Admission Medical Examination

FINDINGS:
• Height         : 168 cm
• Weight         : 70 kg
• Blood Pressure : 118/76 mmHg (Normal)
• Pulse Rate     : 76 bpm (Normal)
• Temperature    : 98.4°F (Normal)
• Vision         : 6/6 bilateral

PRE-EXISTING CONDITIONS: None reported

MENTAL HEALTH ASSESSMENT: Stable. No signs of acute psychiatric disturbance.

CONCLUSION:
The inmate is medically fit for incarceration. No communicable diseases detected.
Standard prison diet is recommended.

                                          Sd/-
                               Dr. Priya Subramaniam
                          Medical Officer, Central Prison, Chennai
                                   Date: 15.01.2024

[CERTIFIED TRUE COPY — ARGUS JUDICIAL MANAGEMENT SYSTEM]
Ref: INM-98234`,

  'DOC-005': `SENTENCE ORDER
=====================================
IN THE III ADDITIONAL SESSIONS COURT, CHENNAI
Sessions Case No. : S.C. No. 112/2024
Date of Judgment  : 14 February 2024

STATE OF TAMIL NADU  ... Prosecution
vs.
RAMESH KUMAR         ... Accused

JUDGMENT:
After hearing arguments from both sides and examining all evidence on record,
this court finds the accused GUILTY of the offences under:
  • Section 392 IPC (Robbery)
  • Section 34 IPC (Common Intention)

SENTENCE:
The accused is sentenced to undergo Rigorous Imprisonment (RI) for a period
of THREE (3) YEARS and to pay a fine of ₹10,000/-.

In default of payment of fine, the accused shall undergo Simple Imprisonment
for a further period of TWO (2) MONTHS.

Period of detention already undergone shall be set off against the sentence
as per Section 428 CrPC.

DATE OF COMMENCEMENT : 15 August 2025
DATE OF RELEASE      : 14 August 2028 (subject to remissions)

The accused is informed of his right to prefer an appeal before the
Hon'ble High Court of Madras within 90 days from the date of this judgment.

                                              Sd/-
                              III Additional Sessions Judge, Chennai
                                       Date: 14.02.2024

[CERTIFIED TRUE COPY — ARGUS JUDICIAL MANAGEMENT SYSTEM]
Ref: INM-98234 | Case: S.C. 112/2024`
};

const downloadFile = (filename, content) => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const LegalDocuments = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewDoc, setViewDoc] = useState(null);

  // Document Request states
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestDocName, setRequestDocName] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleView = (doc) => {
    setViewDoc(doc);
  };

  const handleDownload = (doc) => {
    const content = docContents[doc.id] || `Document: ${doc.name}\nID: ${doc.id}\nDate: ${doc.date}\n\n[Document content not available in demo mode]`;
    const filename = `${doc.name.replace(/\s+/g, '_')}_${doc.id}.txt`;
    downloadFile(filename, content);
    setToastMessage(`"${doc.name}" downloaded successfully.`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestDocName) return;
    setToastMessage(`Your request for "${requestDocName}" has been logged! The legal team will upload it shortly.`);
    setRequestDocName('');
    setRequestReason('');
    setShowRequestModal(false);
    setTimeout(() => setToastMessage(''), 4500);
  };

  return (
    <div className="flex flex-col gap-md">
      {/* Header section */}
      <div className="flex justify-between items-center mb-sm mt-md">
        <div>
          <h1 className="h1" style={{ marginBottom: 0 }}>Legal Documents</h1>
          <p className="text-muted text-sm mt-xs">Access all case-related documents securely.</p>
        </div>
        {isVerified ? (
          <div className="badge badge-success flex items-center gap-xs" style={{ fontSize: '0.9rem', padding: '8px 16px', borderRadius: '12px' }}>
            <CheckCircle2 size={16}/> Identity Verified
          </div>
        ) : (
          <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
            <UploadCloud size={18}/> {uploading ? 'Verifying...' : 'Verify Identity to Unlock'}
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="toast-banner toast-success">
          <CheckCircle2 size={18} />
          {toastMessage}
        </div>
      )}

      {/* Main split layout */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Document List */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Case Files</h3>
            {isVerified && (
              <div className="flex gap-sm">
                <input type="text" className="form-control" placeholder="Search..." style={{ width: '150px', padding: '6px 12px' }} />
              </div>
            )}
          </div>
          <div className="card-body" style={{ padding: 0, position: 'relative' }}>
            <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th className="p-md text-sm font-semibold text-secondary">Document Name</th>
                  <th className="p-md text-sm font-semibold text-secondary">ID</th>
                  <th className="p-md text-sm font-semibold text-secondary">Date Added</th>
                  <th className="p-md text-sm font-semibold text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockLegalDocs.map((doc, idx) => (
                  <tr key={doc.id} style={{ borderBottom: idx === mockLegalDocs.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                    <td className={`p-md text-sm font-semibold ${!isVerified ? 'blur-text' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={16} className="text-primary" /> {doc.name}
                    </td>
                    <td className={`p-md text-sm text-muted ${!isVerified ? 'blur-text' : ''}`}>{doc.id}</td>
                    <td className={`p-md text-sm ${!isVerified ? 'blur-text' : ''}`}>{doc.date}</td>
                    <td className="p-md text-sm text-right">
                      <div className="flex justify-end gap-sm">
                        <button
                          className="btn btn-outline"
                          style={{ padding: '6px', borderRadius: '50%' }}
                          disabled={!isVerified}
                          onClick={() => isVerified && handleView(doc)}
                          title="Preview Document"
                        >
                          {isVerified ? <Eye size={14} /> : <Lock size={14} className="text-muted" />}
                        </button>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '6px', borderRadius: '50%' }}
                          disabled={!isVerified}
                          onClick={() => isVerified && handleDownload(doc)}
                          title="Download Document"
                        >
                          {isVerified ? <Download size={14} /> : <Lock size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Blurred overlay if not verified */}
            {!isVerified && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(1px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}>
                <div className="card p-md items-center text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', maxWidth: '300px' }}>
                  <Lock size={24} className="text-primary mb-xs" />
                  <h4 className="font-semibold text-sm">Access Restricted</h4>
                  <p className="text-xs text-muted mt-xs">Verify your family credentials on the right to unlock files.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Verification / Status Area */}
        <div className="flex flex-col gap-md">
          {!isVerified ? (
            <div className="card">
              <div className="card-header bg-danger-light" style={{ backgroundColor: 'var(--danger-light)' }}>
                <h3 className="card-title" style={{ color: 'var(--danger-color)' }}><Lock size={18} /> Credentials Needed</h3>
              </div>
              <div className="card-body flex flex-col gap-md">
                <p className="text-sm text-secondary" style={{ lineHeight: '1.5' }}>
                  Please upload your <strong>Family Card</strong> or <strong>Identity Certificate</strong> to verify your relationship with the inmate and access confidential files.
                </p>
                <div className="flex flex-col items-center gap-sm p-lg text-center" style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--border-radius-sm)', backgroundColor: 'var(--bg-color)' }}>
                  <UploadCloud size={32} className="text-muted mb-xs" />
                  <div>
                    <span className="font-semibold text-sm">Click to upload Family Card</span>
                    <p className="text-xs text-muted mt-xs">PDF, PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <button className="btn btn-primary w-full" onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Verifying Card...' : 'Verify Credentials'}
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header bg-success-light" style={{ backgroundColor: 'var(--success-light)' }}>
                <h3 className="card-title text-success"><CheckCircle2 size={18} /> Verified Session</h3>
              </div>
              <div className="card-body flex flex-col gap-md">
                <div className="flex items-center gap-md p-md bg-secondary rounded" style={{ backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius-sm)' }}>
                  <ShieldCheck size={28} className="text-success" />
                  <div>
                    <h4 className="font-semibold text-sm">Identity Confirmed</h4>
                    <p className="text-xs text-muted">Relationship: Brother</p>
                  </div>
                </div>
                <div className="flex flex-col gap-xs mt-sm">
                  <span className="text-xs text-muted font-bold">AUDIT LOG</span>
                  <div className="text-xs text-secondary mt-xs">
                    <p>• Verified Card: <strong>FC-98234-A</strong></p>
                    <p className="mt-xs">• Session starts: <strong>Today, 12:48 PM</strong></p>
                    <p className="mt-xs">• Authorized IP: <strong>192.168.1.100</strong></p>
                  </div>
                </div>
                <button className="btn btn-outline w-full text-xs mt-sm" onClick={() => setIsVerified(false)}>
                  Revoke Authorization
                </button>
              </div>
            </div>
          )}

          {/* Document Request */}
          <div className="card bg-primary-light" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary-color)' }}>
            <div className="card-body">
              <h4 className="font-semibold text-primary mb-xs">Missing Files?</h4>
              <p className="text-xs text-secondary mb-md">Submit a formal request to the legal team for any document not listed here.</p>
              <button className="btn btn-primary text-xs w-full" onClick={() => setShowRequestModal(true)}>Request Document</button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {viewDoc && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(20, 15, 10, 0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card" style={{ width: '680px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            {/* Modal Header */}
            <div className="card-header flex justify-between items-center" style={{ flexShrink: 0 }}>
              <div className="flex items-center gap-sm">
                <FileText size={18} className="text-primary" />
                <div>
                  <h3 className="card-title" style={{ marginBottom: 0 }}>{viewDoc.name}</h3>
                  <span className="text-xs text-muted">{viewDoc.id} • {viewDoc.date} • {viewDoc.size}</span>
                </div>
              </div>
              <button
                onClick={() => setViewDoc(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Document Content */}
            <div style={{
              overflowY: 'auto',
              padding: '24px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: '1.7',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-color)',
              whiteSpace: 'pre-wrap',
              flex: 1
            }}>
              {docContents[viewDoc.id] || 'Document content unavailable in demo mode.'}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-sm" style={{ padding: '16px', borderTop: '1px solid var(--border-color)', flexShrink: 0 }}>
              <button className="btn btn-outline w-full" onClick={() => setViewDoc(null)}>
                Close
              </button>
              <button className="btn btn-primary w-full" onClick={() => { handleDownload(viewDoc); setViewDoc(null); }}>
                <Download size={14} className="mr-xs" /> Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Request Modal */}
      {showRequestModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(59, 50, 40, 0.45)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card p-lg" style={{ width: '450px', backgroundColor: 'var(--bg-card)' }}>
            <h3 style={{ fontFamily: 'var(--font-family-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>
              Request Case Document
            </h3>
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-md">
              <div className="form-group">
                <label className="form-label">Document Name / Type</label>
                <input type="text" className="form-control" placeholder="e.g. Charge Sheet, FIR Copy" value={requestDocName} onChange={(e) => setRequestDocName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Reason for Request (Optional)</label>
                <textarea className="form-control" placeholder="Describe why this document is needed..." value={requestReason} onChange={(e) => setRequestReason(e.target.value)} rows="3" style={{ resize: 'none' }} />
              </div>
              <div className="flex gap-sm">
                <button type="button" className="btn btn-outline w-full" onClick={() => setShowRequestModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary w-full">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocuments;
