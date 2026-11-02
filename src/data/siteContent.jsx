import { BrainCircuit, BriefcaseBusiness, Code2, Globe2, Layers3, Orbit, Rocket, Sparkles } from 'lucide-react';

export const ventures = [
  { name: 'Web3User', category: 'Web3 / SDK', status: 'experimental', mark: 'W3', color: 'cyan', description: 'Experimental off-chain policy-checked ERC-20 transfer authorization. Not for real funds.', url: 'https://web3user.tech' },
  { name: 'Estate Path', category: 'Real Estate Tech', status: 'active', mark: 'EP', color: 'gold', description: 'Florida real estate guides, mortgage calculator and exam preparation.', url: 'https://www.estatepath.online' },
  { name: 'Reproaster', category: 'Digital Products', status: 'active', mark: 'RP', color: 'mint', description: 'Digital products and online commerce for focused audiences.', url: 'https://reproaster.store' },
  { name: 'LookForIt', category: 'AI Directory', status: 'active', mark: 'LF', color: 'violet', description: 'A directory for discovering and organizing AI tools.', url: 'https://www.lookforit.xyz' },
  { name: 'Estate Path CRM', category: 'Real Estate CRM', status: 'building', mark: 'CRM', color: 'blue', description: 'A developing direction for leads, listings and follow-ups in one place.', url: 'https://crm.estatepath.online' },
  { name: 'AI agents & automation', category: 'Future direction', status: 'planned', mark: 'AI', color: 'violet', description: 'A future direction for intelligent assistants and workflow systems.', url: 'https://github.com/syedsenterprises' },
  { name: 'Open Source', category: 'Tools / Code', status: 'active', mark: 'OS', color: 'cyan', description: 'Public experiments including Neon Breaker and practical calculators.', url: 'https://github.com/syedsenterprises' }
];

export const ecosystem = [
  { name: 'Web3 & Blockchain', icon: <Orbit />, text: 'Permissions, policies and open-web experiments.', color: 'cyan' },
  { name: 'AI & Automation', icon: <BrainCircuit />, text: 'Discovery, intelligent assistants and workflow systems.', color: 'violet' },
  { name: 'Real Estate Tech', icon: <Globe2 />, text: 'Clearer information, learning tools and future software.', color: 'gold' },
  { name: 'Products & Commerce', icon: <Layers3 />, text: 'Useful guides and digital products built to be used.', color: 'mint' }
];

export const products = [
  { name: 'Estate Path', status: 'active', category: 'Real estate publishing', text: 'Guides, mortgage calculations and exam preparation for Florida real estate.', url: 'https://www.estatepath.online', icon: <Globe2 /> },
  { name: 'Web3User', status: 'experimental', category: 'Web3 technology', text: 'A narrow, experimental SDK for policy-aware transfer authorization.', url: 'https://web3user.tech', icon: <Orbit /> },
  { name: 'Estate Path CRM', status: 'building', category: 'Software direction', text: 'A developing CRM direction for real estate leads and follow-ups.', url: 'https://crm.estatepath.online', icon: <Layers3 /> },
  { name: 'Open Source Lab', status: 'active', category: 'Public experiments', text: 'Small public tools, games and experiments that keep the learning visible.', url: 'https://github.com/syedsenterprises', icon: <Code2 /> }
];

export const services = [
  ['Web & application development', 'Focused web apps that turn a real workflow into a clear product.', <Code2 />],
  ['AI integration & automation', 'Practical intelligent systems, agents and assistants for repeatable work.', <BrainCircuit />],
  ['SEO & digital publishing', 'Research-led content and information architecture that make subjects clearer.', <Sparkles />],
  ['Software & SaaS direction', 'Product thinking from first question to a useful, testable interface.', <BriefcaseBusiness />],
  ['Web3 & blockchain development', 'Careful experiments around permission, policy and the open web.', <Orbit />],
  ['Digital product development', 'Guides, workbooks and focused products built for a specific audience.', <Rocket />]
];

export const roadmap = [
  ['01', 'Foundation', 'Establishing the business and its digital infrastructure.', 'current'],
  ['02', 'Development', 'Building products, platforms and individual ventures.', 'current'],
  ['03', 'Integration', 'Connecting ventures, automation and shared systems.', 'direction'],
  ['04', 'Expansion', 'Growing products, services and distribution.', 'direction'],
  ['05', 'Long-term vision', 'Developing a connected entrepreneurial ecosystem.', 'direction']
];
