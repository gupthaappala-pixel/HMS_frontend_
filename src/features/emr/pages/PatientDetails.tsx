import React, { useState } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { Timeline, TimelineStep } from '../../../components/common/Timeline';
import { Table, Column } from '../../../components/common/Table';
import { useNavigate, useParams } from 'react-router-dom';

export const PatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'reports' | 'rx' | 'lab' | 'billing' | 'timeline'>('overview');

  const patient = {
    id: id || 'P001',
    name: 'Rahul Kumar',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'rahul.kumar@example.com',
    allergies: 'Penicillin, Dust',
    status: 'Under Consultation',
    doctor: 'Dr. Ravi (Cardiology)',
    date: '13 Aug 2026',
  };

  const timelineSteps: TimelineStep[] = [
    { title: 'Appointment Booked', time: '09:00 AM', description: 'Scheduled online via patient portal', status: 'completed' },
    { title: 'Doctor Consultation', time: '09:20 AM', description: 'Consultation with Dr. Ravi completed', status: 'completed' },
    { title: 'Blood Test Recommended', time: '09:45 AM', description: 'CBC & Lipid profile ordered', status: 'completed' },
    { title: 'Sample Collected', time: '10:10 AM', description: 'Blood sample sent to Lab #2', status: 'completed' },
    { title: 'Report Uploaded', time: '11:15 AM', description: 'Lab report published by Technician', status: 'current' },
    { title: 'Prescription Generated', time: 'Pending', description: 'Awaiting doctor final review', status: 'pending' },
    { title: 'Payment Completed', time: 'Pending', description: 'Bill generation', status: 'pending' },
    { title: 'Appointment Closed', time: 'Pending', description: 'Consultation lifecycle complete', status: 'pending' },
  ];

  const medicalHistory = [
    { date: '12 Aug 2026', doctor: 'Dr. Ravi', diagnosis: 'Mild Hypertension', treatment: 'Rest & Amlodipine 5mg' },
    { date: '04 Jul 2026', doctor: 'Dr. Kumar', diagnosis: 'Seasonal Allergy', treatment: 'Cetirizine 10mg' },
  ];

  const historyColumns: Column<typeof medicalHistory[0]>[] = [
    { header: 'Date', accessor: 'date', className: 'font-semibold text-slate-900' },
    { header: 'Doctor', accessor: 'doctor' },
    { header: 'Diagnosis', accessor: 'diagnosis' },
    { header: 'Treatment Plan', accessor: 'treatment' },
  ];

  return (
    <PageContainer
      title={`Patient: ${patient.name}`}
      description={`Patient ID: ${patient.id} • Registered Profile & Clinical History`}
      actions={
        <button
          onClick={() => navigate('/patients')}
          className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
        >
          ← Back to Patients
        </button>
      }
    >
      {/* Patient Header Summary Bar */}
      <div className="hms-card p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
            {patient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">{patient.name}</h2>
              <StatusBadge status={patient.status} />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {patient.age} yrs • {patient.gender} • Blood Group: <span className="font-bold text-slate-700">{patient.bloodGroup}</span>
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Assigned Doctor: <span className="font-semibold text-slate-900">{patient.doctor}</span></p>
          <p>Phone: <span className="font-semibold text-slate-900">{patient.phone}</span></p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'history', label: 'Medical History' },
          { key: 'reports', label: 'Reports' },
          { key: 'rx', label: 'Prescriptions' },
          { key: 'lab', label: 'Laboratory' },
          { key: 'billing', label: 'Billing' },
          { key: 'timeline', label: 'Timeline' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="hms-card p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Demographics</h3>
              <div className="text-xs space-y-2 text-slate-700">
                <p><span className="text-slate-400 font-medium">Full Name:</span> {patient.name}</p>
                <p><span className="text-slate-400 font-medium">Age & Gender:</span> {patient.age} years ({patient.gender})</p>
                <p><span className="text-slate-400 font-medium">Blood Group:</span> {patient.bloodGroup}</p>
                <p><span className="text-slate-400 font-medium">Contact Phone:</span> {patient.phone}</p>
                <p><span className="text-slate-400 font-medium">Email:</span> {patient.email}</p>
                <p><span className="text-slate-400 font-medium">Known Allergies:</span> <span className="text-rose-600 font-semibold">{patient.allergies}</span></p>
              </div>
            </div>

            <div className="hms-card p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Consultation Status</h3>
              <div className="text-xs space-y-2 text-slate-700">
                <p><span className="text-slate-400 font-medium">Attending Doctor:</span> {patient.doctor}</p>
                <p><span className="text-slate-400 font-medium">Consultation Date:</span> {patient.date}</p>
                <p><span className="text-slate-400 font-medium">Current Status:</span> <StatusBadge status={patient.status} /></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <Table columns={historyColumns} data={medicalHistory} keyExtractor={row => row.date} />
        )}

        {activeTab === 'timeline' && (
          <div className="hms-card p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Patient Consultation Timeline</h3>
            <Timeline steps={timelineSteps} />
          </div>
        )}

        {['reports', 'rx', 'lab', 'billing'].includes(activeTab) && (
          <div className="hms-card p-8 text-center text-xs text-slate-500">
            Records and details for <span className="font-semibold uppercase">{activeTab}</span> are active and synchronized.
          </div>
        )}
      </div>
    </PageContainer>
  );
};
