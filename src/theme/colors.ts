export interface ColorTokens {
  primary: string;
  primaryHover: string;
  primaryLight: string;

  secondary: string;
  secondaryHover: string;
  secondaryLight: string;

  background: string;
  surface: string;
  surfaceHover: string;

  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };

  border: string;
  divider: string;

  status: {
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    info: string;
    infoLight: string;
  };

  sidebar: {
    background: string;
    border: string;
    active: string;
    text: string;
    activeText: string;
  };

  header: {
    background: string;
    border: string;
  };
}

export const lightColors: ColorTokens = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryLight: '#EFF6FF',

  secondary: '#0F766E',
  secondaryHover: '#115E59',
  secondaryLight: '#F0FDFA',

  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceHover: '#F1F5F9',

  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#64748B',
    inverse: '#FFFFFF',
  },

  border: '#E2E8F0',
  divider: '#F1F5F9',

  status: {
    success: '#16A34A',
    successLight: '#DCFCE7',
    warning: '#D97706',
    warningLight: '#FEF3C7',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    info: '#0284C7',
    infoLight: '#E0F2FE',
  },

  sidebar: {
    background: '#FFFFFF',
    border: '#E2E8F0',
    active: '#EFF6FF',
    text: '#475569',
    activeText: '#2563EB',
  },

  header: {
    background: '#FFFFFF',
    border: '#E2E8F0',
  },
};

export const darkColors: ColorTokens = {
  primary: '#60A5FA',
  primaryHover: '#93C5FD',
  primaryLight: '#1E3A5F',

  secondary: '#2DD4BF',
  secondaryHover: '#5EEAD4',
  secondaryLight: '#134E4A',

  background: '#0F172A',
  surface: '#1E293B',
  surfaceHover: '#334155',

  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    muted: '#94A3B8',
    inverse: '#0F172A',
  },

  border: '#334155',
  divider: '#1E293B',

  status: {
    success: '#4ADE80',
    successLight: 'rgba(74, 222, 128, 0.15)',
    warning: '#FBBF24',
    warningLight: 'rgba(251, 191, 36, 0.15)',
    error: '#F87171',
    errorLight: 'rgba(248, 113, 113, 0.15)',
    info: '#38BDF8',
    infoLight: 'rgba(56, 189, 248, 0.15)',
  },

  sidebar: {
    background: '#111827',
    border: '#1E293B',
    active: '#1E3A5F',
    text: '#CBD5E1',
    activeText: '#60A5FA',
  },

  header: {
    background: '#111827',
    border: '#1E293B',
  },
};
