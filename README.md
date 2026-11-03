# Syed Enterprises — One Company, Many Ventures (Achievements)

Live site: https://syedsenterprises.org

Syed Enterprises is a one-founder venture company run by Syed Shahed, a final-year
B.Sc. Computer Science student at St. Mary's College, Hyderabad. One company,
nine ventures — real estate, AI tools, gym software, a CRM, digital products,
gaming and more.

## The website

Midnight navy and gold theme. A fast static site with 8 pages — Home, About,
Ventures, Products, Services, Roadmap, Founder, Contact — using hash routing,
a liquid animated background, a labeled venture orbit, a glass-office HQ
diorama, cursor effects and a validation-only contact form. There is no blog
route on this site; blog posts are planned for a separate subdomain later.

## Ventures

- **Estate Path** — https://www.estatepath.online — Florida real estate guides, mortgage calculator and exam prep
- **LookForIt** — https://www.lookforit.xyz — directory of verified AI tools
- **RepRoster** — https://www.reproaster.store — gym management software
- **Real Estate CRM** — https://crm.estatepath.online — CRM for real estate agencies
- **Let Us Assume** — https://www.letusassume.in — money-making guides for India
- **Nano Ghost Gamer** — gaming YouTube channel
- **Web3User** — experimental Web3 project (not for real funds)
- **Gumroad digital products** — https://syedventures.gumroad.com — Florida real estate exam prep packs
- **GitHub open source** — https://github.com/syedsenterprises — games, calculators, tools and themes

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The site entry is the self-contained page at root `index.html`; the build output
is `dist/`. Do not commit `node_modules/` or local secrets. The previous React
app under `src/` is no longer referenced by the live site.

## Deployment

Push to `main` triggers the Cloudflare build (`npm run build` → `dist/`) and
deploys to https://syedsenterprises.org. `public/sitemap.xml` and
`public/robots.txt` describe the current 8 pages.

## Contact

- Email: syedsinterprises@gmail.com
- LinkedIn: https://www.linkedin.com/in/syedsenterprises
- GitHub: https://github.com/syedsenterprises
