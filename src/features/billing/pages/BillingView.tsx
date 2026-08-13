import React from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { StatusBadge } from '../../../components/common/StatusBadge';

export const BillingView: React.FC = () => {
  const invoice = {
    id: 'INV-1025',
    patient: 'Rahul Kumar',
    patientId: 'P001',
    date: '13 Aug 2026',
    doctor: 'Dr. Ravi',
    items: [
      { description: 'Cardiology Consultation Fee', qty: 1, price: 500, total: 500 },
      { description: 'CBC Complete Blood Count Test', qty: 1, price: 350, total: 350 },
      { description: 'Paracetamol 500mg (10 tabs)', qty: 1, price: 20, total: 20 },
      { description: 'Amlodipine 5mg (30 tabs)', qty: 1, price: 66, total: 66 },
    ],
    subtotal: 936,
    discount: 36,
    gst: 45,
    grandTotal: 945,
    status: 'Completed',
  };

  return (
    <PageContainer
      title="Billing & Invoice Receipt"
      description="Manage invoice statements, itemized hospital charges, and payment confirmations."
    >
      <div className="max-w-3xl mx-auto hms-card p-8 space-y-6">
        {/* Invoice Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">INVOICE #{invoice.id}</h2>
            <p className="text-xs text-slate-500 mt-1">Date: {invoice.date}</p>
          </div>
          <div className="text-right">
            <StatusBadge status={invoice.status} />
            <p className="text-xs text-slate-500 mt-1">Attending Doctor: {invoice.doctor}</p>
          </div>
        </div>

        {/* Patient Detail Box */}
        <div className="bg-slate-50 p-4 rounded-lg text-xs space-y-1 text-slate-700">
          <p><span className="text-slate-400 font-medium">Billed To:</span> <span className="font-bold text-slate-900">{invoice.patient}</span> ({invoice.patientId})</p>
          <p><span className="text-slate-400 font-medium">Payment Mode:</span> UPI / Credit Card</p>
        </div>

        {/* Itemized Table */}
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold">
              <th className="py-2">Item Description</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-900 font-medium">
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-center">{item.qty}</td>
                <td className="py-3 text-right">₹{item.price}</td>
                <td className="py-3 text-right">₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Calculation Summary */}
        <div className="border-t border-slate-200 pt-4 text-xs space-y-2 text-right">
          <div className="flex justify-end gap-12 text-slate-600">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-900">₹{invoice.subtotal}</span>
          </div>
          <div className="flex justify-end gap-12 text-slate-600">
            <span>Discount:</span>
            <span className="font-semibold text-rose-600">-₹{invoice.discount}</span>
          </div>
          <div className="flex justify-end gap-12 text-slate-600">
            <span>GST (5%):</span>
            <span className="font-semibold text-slate-900">+₹{invoice.gst}</span>
          </div>
          <div className="flex justify-end gap-12 text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
            <span>Grand Total:</span>
            <span className="text-sky-600 text-base">₹{invoice.grandTotal}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors">
            Download Invoice PDF
          </button>
          <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
            Payment Received ✓
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
