import { createTheme } from '@mantine/core';

export const lightTheme = createTheme({
  primaryColor: 'blue',

  colors: {
    blue: [
      '#EFF6FF',
      '#DBEAFE',
      '#BFDBFE',
      '#93C5FD',
      '#60A5FA',
      '#2563EB',
      '#1D4ED8',
      '#1E40AF',
      '#1E3A8A',
      '#172554',
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
