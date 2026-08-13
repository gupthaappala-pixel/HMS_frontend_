import React, { useState } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Table, Column } from '../../../components/common/Table';
import { StatusBadge } from '../../../components/common/StatusBadge';

interface LabTest {
  id: string;
  patient: string;
  test: string;
  doctor: string;
  sample: string;
  status: string;
}

export const LaboratoryQueue: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const tests: LabTest[] = [
    { id: 'T001', patient: 'Rahul Kumar', test: 'Complete Blood Count (CBC)', doctor: 'Dr. Ravi', sample: 'Collected', status: 'Processing' },
    { id: 'T002', patient: 'Priya Sharma', test: 'Chest X-Ray', doctor: 'Dr. Kumar', sample: 'Completed', status: 'Report Ready' },
    { id: 'T003', patient: 'Arun Rao', test: 'Lipid Profile', doctor: 'Dr. Smith', sample: 'Pending', status: 'Waiting' },
    { id: 'T004', patient: 'Deepa Verma', test: 'Urinalysis', doctor: 'Dr. Ravi', sample: 'Collected', status: 'Processing' },
  ];

  const filtered = tests.filter(t => {
    const matchesSearch = t.patient.toLowerCase().includes(searchTerm.toLowerCase()) || t.test.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status.toUpperCase().includes(statusFilter.toUpperCase());
    return matchesSearch && matchesStatus;
  });

  const columns: Column<LabTest>[] = [
    { header: 'Test ID', accessor: 'id', className: 'font-mono text-xs font-semibold text-slate-500' },
    { header: 'Patient', accessor: 'patient', className: 'font-semibold text-slate-900' },
    { header: 'Test Name', accessor: 'test' },
    { header: 'Ordering Doctor', accessor: 'doctor' },
    { header: 'Sample Status', accessor: 'sample', className: 'text-slate-600' },
    { header: 'Status', accessor: t => <StatusBadge status={t.status} /> },
    {
      header: 'Actions',
      accessor: t => (
        <button className="text-xs font-semibold text-sky-600 hover:underline">
          Upload Report
        </button>
      ),
    },
  ];

  return (
    <PageContainer
      title="Laboratory Test Queue"
      description="Track lab test requests, sample collections, and upload diagnostic reports."
    >
      {/* Search & Filter Header */}
      <div className="hms-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search test ID, patient, or test..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-sky-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold focus:outline-none focus:border-sky-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="PROCESSING">Processing</option>
          <option value="REPORT READY">Report Ready</option>
          <option value="WAITING">Waiting</option>
        </select>
      </div>

      {/* Lab Queue Table */}
      <Table columns={columns} data={filtered} keyExtractor={t => t.id} />
    </PageContainer>
  );
};
