import React from 'react';
import {
  IconLayoutDashboard,
  IconUsers,
  IconStethoscope,
  IconCalendarEvent,
  IconFlask,
  IconPill,
  IconReceipt2,
  IconFileAnalytics,
  IconSettings,
  IconPrescription,
  IconUserShield,
} from '@tabler/icons-react';

export interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number | string; stroke?: number | string; className?: string }>;
  roles?: string[];
  badge?: string;
  moduleColor?: string;
}

export const navigationConfig: NavItemConfig[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: IconLayoutDashboard,
    moduleColor: '#2563EB',
  },
  {
    label: 'Patients',
    path: '/patients',
    icon: IconUsers,
    moduleColor: '#0F766E',
  },
  {
    label: 'Doctor Consultation',
    path: '/doctors',
    icon: IconStethoscope,
    moduleColor: '#2563EB',
  },
  {
    label: 'Appointments',
    path: '/appointments',
    icon: IconCalendarEvent,
    moduleColor: '#0284C7',
  },
  {
    label: 'Laboratory',
    path: '/laboratory',
    icon: IconFlask,
    moduleColor: '#0F766E',
  },
  {
    label: 'Pharmacy',
    path: '/pharmacy',
    icon: IconPill,
    moduleColor: '#16A34A',
  },
  {
    label: 'Prescriptions',
    path: '/prescriptions',
    icon: IconPrescription,
    moduleColor: '#14B8A6',
  },
  {
    label: 'Billing & Payments',
    path: '/billing',
    icon: IconReceipt2,
    moduleColor: '#D97706',
  },
  {
    label: 'Reports & Analytics',
    path: '/reports',
    icon: IconFileAnalytics,
    moduleColor: '#6366F1',
  },
];

export const bottomNavigationConfig: NavItemConfig[] = [
  {
    label: 'System Settings',
    path: '/settings',
    icon: IconSettings,
    moduleColor: '#64748B',
  },
];
