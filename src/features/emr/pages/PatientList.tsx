import React, { useState } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Table, Column } from '../../../components/common/Table';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { useNavigate } from 'react-router-dom';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  doctor: string;
  status: string;
}

export const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const patients: Patient[] = [
    { id: 'P001', name: 'Rahul Kumar', age: 32, gender: 'Male', bloodGroup: 'O+', doctor: 'Dr. Ravi', status: 'Active' },
    { id: 'P002', name: 'Priya Sharma', age: 27, gender: 'Female', bloodGroup: 'A+', doctor: 'Dr. Kumar', status: 'Completed' },
    { id: 'P003', name: 'Arun Rao', age: 45, gender: 'Male', bloodGroup: 'B+', doctor: 'Dr. Smith', status: 'Waiting' },
    { id: 'P004', name: 'Deepa Verma', age: 38, gender: 'Female', bloodGroup: 'AB-', doctor: 'Dr. Ravi', status: 'Active' },
    { id: 'P005', name: 'Karan Patel', age: 52, gender: 'Male', bloodGroup: 'O-', doctor: 'Dr. Mehta', status: 'Pending' },
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const columns: Column<Patient>[] = [
    { header: 'Patient ID', accessor: 'id', className: 'font-mono text-xs font-semibold text-slate-500' },
    {
      header: 'Patient Name',
      accessor: p => (
        <button
          onClick={() => navigate(`/patients/${p.id}`)}
          className="font-semibold text-sky-600 hover:underline text-left"
        >
          {p.name}
        </button>
      ),
    },
    { header: 'Age / Gender', accessor: p => `${p.age} yrs, ${p.gender}` },
    { header: 'Blood Group', accessor: 'bloodGroup', className: 'font-semibold text-slate-700' },
    { header: 'Assigned Doctor', accessor: 'doctor' },
    { header: 'Status', accessor: p => <StatusBadge status={p.status} /> },
    {
      header: 'Actions',
      accessor: p => (
        <button
          onClick={() => navigate(`/patients/${p.id}`)}
          className="text-xs font-semibold text-slate-600 hover:text-sky-600 px-2.5 py-1 rounded bg-slate-100 hover:bg-sky-50 transition-colors"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <PageContainer
      title="Patients Directory"
      description="Manage registered patients, medical histories, and active consultations."
      actions={
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors shadow-sm">
          + Add New Patient
        </button>
      }
    >
      {/* Search & Filter Bar */}
      <div className="hms-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by patient ID or name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="WAITING">Waiting</option>
          </select>
        </div>
      </div>

      {/* Patient Table */}
      <Table columns={columns} data={filteredPatients} keyExtractor={p => p.id} />
    </PageContainer>
  );
};
