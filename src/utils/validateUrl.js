const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

/**
 * Returns a parsed HTTP(S) URL, or null when the input is unsafe or invalid.
 */
export function parseHttpUrl(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  try {
    const url = new URL(value.trim());
    return ALLOWED_PROTOCOLS.has(url.protocol) ? url : null;
  } catch {
    return null;
  }
}

/**
 * Checks whether a value is a valid absolute HTTP or HTTPS URL.
 */
export function isValidHttpUrl(value) {
  return parseHttpUrl(value) !== null;
}
