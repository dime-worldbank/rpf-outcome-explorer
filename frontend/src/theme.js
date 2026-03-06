// Centralised design tokens — import from here instead of using magic values

export const colors = {
  primary:        '#2d7aaa',
  primaryDark:    '#0d2d4a',
  primaryMid:     '#1a3a52',
  primaryBg:      'rgba(45,122,170,0.06)',
  primaryBgSolid: '#f5fafd',
  border:         '#b8d9ee',
  pageBg:         'rgb(240, 240, 240)',
  textMuted:      '#444',
  white:          '#fff',
};

export const typography = {
  label:   { fontSize: 'var(--fs-sm)',   fontWeight: '700', color: colors.primary,    textTransform: 'uppercase', letterSpacing: '0.07em' },
  title:   { fontSize: 'var(--fs-base)', fontWeight: '700', color: colors.primaryDark, textTransform: 'uppercase', letterSpacing: '0.06em' },
  body:    { fontSize: 'var(--fs-base)', color: colors.primaryMid, lineHeight: 1.7 },
  bodyMd:  { fontSize: 'var(--fs-md)',   color: colors.primaryMid, lineHeight: 1.7 },
  heading: { fontSize: 'var(--fs-lg)',   fontWeight: '700', color: colors.primaryDark, lineHeight: 1.5 },
};

export const radius = { sm: '3px', md: '6px', lg: '8px' };

export const card = {
  base: {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: 'clamp(10px, 0.8vw, 18px) clamp(12px, 1vw, 22px)',
  },
  definition: {
    background: colors.primaryBgSolid,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: 'clamp(8px, 0.6vw, 14px) clamp(10px, 0.8vw, 18px)',
  },
  instruction: {
    borderLeft: `4px solid ${colors.primary}`,
    background:  colors.primaryBg,
    borderRadius: '0 8px 8px 0',
    padding: 'clamp(12px, 0.9vw, 20px) clamp(14px, 1.1vw, 24px)',
  },
  lesson: {
    background:   colors.primaryBg,
    borderLeft:   `3px solid ${colors.primary}`,
    borderRadius: '0 6px 6px 0',
    padding:      'clamp(8px, 0.7vw, 14px) clamp(10px, 0.9vw, 18px)',
  },
};

export const badge = {
  outcome: {
    display:       'inline-block',
    fontSize:      'var(--fs-xs)',
    fontWeight:    '700',
    color:         colors.white,
    background:    colors.primary,
    borderRadius:  radius.sm,
    padding:       '2px 7px',
    letterSpacing: '0.04em',
  },
};
