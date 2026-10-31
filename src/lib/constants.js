export const SITE_NAME = "Syed's Enterprises";
export const SITE_DOMAIN = 'syedsenterprises.org';
export const SITE_URL = `https://${SITE_DOMAIN}`;

export const NAVIGATION_ITEMS = Object.freeze([
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Founder', href: '#founder' },
]);

export const SITE_CONFIG = Object.freeze({
  name: SITE_NAME,
  domain: SITE_DOMAIN,
  url: SITE_URL,
});
