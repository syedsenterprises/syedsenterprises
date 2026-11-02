import { createRoot } from 'react-dom/client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BrainCircuit,
  BriefcaseBusiness, Check, ChevronRight, CircleDot, Code2, ExternalLink,
  Github, Globe2, Layers3, Menu, Orbit, Rocket, Send, Sparkles, X, Youtube
} from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { posts } from './content/posts.js';
import { ecosystem, products, roadmap, services, ventures } from './data/siteContent.jsx';
import './styles.css';
import './immersive-overrides.css';
import './founder-hologram.css';

const WorldScene = lazy(() => import('./components/WorldScene.jsx'));
const SpaceEnvironment = lazy(() => import('./components/SpaceEnvironment.jsx'));
const FounderHologram = lazy(() => import('./components/FounderHologram.jsx'));

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return { path };
}

function Link({ href, children, className = '', onClick, ...props }) {
  const handleClick = event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target || !href.startsWith('/')) return;
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };
  return <a className={className} href={href} onClick={handleClick} {...props}>{children}</a>;
}

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: .12 });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 22 }} animate={isInView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .65, ease: [.2, .8, .2, 1] }}>{children}</motion.div>;
}

function TiltSurface({ children, className = '' }) {
  const ref = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [13, -13]), { stiffness: 190, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-16, 16]), { stiffness: 190, damping: 22 });
  const move = event => {
    const box = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - .5);
    pointerY.set((event.clientY - box.top) / box.height - .5);
    ref.current.style.setProperty('--mx', `${((event.clientX - box.left) / box.width) * 100}%`);
    ref.current.style.setProperty('--my', `${((event.clientY - box.top) / box.height) * 100}%`);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };
  return <motion.div ref={ref} className={`se-depth-card ${className}`} style={{ rotateX, rotateY }} whileHover={{ y: -6 }} onPointerMove={move} onPointerLeave={reset}>{children}</motion.div>;
}

function MotionLink({ children, className = '', ...props }) {
  return <motion.div whileHover={{ y: -3 }}><Link className={className} {...props}>{children}</Link></motion.div>;
}

function SceneLoading({ compact = false }) {
  return <div className={`se-world-scene ${compact ? 'is-compact' : ''} se-scene-loading`} role="status" aria-label="Loading interactive world preview"><span>Loading connected world</span></div>;
}

function LazyWorldScene({ compact = false, venture }) {
  return <Suspense fallback={<SceneLoading compact={compact} />}><WorldScene compact={compact} venture={venture} /></Suspense>;
}

function CursorAura() {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: .35 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 22, mass: .35 });
  useEffect(() => {
    const move = event => { x.set(event.clientX); y.set(event.clientY); };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);
  return <motion.div aria-hidden="true" className="se-cursor-aura" style={{ x: smoothX, y: smoothY }} />;
}

function BackToTop() {
  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return <button className="se-back-to-top is-visible" type="button" aria-label="Back to top" onClick={goToTop}><ArrowUp size={18} aria-hidden="true" /></button>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const { path } = useRoute();
  const links = [['/', 'Home'], ['/about', 'About'], ['/ventures', 'Ventures'], ['/services', 'Services'], ['/products', 'Products'], ['/roadmap', 'Roadmap'], ['/founder', 'Founder'], ['/contact', 'Contact']];
  return <header className="se-header"><Link href="/" className="se-brand"><span>SE</span><b>SYED<br />ENTERPRISES</b></Link><nav id="site-navigation" className={open ? 'is-open' : ''}>{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}</nav><button className="se-menu" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>;
}

function SectionHeading({ eyebrow, title, text, action }) {
  return <Reveal className="se-section-heading"><div><p className="se-overline">{eyebrow}</p><h2>{title}</h2></div>{text && <p className="se-heading-text">{text}</p>}{action}</Reveal>;
}

function Status({ value }) {
  const labels = { active: 'Active project', building: 'Building', experimental: 'Experimental', planned: 'Planned' };
  return <span className={`se-status is-${value}`}><i />{labels[value]}</span>;
}

function VentureCard({ venture }) {
  return <TiltSurface className={`se-venture-card is-${venture.color}`}><div className="se-card-top"><span className="se-mark">{venture.mark}</span><Status value={venture.status} /></div><div><small>{venture.category}</small><h3>{venture.name}</h3><p>{venture.description}</p></div><a className="se-inline-link" href={venture.url} target="_blank" rel="noreferrer">Open verified destination <ExternalLink size={14} /></a></TiltSurface>;
}

