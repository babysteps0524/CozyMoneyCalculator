import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
} from 'unocss';

import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';

export default defineConfig({
  presets: [
    presetWind4({ dark: 'media' }),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],

  transformers: [transformerAttributifyJsx()],

  theme: {
    fontFamily: {
      sans: '"Pretendard Variable", Pretendard, system-ui, sans-serif',
    },
    colors: {
      primary: 'oklch(56% 0.19 250)',
      'primary-hover': 'oklch(50% 0.19 250)',
      'primary-active': 'oklch(45% 0.19 250)',
      surface: 'oklch(100% 0 0)',
      'surface-muted': 'oklch(97% 0.01 250)',
      'surface-subtle': 'oklch(94% 0.015 250)',
      text: 'oklch(22% 0.02 250)',
      'text-muted': 'oklch(50% 0.025 250)',
      'text-subtle': 'oklch(62% 0.02 250)',
      border: 'oklch(89% 0.02 250)',
      'border-strong': 'oklch(80% 0.025 250)',
      'danger-surface': 'oklch(96% 0.025 25)',
      'dark-primary-surface': 'oklch(25% 0.04 250)',
      'danger-text': 'oklch(48% 0.16 25)',
      'dark-danger-surface': 'oklch(25% 0.04 25)',
      'dark-danger-text': 'oklch(78% 0.12 25)',
      'dark-surface': 'oklch(18% 0.02 250)',
      'dark-surface-muted': 'oklch(22% 0.025 250)',
      'dark-surface-subtle': 'oklch(27% 0.025 250)',
      'dark-text': 'oklch(96% 0.015 250)',
      'dark-text-muted': 'oklch(74% 0.02 250)',
      'dark-text-subtle': 'oklch(62% 0.02 250)',
      'dark-border': 'oklch(31% 0.025 250)',
      'dark-border-strong': 'oklch(40% 0.03 250)',
    },
  },
  shortcuts: {
    'cm-container': 'mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8',
    'cm-page':
      'min-h-screen bg-surface text-text dark:bg-dark-surface dark:text-dark-text',
    'cm-card':
      'rounded-2xl border border-border bg-surface dark:border-dark-border dark:bg-dark-surface-muted',
    'cm-card-interactive':
      'cm-card cursor-pointer transition duration-100 ease-out hover:border-border-strong active:opacity-90 dark:hover:border-dark-border-strong',
    'cm-button':
      'inline-flex cursor-pointer items-center justify-center rounded-xl font-semibold outline-none transition duration-100 ease-out focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-dark-surface disabled:cursor-not-allowed disabled:opacity-50',
    'cm-button-primary':
      'cm-button bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
    'cm-button-secondary':
      'cm-button border border-border bg-surface text-text-muted hover:border-border-strong hover:text-text active:bg-surface-subtle dark:border-dark-border dark:bg-dark-surface-muted dark:text-dark-text-muted dark:hover:border-dark-border-strong dark:hover:text-dark-text dark:active:bg-dark-surface-subtle',
    'cm-input':
      'w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-text outline-none transition duration-100 placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/15 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-text-subtle dark:focus:border-primary',
    'cm-step-button':
      'cm-button h-11 w-11 shrink-0 border border-border bg-surface text-xl font-700 text-text-muted hover:border-border-strong hover:text-text active:bg-surface-subtle sm:h-12 sm:w-12 md:h-11 md:w-11 lg:h-12 lg:w-12 dark:border-dark-border dark:bg-dark-surface-muted dark:text-dark-text-muted dark:hover:border-dark-border-strong dark:hover:text-dark-text dark:active:bg-dark-surface-subtle',
    'cm-label':
      'mb-2 block text-sm font-semibold text-text dark:text-dark-text',
    'cm-result':
      'rounded-xl border border-border bg-surface p-4 dark:border-dark-border dark:bg-dark-surface',
    'cm-number-ball':
      'inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-subtle text-sm font-800 text-text dark:bg-dark-surface-subtle dark:text-dark-text',
    'cm-section-title':
      'm-0 text-xl font-bold tracking-tight text-text md:text-2xl dark:text-dark-text',
  },
});
