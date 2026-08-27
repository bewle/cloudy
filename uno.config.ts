import { defineConfig, presetWind4 } from 'unocss'
import { transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
  ],
  theme: {
    colors: {
      'accent': 'var(--accent)',
      'accent-foreground': 'var(--accent-foreground)',
      'background': 'var(--background)',
      'border': 'var(--border)',
      'border-strong': 'var(--border-strong)',
      'danger': 'var(--danger)',
      'danger-foreground': 'var(--danger-foreground)',
      'danger-hover': 'var(--danger-hover)',
      'danger-press': 'var(--danger-press)',
      'foreground': 'var(--foreground)',
      'hover': 'var(--hover)',
      'input': 'var(--input)',
      'muted': 'var(--muted)',
      'muted-foreground': 'var(--muted-foreground)',
      'overlay': 'var(--overlay)',
      'popover': 'var(--popover)',
      'popover-foreground': 'var(--popover-foreground)',
      'primary': 'var(--primary)',
      'primary-foreground': 'var(--primary-foreground)',
      'ring': 'var(--ring)',
      'secondary': 'var(--secondary)',
      'secondary-foreground': 'var(--secondary-foreground)',
      'secondary-raised': 'var(--secondary-raised)',
      'selected': 'var(--selected)',
      'success': 'var(--success)',
      'surface': 'var(--surface)',
      'surface-foreground': 'var(--surface-foreground)',
      'surface-raised': 'var(--surface-raised)',
      'surface-top': 'var(--surface-top)',
      'warn': 'var(--warn)',
    },
    duration: {
      DEFAULT: '92.5ms',
      long: '150ms',
    },
    font: {
      mono: 'Paper Mono',
      sans: 'Inter',
    },
    radius: {
      DEFAULT: 'var(--radius)',
    },
    shadow: {
      DEFAULT: [`0 4px 5px oklch(from var(--background) l c h / 0.35)`],
      lg: [`0 6px 8px oklch(from var(--background) l c h / 0.75)`],
      md: [`0 6px 6px oklch(from var(--background) l c h / 0.50)`],
      popover: [`0 6px 10px oklch(from var(--background) l c h / 0.75)`],
      sm: [`0 4px 5px oklch(from var(--background) l c h / 0.35)`],
    },
    text: {
      '2xs': {
        fontSize: '0.7rem',
        lineHeight: '0.875rem',
      },
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives({ throwOnMissing: false })],
})
