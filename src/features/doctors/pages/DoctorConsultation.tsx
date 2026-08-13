import React, { useState } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';

export const DoctorConsultation: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [selectedLabTest, setSelectedLabTest] = useState('');
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');

  const patient = {
    id: 'P001',
    name: 'Rahul Kumar',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: 'Penicillin',
    appointmentNo: 'A1024',
  };

  const previousVisits = ['12 Aug 2026 - Mild Hypertension', '04 Jul 2026 - Seasonal Allergy'];
  const previousReports = ['CBC Blood Count (Normal)', 'Chest X-Ray (Clear)'];

  return (
    <PageContainer
      title={`Doctor Consultation — ${patient.name}`}
      description={`Appointment #${patient.appointmentNo} • Clinical Evaluation & Rx`}
    >
      {/* Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Patient Summary (1/3 width) */}
        <div className="space-y-5">
          <div className="hms-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Summary</h3>
            <div className="text-xs space-y-2 text-slate-700">
              <p><span className="text-slate-400 font-medium">Name:</span> <span className="font-bold text-slate-900">{patient.name}</span></p>
              <p><span className="text-slate-400 font-medium">Age / Gender:</span> {patient.age} yrs, {patient.gender}</p>
              <p><span className="text-slate-400 font-medium">Blood Group:</span> {patient.bloodGroup}</p>
              <p><span className="text-slate-400 font-medium">Known Allergies:</span> <span className="text-rose-600 font-semibold">{patient.allergies}</span></p>
            </div>
          </div>

          <div className="hms-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Previous Visits</h3>
            <ul className="text-xs space-y-1.5 text-slate-600">
              {previousVisits.map((v, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div className="hms-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Previous Reports</h3>
            <ul className="text-xs space-y-1.5 text-slate-600">
              {previousReports.map((r, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Consultation Form (2/3 width) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="hms-card p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Active Consultation Notes</h3>

            {/* Symptoms Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Symptoms Reported *</label>
              <textarea
                rows={3}
                placeholder="Enter patient reported symptoms..."
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              ></textarea>
            </div>

            {/* Diagnosis Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Clinical Diagnosis *</label>
              <textarea
                rows={3}
                placeholder="Enter doctor clinical diagnosis..."
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              ></textarea>
            </div>

            {/* Laboratory Test Order */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Order Laboratory Tests</label>
              <select
                value={selectedLabTest}
                onChange={e => setSelectedLabTest(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option value="">Select Lab Test (Optional)</option>
                <option value="CBC">CBC Complete Blood Count</option>
                <option value="LIPID">Lipid Profile</option>
                <option value="XRAY">Chest X-Ray</option>
                <option value="URINE">Urinalysis</option>
              </select>
            </div>

            {/* Prescription Add */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Add Prescribed Medicines</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Medicine Name (e.g. Paracetamol)"
                  value={medicine}
                  onChange={e => setMedicine(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
                <input
                  type="text"
                  placeholder="Dosage & Frequency (e.g. 500mg 1-0-1)"
                  value={dosage}
                  onChange={e => setDosage(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors">
                Save Draft
              </button>
              <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                Complete Consultation ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
