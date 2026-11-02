/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink: '#070a12', cyan: '#6de7ff', gold: '#e5bc52', fog: '#9da9bd' }, fontFamily: { display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'], body: ['"DM Sans"', 'ui-sans-serif', 'system-ui'] } } },
  plugins: []
};
