import React, { lazy, Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Menu, X, Globe2, Layers3, Rocket, Code2, Cpu, Search, Home, Target, Sparkles, ChevronDown } from 'lucide-react';
import { getSafeExternalLinkProps } from './utils/security.js';
import './styles.css';

const GlobeScene = lazy(() => import('./components/GlobeScene.jsx'));

const ventures = [
  {name:'Web3User',tag:'Web3 · Blockchain · AI',desc:'Exploring tools and experiences across the emerging Web3 ecosystem.',url:'https://web3user.tech',tone:'blue',icon:'⬡'},
  {name:'EstatePath',tag:'Real Estate · Technology',desc:'Digital tools and workflows for the real-estate space.',url:'https://estatepath.online',tone:'green',icon:'⌂'},
  {name:'Reproaster',tag:'Digital Products · Tools',desc:'A digital product venture focused on useful online experiences.',url:'https://reproaster.store',tone:'purple',icon:'R'},
  {name:'LookForIt',tag:'AI Tools · Discovery',desc:'A discovery experience for exploring AI tools and resources.',url:'https://lookforit.xyz',tone:'cyan',icon:'⌕'}
];
const services = [
  ['Web development','Websites and digital experiences designed around real business needs',Code2],
  ['AI assistants & automation','Practical assistants and workflows that reduce repetitive work',Cpu],
  ['SEO & digital growth','Technical SEO, content strategy and organic discovery',Target],
  ['Product building','From early concept and validation to functional digital products',Layers3]
];
const externalLinkProps = (url) => getSafeExternalLinkProps(url) ?? {};
function App(){
 const [active,setActive]=useState(1),[menu,setMenu]=useState(false),[expanded,setExpanded]=useState(false);
 const shift=(n)=>setActive((active+n+ventures.length)%ventures.length);
 const current=ventures[active];
 return <div className="site">
  <header className="nav">
   <a className="brand" href="#home"><span className="brand-mark">S</span><span>Syed's<br/>Enterprises</span></a>
   <nav className={menu?'nav-links open':'nav-links'}>{[['Home','#home'],['About','#about'],['Ventures','#ventures'],['Services','#services'],['Products','#products'],['Founder','#founder']].map(([t,h])=><a key={t} href={h} onClick={()=>setMenu(false)}>{t}</a>)}</nav>
   <div className="nav-actions"><a className="contact-pill" href="#contact">Contact <ArrowUpRight size={15}/></a><button className="icon-btn mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></div>
  </header>
  <main>
   <section className="hero" id="home">
    <div className="hero-copy">
     <div className="eyebrow"><span className="pulse"/> A GLOBAL TECHNOLOGY VENTURE</div>
     <h1>Building what's<br/><em>next.</em></h1>
     <p>Technology, products and digital services for a more connected world.</p>
     <div className="hero-ctas"><a className="btn primary" href="#ventures">Explore our ventures <ArrowUpRight size={16}/></a><a className="btn ghost" href="#about">Discover our vision <ArrowRight size={16}/></a></div>
     <div className="hero-facts"><div><Rocket/><b>4</b><small>Ventures</small></div><div><Layers3/><b>Digital</b><small>Products & services</small></div><div><Globe2/><b>Global</b><small>Market ambition</small></div></div>
    </div>
    <div className="hero-visual"><div className="orb-glow"/><div className="globe-wrap"><Suspense fallback={<div role="status" aria-label="Loading interactive globe"/>}><GlobeScene/></Suspense></div><div className="orbit-label label-one">WEB3USER <small>Web3 · AI</small></div><div className="orbit-label label-two">ESTATEPATH <small>Real estate tech</small></div><div className="orbit-label label-three">REPROASTER <small>Digital products</small></div><div className="orbit-label label-four">LOOKFORIT <small>AI discovery</small></div><div className="platform"/></div>
    <div className="scroll-cue"><span/> Scroll to explore</div>
   </section>
   <section className="ecosystem" id="about">
    <div className="eco-copy"><div className="eyebrow dark">THE BIGGER PICTURE</div><h2>One vision.<br/><span>Many possibilities.</span></h2><p>Syed's Enterprises is a technology-focused parent business bringing together independent ventures, digital products and practical services under one direction.</p><a className="btn dark-btn" href="#ventures">Explore the ecosystem <ArrowUpRight size={16}/></a></div>
    <div className="eco-map"><div className="eco-core"><span className="core-s">S</span><small>SYED'S<br/>ENTERPRISES</small></div>
     {ventures.map((v,i)=><a key={v.name} {...externalLinkProps(v.url)} className={'eco-node node-'+i}><span>{v.icon}</span><b>{v.name}</b><small>{v.tag}</small></a>)}
     <div className="eco-ring ring-a"/><div className="eco-ring ring-b"/>
    </div>
   </section>
   <section className="ventures section-pad" id="ventures">
    <div className="section-head"><div><div className="eyebrow">THE VENTURE PORTFOLIO</div><h2>Explore our <span>ventures.</span></h2><p>Independent ideas, connected by a shared ambition.</p></div><div className="carousel-controls"><button onClick={()=>shift(-1)} aria-label="Previous venture"><ArrowLeft/></button><button onClick={()=>shift(1)} aria-label="Next venture"><ArrowRight/></button></div></div>
    <div className="carousel-stage" onTouchStart={e=>window.__touchX=e.touches[0].clientX} onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-window.__touchX;if(Math.abs(dx)>35)shift(dx<0?1:-1)}}>
     <div className="carousel-track">{ventures.map((v,i)=>{let offset=i-active; if(offset>2)offset-=4;if(offset< -2)offset+=4;return <motion.a key={v.name} {...externalLinkProps(v.url)} className={'venture-card '+v.tone} animate={{x:`calc(${offset*100}% + ${offset*22}px)`,scale:offset===0?1:Math.max(.72,1-Math.abs(offset)*.12),rotateY:offset*-12,opacity:Math.abs(offset)>2?.1:Math.max(.35,1-Math.abs(offset)*.22),zIndex:10-Math.abs(offset)}} transition={{type:'spring',stiffness:150,damping:22}} onMouseEnter={()=>setActive(i)}><div className="card-top"><span className="venture-symbol">{v.icon}</span><span className="card-index">0{i+1}</span></div><div><h3>{v.name}</h3><small>{v.tag}</small><p>{v.desc}</p></div><span className="card-link">Visit venture <ArrowUpRight size={15}/></span></motion.a>})}</div>
    </div><div className="carousel-caption"><span>0{active+1} / 04</span><b>{current.name}</b><small>{current.tag}</small><a {...externalLinkProps(current.url)}>Open venture <ArrowUpRight size={14}/></a></div>
   </section>
   <section className="services section-pad" id="services">
    <div className="section-head"><div><div className="eyebrow">WHAT WE DO</div><h2>Ideas into <span>execution.</span></h2><p>Digital capabilities designed to help businesses build, improve and grow.</p></div></div>
    <div className="service-grid">{services.map(([name,desc,Icon],i)=><motion.article whileHover={{y:-8}} className="service-card" key={name}><div className="service-icon"><Icon/></div><span className="service-no">0{i+1}</span><h3>{name}</h3><p>{desc}</p><a href="#contact">Discuss a project <ArrowUpRight size={14}/></a></motion.article>)}</div>
   </section>
   <section className="product-band" id="products"><div className="product-art"><div className="stack stack-1"/><div className="stack stack-2"/><div className="stack stack-3"/><div className="stack-core">S</div></div><div className="product-copy"><div className="eyebrow">BEYOND THE PRESENT</div><h2>Building useful<br/><span>digital experiences.</span></h2><p>From software and online tools to publishing and future technology experiments, the portfolio is designed to evolve with real-world needs.</p><a className="btn primary" href="#contact">Work with us <ArrowUpRight size={16}/></a></div></section>
   <section className="roadmap section-pad"><div className="section-head"><div><div className="eyebrow">THE JOURNEY AHEAD</div><h2>Built to <span>evolve.</span></h2><p>A directional roadmap, not a promise of fixed launch dates.</p></div></div><div className="road-line"><div className="road-item"><i/><b>Foundation</b><small>Establish the parent brand and venture portfolio</small></div><div className="road-item"><i/><b>Product growth</b><small>Improve existing products and service delivery</small></div><div className="road-item"><i/><b>New ventures</b><small>Validate new software and digital opportunities</small></div><div className="road-item"><i/><b>Global reach</b><small>Expand through sustainable customer relationships</small></div></div></section>
   <section className="founder" id="founder"><div className="founder-image"><img src="/founder-hologram.png" alt="Stylized holographic founder portrait illustration"/></div><div className="founder-copy"><div className="eyebrow">THE PERSON BEHIND THE VISION</div><h2>Meet the founder</h2><h3>Syed Shahid</h3><span className="role-chip">Founder · Syed's Enterprises</span><p>Building digital products, technology projects and practical online services with a focus on experimentation, execution and long-term value.</p><a className="btn primary" href="#contact">Connect with the founder <ArrowUpRight size={16}/></a></div><div className="mission"><Target/><div className="eyebrow">OUR MISSION</div><h3>Build practical technology that creates real value.</h3><p>Connect ideas, products and people through useful digital experiences.</p></div></section>
   <section className="contact section-pad" id="contact"><div><div className="eyebrow">HAVE AN IDEA?</div><h2>Let's build something<br/><span>meaningful.</span></h2><p>For service enquiries, partnerships and product conversations, get in touch.</p></div><a className="btn primary" href="mailto:hello@syedsenterprises.org?subject=Enquiry%20for%20Syed's%20Enterprises">Email Syed's Enterprises <ArrowUpRight size={16}/></a></section>
  </main>
  <footer><a className="brand" href="#home"><span className="brand-mark">S</span><span>Syed's<br/>Enterprises</span></a><span>© {new Date().getFullYear()} Syed's Enterprises. All rights reserved.</span><a href="#home">Back to top ↑</a></footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