function Hero() {
  return <section className="se-hero se-shell"><Reveal className="se-hero-copy"><p className="se-overline"><i /> INDEPENDENT ENTREPRENEURIAL STUDIO / 2026</p><h1>One vision.<br /><em>Many ventures.</em></h1><p className="se-hero-lede">An independent entrepreneurial studio exploring, building and growing digital products, technology projects and new business ideas.</p><div className="se-actions"><MotionLink href="/ventures" className="se-button se-button-primary">Explore the ventures <ArrowRight size={16} /></MotionLink><MotionLink href="/about" className="se-text-link">How it works <ArrowDownRight size={15} /></MotionLink></div><div className="se-hero-metrics"><span><b>{String(ventures.length).padStart(2, '0')}</b> PROJECT WORLDS</span><span><b>{ecosystem.length}</b> WORK AREAS</span><span><b>∞</b> ROOM TO BUILD</span></div></Reveal><Reveal className="se-hero-visual"><LazyWorldScene /><div className="se-orbit-label se-orbit-label-a">WEB3 / AI / REAL ESTATE</div><div className="se-orbit-label se-orbit-label-b">ONE VISION / MANY VENTURES</div></Reveal></section>;
}

function About() {
  return <section className="se-section se-shell" id="about"><SectionHeading eyebrow="01 / THE COMPANY" title={<>One company.<br /><em>Many useful worlds.</em></>} text="Syed's Enterprises is an umbrella technology business: a small studio that develops focused ventures, products and experiments across connected problem spaces." /><div className="se-about-grid"><TiltSurface className="se-company-panel"><div className="se-company-core"><div className="se-core-ring" /><span>SE</span></div><div><p className="se-overline">THE OPERATING IDEA</p><h3>Build the answer.<br /><em>Keep the signal.</em></h3><p>Different ventures can share an instinct for clarity, usefulness and responsible experimentation without pretending they are one product.</p></div></TiltSurface><div className="se-ecosystem-grid">{ecosystem.map(item => <TiltSurface className={`se-ecosystem-card is-${item.color}`} key={item.name}><div className="se-icon">{item.icon}</div><h3>{item.name}</h3><p>{item.text}</p><ChevronRight size={15} /></TiltSurface>)}</div></div></section>;
}

function Ventures() {
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);
  const current = ventures[active];
  const selectPrevious = () => setActive(currentIndex => (currentIndex - 1 + ventures.length) % ventures.length);
  const selectNext = () => setActive(currentIndex => (currentIndex + 1) % ventures.length);
  const handleKeyDown = event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectNext();
    }
  };
  const handleTouchStart = event => { touchStart.current = event.changedTouches[0].clientX; };
  const handleTouchEnd = event => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) < 40) return;
    if (distance > 0) selectPrevious();
    else selectNext();
  };
  return <section className="se-section se-shell" id="ventures"><SectionHeading eyebrow="02 / THE ECOSYSTEM" title={<>Every venture<br /><em>has a reason.</em></>} text="Live projects, developing products and future directions are shown honestly, with a clear status for each world." /><div className="se-venture-layout"><div className="se-venture-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}><LazyWorldScene compact venture={current} /><div className="se-stage-pills">{ecosystem.map(item => <span className={`is-${item.color}`} key={item.name}>{item.name}</span>)}</div></div><div className="se-venture-focus" aria-live="polite" aria-atomic="true" tabIndex="0" onKeyDown={handleKeyDown}><p className="se-overline">{current.category}</p><h3>{current.name}</h3><p>{current.description}</p><Status value={current.status} /><a className="se-button se-button-primary" href={current.url} target="_blank" rel="noreferrer">Enter this world <ExternalLink size={15} /></a><div className="se-showcase-controls" role="group" aria-label="Venture navigation"><button type="button" aria-label="Previous venture" title="Previous venture" onClick={selectPrevious}><ArrowLeft /></button><output aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(ventures.length).padStart(2, '0')}</output><button type="button" aria-label="Next venture" title="Next venture" onClick={selectNext}><ArrowRight /></button></div></div></div><div className="se-venture-grid">{ventures.map(venture => <VentureCard key={venture.name} venture={venture} />)}</div></section>;
}

function Products() {
  return <section className="se-section se-shell" id="products"><SectionHeading eyebrow="03 / PRODUCTS & PROJECTS" title={<>Useful things<br /><em>in motion.</em></>} text="A product can be live, developing or simply a direction worth exploring. The distinction matters." /><div className="se-product-grid">{products.map(product => <TiltSurface className="se-product-card" key={product.name}><div className="se-product-icon">{product.icon}</div><Status value={product.status} /><h3>{product.name}</h3><p>{product.text}</p><a className="se-inline-link" href={product.url} target="_blank" rel="noreferrer">View destination <ExternalLink size={14} /></a></TiltSurface>)}</div></section>;
}

