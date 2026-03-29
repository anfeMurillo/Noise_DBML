/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: 'var(--vscode-editor-background)',
          fg: 'var(--vscode-editor-foreground)',
          border: 'var(--vscode-panel-border)',
          'sidebar-bg': 'var(--vscode-sideBar-background)',
          'sidebar-fg': 'var(--vscode-sideBar-foreground)',
          'badge-bg': 'var(--vscode-badge-background)',
          'badge-fg': 'var(--vscode-badge-foreground)',
          'button-bg': 'var(--vscode-button-background)',
          'button-fg': 'var(--vscode-button-foreground)',
          'input-bg': 'var(--vscode-input-background)',
          'input-fg': 'var(--vscode-input-foreground)',
          'list-hover': 'var(--vscode-list-hoverBackground)',
          'focus-border': 'var(--vscode-focusBorder)',
        },
      },
      fontFamily: {
        vscode: 'var(--vscode-font-family)',
      },
      fontSize: {
        vscode: 'var(--vscode-font-size)',
      },
    },
  },
  plugins: [],
};
