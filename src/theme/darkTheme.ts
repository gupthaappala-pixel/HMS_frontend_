import { createTheme } from '@mantine/core';

export const darkTheme = createTheme({
  primaryColor: 'blue',

  colors: {
    blue: [
      '#EFF6FF',
      '#DBEAFE',
      '#BFDBFE',
      '#93C5FD',
      '#60A5FA',
      '#3B82F6',
      '#2563EB',
      '#1D4ED8',
      '#1E40AF',
      '#1E3A8A',
    ],
    teal: [
      '#F0FDFA',
      '#CCFBF1',
      '#99F6E4',
      '#5EEAD4',
      '#2DD4BF',
      '#14B8A6',
      '#0F766E',
      '#115E59',
      '#134E4A',
      '#042F2E',
    ],
    dark: [
      '#F8FAFC',
      '#CBD5E1',
      '#94A3B8',
      '#64748B',
      '#475569',
      '#334155',
      '#1E293B',
      '#0F172A',
      '#111827',
      '#020617',
    ],
  },

  fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  headings: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  defaultRadius: 'md',

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
    },
    Paper: {
      defaultProps: {
        radius: 'md',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});