function Services() {
  return <section className="se-section se-section-dark se-shell" id="services"><SectionHeading eyebrow="04 / CAPABILITIES" title={<>From question<br /><em>to shipped.</em></>} text="Focused services for organizations and founders who need an idea made tangible, not just described." /><div className="se-services-grid">{services.map(([title, text, icon], index) => <TiltSurface className="se-service-card" key={title}><span className="se-index">0{index + 1}</span><div className="se-service-icon">{icon}</div><h3>{title}</h3><p>{text}</p><ArrowUpRight className="se-service-arrow" size={18} /></TiltSurface>)}</div></section>;
}

function Roadmap() {
  const [active, setActive] = useState(1);
  return <section className="se-section se-shell" id="roadmap"><SectionHeading eyebrow="05 / STRATEGIC DIRECTIONS" title={<>A direction,<br /><em>not a deadline.</em></>} text="These stages describe the intended arc of the company. They are strategic directions, not guarantees or claims of completed work." /><div className="se-roadmap"><div className="se-roadmap-line"><span style={{ '--progress': `${(active / (roadmap.length - 1)) * 100}%` }} /></div>{roadmap.map(([number, title, text, status], index) => <button className={`se-roadmap-step ${active === index ? 'is-active' : ''}`} key={number} onClick={() => setActive(index)}><span className="se-roadmap-node">{active >= index ? <Check size={14} /> : number}</span><small>{number} / {status}</small><h3>{title}</h3><p>{text}</p></button>)}</div><div className="se-roadmap-detail"><p className="se-overline">CURRENT VIEW / {roadmap[active][0]}</p><h3>{roadmap[active][1]}</h3><p>{roadmap[active][2]} The next step is shaped by evidence from the work before it.</p></div></section>;
}

function Founder({ standalone = false }) {
  return <section className={`se-section se-shell ${standalone ? 'se-founder-page' : ''}`} id="founder"><SectionHeading eyebrow="06 / THE FOUNDER" title={<>Built by one.<br /><em>Open to many.</em></>} text="Syed Shahed is the founder of Syed's Enterprises. The studio is intentionally practical: make something useful, learn from its edges and leave room for the next question." /><div className="se-founder-grid"><Suspense fallback={<div className="se-founder-hologram se-holo-loading">INITIALIZING FOUNDER PROJECTION…</div>}><FounderHologram /></Suspense><div className="se-founder-copy"><p className="se-overline">A PRACTICAL STUDIO</p><h3>Curiosity is the starting point.<br /><em>Usefulness is the test.</em></h3><p>The founder projection is rendered as a live 3D scene, with a responsive holographic display built around the supplied portrait.</p><div className="se-fact-list"><span><CircleDot size={14} /> Software, products and publishing</span><span><CircleDot size={14} /> Independent and deliberately small</span><span><CircleDot size={14} /> Open to thoughtful collaboration</span></div><Link href="/contact" className="se-button">Start a conversation <ArrowUpRight size={15} /></Link></div></div></section>;
}

function Mission() {
  return <section className="se-section se-section-dark se-shell" id="mission"><SectionHeading eyebrow="07 / MISSION & VISION" title={<>Make complexity<br /><em>more useful.</em></>} text="The long-term direction is a connected group of technology businesses, useful digital products and intelligent systems that help people make clearer decisions and do better work." /><div className="se-mission-grid"><TiltSurface className="se-mission-card"><Sparkles /><h3>Useful by default</h3><p>Every experiment starts with a specific problem and a responsibility to make its limits visible.</p></TiltSurface><TiltSurface className="se-mission-card"><Orbit /><h3>Connected by instinct</h3><p>Shared systems, learning and distribution can help independent products compound without becoming indistinct.</p></TiltSurface><TiltSurface className="se-mission-card"><Globe2 /><h3>Open to the world</h3><p>Build locally, publish clearly and keep the work understandable to people outside the room.</p></TiltSurface></div></section>;
}

