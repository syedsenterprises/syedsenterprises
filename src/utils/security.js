import { parseHttpUrl } from './validateUrl.js';

export const SAFE_EXTERNAL_LINK_ATTRIBUTES = Object.freeze({
  target: '_blank',
  rel: 'noopener noreferrer',
});

/**
 * Returns a safe external URL string, or null for invalid/dangerous input.
 */
export function getSafeExternalUrl(value) {
  return parseHttpUrl(value)?.href ?? null;
}

/**
 * Props for links opened in a new tab, preventing access to window.opener.
 */
export function getSafeExternalLinkProps(value) {
  const href = getSafeExternalUrl(value);
  return href ? { href, ...SAFE_EXTERNAL_LINK_ATTRIBUTES } : null;
}
