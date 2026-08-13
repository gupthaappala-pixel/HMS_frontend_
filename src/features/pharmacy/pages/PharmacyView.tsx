import React, { useState } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Table, Column } from '../../../components/common/Table';
import { StatusBadge } from '../../../components/common/StatusBadge';

interface InventoryItem {
  code: string;
  medicine: string;
  category: string;
  stock: number;
  price: string;
  status: string;
}

export const PharmacyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'queue' | 'inventory' | 'billing'>('inventory');

  const inventory: InventoryItem[] = [
    { code: 'MED001', medicine: 'Paracetamol 500mg', category: 'Analgesic', stock: 120, price: '₹10', status: 'Available' },
    { code: 'MED002', medicine: 'Amoxicillin 250mg', category: 'Antibiotic', stock: 8, price: '₹35', status: 'Low Stock' },
    { code: 'MED003', medicine: 'Cetirizine 10mg', category: 'Antihistamine', stock: 0, price: '₹12', status: 'Out of Stock' },
    { code: 'MED004', medicine: 'Amlodipine 5mg', category: 'Cardiovascular', stock: 45, price: '₹22', status: 'Available' },
  ];

  const inventoryColumns: Column<InventoryItem>[] = [
    { header: 'Code', accessor: 'code', className: 'font-mono text-xs font-semibold text-slate-500' },
    { header: 'Medicine Name', accessor: 'medicine', className: 'font-semibold text-slate-900' },
    { header: 'Category', accessor: 'category' },
    { header: 'Stock Qty', accessor: 'stock', className: 'font-bold text-slate-700' },
    { header: 'Unit Price', accessor: 'price', className: 'font-medium text-slate-900' },
    { header: 'Status', accessor: item => <StatusBadge status={item.status} /> },
  ];

  return (
    <PageContainer
      title="Pharmacy & Inventory Management"
      description="Fulfill digital prescriptions, track medicine stock levels, and generate pharmacy receipts."
      actions={
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors shadow-sm">
          + Add New Medicine
        </button>
      }
    >
      {/* Pharmacy Section Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-2">
        {[
          { key: 'queue', label: 'Prescription Queue' },
          { key: 'inventory', label: 'Medicine Inventory' },
          { key: 'billing', label: 'Pharmacy Billing' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
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
      {activeTab === 'inventory' && (
        <Table columns={inventoryColumns} data={inventory} keyExtractor={item => item.code} />
      )}

      {activeTab !== 'inventory' && (
        <div className="hms-card p-8 text-center text-xs text-slate-500">
          Section <span className="font-semibold uppercase">{activeTab}</span> is synced with prescription queue orders.
        </div>
      )}
    </PageContainer>
  );
};