function Contact() {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const submit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { setFeedback('Please complete the required fields.'); return; }
    setFeedback('Your message was not sent: this static site has no backend yet. Please use GitHub to open a proposal.');
  };
  return <section className="se-section se-shell" id="contact"><SectionHeading eyebrow="08 / CONTACT" title={<>Have a useful<br /><em>question?</em></>} text="Share the problem, project or direction you have in mind. This interface validates your note locally and does not pretend to submit without a connected backend." /><div className="se-contact-grid"><form className="se-contact-form" onSubmit={submit} noValidate><label>Name<input name="name" required autoComplete="name" placeholder="Your name" /></label><label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label><label>What are you building?<textarea name="message" required value={message} onChange={event => setMessage(event.target.value)} placeholder="A short, precise proposal..." rows="5" /></label><button className="se-button se-button-primary" type="submit">Validate message <Send size={15} /></button>{feedback && <p className="se-form-feedback" role="status">{feedback}</p>}</form><div className="se-contact-aside"><p className="se-overline">OPEN DOOR / 001</p><h3>Start with the problem.</h3><p>For public work, code and collaboration, GitHub is the verified starting point.</p><a className="se-button" href="https://github.com/syedsenterprises" target="_blank" rel="noreferrer">Open GitHub <Github size={15} /></a></div></div></section>;
}

function Home() {
  return <><Hero /><About /><Ventures /><Products /><Services /><Roadmap /><Founder /><Mission /><Contact /></>;
}

function Blog() {
  return <section className="se-section se-shell"><SectionHeading eyebrow="JOURNAL / BUILD NOTES" title={<>The work<br /><em>in public.</em></>} text="Articles, experiments and honest updates from Syed's Enterprises." /><div className="se-article-grid">{posts.map(post => <TiltSurface className="se-article-card" key={post.slug}><small>{post.category} · {post.date}</small><span>{post.number}</span><h3>{post.title}</h3><p>{post.excerpt}</p><Link className="se-inline-link" href={`/blog/${post.slug}`}>Read article <ArrowRight size={14} /></Link></TiltSurface>)}</div></section>;
}

function Article({ slug }) {
  const post = posts.find(item => item.slug === slug);
  if (!post) return <NotFound />;
  return <article className="se-article-page se-shell"><Link className="se-back-link" href="/blog"><ArrowLeft size={15} /> Back to journal</Link><p className="se-overline">{post.category} · {post.date}</p><h1>{post.title}</h1><p className="se-article-lede">{post.excerpt}</p><div className="se-article-body">{post.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></article>;
}

function NotFound() {
  return <section className="se-section se-shell"><SectionHeading eyebrow="404 / NOT FOUND" title={<>This frame<br /><em>is missing.</em></>} text="That page does not exist. Return home and explore the connected worlds." action={<Link className="se-button" href="/">Back home <ArrowLeft size={15} /></Link>} /></section>;
}

function Footer() {
  return <footer className="se-footer"><div className="se-shell"><div><p className="se-overline">SYED'S ENTERPRISES / 2026</p><h2>Build the next<br /><em>useful world.</em></h2></div><div className="se-footer-links"><Link href="/about">About</Link><Link href="/ventures">Ventures</Link><Link href="/services">Services</Link><Link href="/roadmap">Roadmap</Link><Link href="/contact">Contact</Link></div><div className="se-footer-social"><a href="https://github.com/syedsenterprises" target="_blank" rel="noreferrer"><Github /> GitHub</a><a href="https://www.youtube.com/@nanoghostgamer" target="_blank" rel="noreferrer"><Youtube /> YouTube</a></div><small>Live destinations are labeled. Developing directions are not guarantees.</small></div></footer>;
}

function App() {
  const { path } = useRoute();
  useEffect(() => {
    const names = { '/': "One vision. Many ventures.", '/about': 'About', '/ventures': 'Ventures', '/services': 'Services', '/products': 'Products', '/roadmap': 'Roadmap', '/founder': 'Founder', '/contact': 'Contact', '/blog': 'Journal' };
    document.title = path.startsWith('/blog/') ? 'Article — Syed Enterprises' : `${names[path] || 'Page not found'} — Syed Enterprises`;
  }, [path]);
  let page = <NotFound />;
  if (path === '/') page = <Home />;
  else if (path === '/about') page = <About />;
  else if (path === '/ventures') page = <Ventures />;
  else if (path === '/services') page = <Services />;
  else if (path === '/products') page = <Products />;
  else if (path === '/roadmap') page = <Roadmap />;
  else if (path === '/founder') page = <Founder standalone />;
  else if (path === '/contact') page = <Contact />;
  else if (path === '/blog') page = <Blog />;
  else if (path.startsWith('/blog/')) page = <Article slug={path.replace('/blog/', '')} />;
  return <div className="se-site"><Suspense fallback={null}><SpaceEnvironment /></Suspense><CursorAura /><Header /><main>{page}</main><Footer /><BackToTop /></div>;
}

createRoot(document.getElementById('root')).render(<App />);
