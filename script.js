const ventures = [
  ["Estate Path", "Real Estate", "Florida real estate guides, mortgage calculator and exam prep.", "https://www.estatepath.online"],
  ["LookForIt", "AI Directory", "A directory of AI tools, organised by category.", "https://www.lookforit.xyz"],
  ["Let Us Assume", "Earning Guides", "Ways to earn money online in India, written for students and beginners.", "https://www.letusassume.in"],
  ["RepRoster", "Gym Software", "Gym management software for independent gyms in India.", "https://reproaster.store"],
  ["Estate Path CRM", "Real Estate CRM", "A CRM for real estate agencies — leads, listings and follow-ups in one place.", "https://crm.estatepath.online"],
  ["Web3User", "Open Web / SDK", "Experimental off-chain policy-checked ERC-20 transfer authorization SDK. Not for real funds.", "https://web3user.tech"],
  ["Nano Ghost Gamer", "Gaming / YouTube", "A gaming YouTube channel — gameplay, shorts and long-form videos.", "https://www.youtube.com/@nanoghostgamer"],
  ["Digital Products", "Gumroad Store", "Florida real estate exam packs, cheat sheets and workbooks.", "https://syedventures.gumroad.com"],
  ["Open Source", "GitHub", "neon-breaker, florida-mortgage-calculator, equation-visualizer, blogger-seo-toolkit.", "https://github.com/syedsenterprises"]
];

const progress = document.querySelector("#scrollProgress");
const sections = [...document.querySelectorAll(".se-section")];
const railLinks = [...document.querySelectorAll(".se-rail a")];
const updateScrollState = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.14 });
document.querySelectorAll(".se-reveal").forEach(element => revealObserver.observe(element));

const chapterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    railLinks.forEach(link => link.classList.remove("is-active"));
    const link = railLinks[Number(entry.target.dataset.chapter)];
    if (link) link.classList.add("is-active");
  });
}, { rootMargin: "-40% 0px -45% 0px" });
sections.forEach(section => chapterObserver.observe(section));

document.querySelector("#turnFounder").addEventListener("click", () => {
  document.querySelector(".se-founder-stage").classList.toggle("is-active");
});
document.querySelector("#activateFounder").addEventListener("click", event => {
  event.currentTarget.classList.toggle("se-button-gold");
  document.querySelector(".se-founder-stage").classList.toggle("is-active");
});

let hqRotation = -25;
document.querySelectorAll("[data-hq]").forEach(button => button.addEventListener("click", () => {
  hqRotation += Number(button.dataset.hq) * 12;
  document.querySelector("#hqStage").style.transform = `rotateX(58deg) rotateZ(${hqRotation}deg)`;
}));
let worldRotation = 0;
document.querySelectorAll("[data-world]").forEach(button => button.addEventListener("click", () => {
  worldRotation += Number(button.dataset.world) * 35;
  document.querySelector("#worldStage").style.transform = `rotateY(${worldRotation}deg)`;
}));

const detail = document.querySelector("#ventureDetail");
document.querySelectorAll(".se-world-orb").forEach(orb => orb.addEventListener("click", () => {
  const venture = ventures[Number(orb.dataset.venture)];
  detail.innerHTML = `<span>${venture[1]}</span><h3>${venture[0]}</h3><p>${venture[2]} <a href="${venture[3]}" target="_blank" rel="noreferrer">Enter this world ↗</a></p>`;
}));

const canvas = document.querySelector("#particleCanvas");
const context = canvas.getContext("2d");
const particles = Array.from({ length: 45 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + .3, a: Math.random() * .5 + .1 }));
const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
const paintParticles = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    context.fillStyle = `rgba(212,175,55,${particle.a})`;
    context.beginPath();
    context.arc(particle.x * canvas.width, particle.y * canvas.height, particle.r, 0, Math.PI * 2);
    context.fill();
  });
};
resizeCanvas();
paintParticles();
window.addEventListener("resize", () => { resizeCanvas(); paintParticles(); });
