import React, { useEffect, useState } from 'react';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  MenuOutlined,
  ShopOutlined,
  ApartmentOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
  LayoutOutlined,
  BarChartOutlined,
  BellOutlined,
  SearchOutlined,
  DownOutlined,
  PlusOutlined,
  MoreOutlined,
  ThunderboltFilled,
  TeamOutlined,
  LockOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Input, Tag } from 'antd';
import './PublicHomePage.css'
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <ShopOutlined />,
    tone: 'violet',
    title: 'Multi-business management',
    text: 'Keep every business, operation and overview connected in one organized workspace.',
  },
  {
    icon: <ApartmentOutlined />,
    tone: 'teal',
    title: 'Branch-level access',
    text: 'Give each branch the right tools while keeping company-wide visibility in your hands.',
  },
  {
    icon: <SafetyCertificateOutlined />,
    tone: 'blue',
    title: 'Role-based menus',
    text: 'Make every team member’s workspace relevant with permissions that fit their role.',
  },
  {
    icon: <LayoutOutlined />,
    tone: 'amber',
    title: 'Customizable dashboards',
    text: 'Bring the information your team needs into a clear, actionable view.',
  },
  {
    icon: <LockOutlined />,
    tone: 'rose',
    title: 'Secure login',
    text: 'Support a more controlled way to access your business tools and data.',
  },
];

const businessItems = [
  { icon: '✚', name: 'HealthPlus Pharmacy', type: 'Medical store', status: 'Active', color: 'mint' },
  { icon: '⌂', name: 'The Banyan House', type: 'Restaurant', status: 'Active', color: 'peach' },
  { icon: '▦', name: 'FreshCart Market', type: 'Supermarket', status: 'Active', color: 'lavender' },
];

function DashboardPreview() {

  useEffect(() => {
    clearAuthStorage()
  }, []);

  const clearAuthStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("subscription");
    localStorage.removeItem("branches");
    localStorage.removeItem("activeBranch");
  };

  return (
    <div className="dashboard-wrap" aria-label="Illustrative business dashboard preview">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="dashboard-window">
        <aside className="dash-sidebar">
          <div className="dash-brand"><span className="brand-mark small-mark"><AppstoreOutlined /></span></div>
          <div className="dash-side-item selected"><AppstoreOutlined /></div>
          <div className="dash-side-item"><BarChartOutlined /></div>
          <div className="dash-side-item"><TeamOutlined /></div>
          <div className="dash-side-item"><LayoutOutlined /></div>
          <div className="dash-side-bottom"><SafetyCertificateOutlined /></div>
        </aside>
        <div className="dash-main">
          <div className="dash-topbar">
            <div>
              <div className="dash-eyebrow">WORKSPACE / OVERVIEW</div>
              <div className="dash-title">Good morning, Suriya <span className="wave">✦</span></div>
            </div>
            <div className="dash-top-actions">
              <span className="dash-icon"><SearchOutlined /></span>
              <span className="dash-icon notification"><BellOutlined /></span>
              <div className="avatar">SM</div>
            </div>
          </div>
          <div className="dash-welcome">
            <div>
              <div className="welcome-label">YOUR BUSINESS AT A GLANCE</div>
              <div className="welcome-heading">Everything is in sync.</div>
              <div className="welcome-copy">One place to keep your teams moving.</div>
            </div>
            <div className="welcome-art"><span /><span /><span /><span /></div>
          </div>
          <div className="stats-grid">
            <div className="stat-card"><span className="stat-label">Businesses</span><strong>08</strong><span className="stat-foot green"><CheckCircleFilled /> All connected</span></div>
            <div className="stat-card"><span className="stat-label">Branches</span><strong>24</strong><span className="stat-foot">Across your network</span></div>
            <div className="stat-card"><span className="stat-label">Team members</span><strong>156</strong><span className="stat-foot purple">Roles assigned</span></div>
          </div>
          <div className="list-heading"><span>Your businesses</span><span className="view-all">View all <ArrowRightOutlined /></span></div>
          <div className="business-list">
            {businessItems.map((item) => (
              <div className="business-row" key={item.name}>
                <div className={`business-symbol ${item.color}`}>{item.icon}</div>
                <div className="business-info"><strong>{item.name}</strong><span>{item.type}</span></div>
                <Tag bordered={false} color="success">{item.status}</Tag>
                <MoreOutlined className="more-icon" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="float-card float-card-top">
        <span className="float-icon"><ThunderboltFilled /></span>
        <span><strong>One simple workspace</strong><small>Everything connected</small></span>
        <CheckCircleFilled className="float-check" />
      </div>
      <div className="float-card float-card-bottom">
        <div className="mini-avatars"><span>AR</span><span>MK</span><span>+8</span></div>
        <span><strong>Your team, aligned</strong><small>Access made simple</small></span>
      </div>
    </div>
  );
}

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const root = document.querySelector('.site-shell');
    if (!root || !('IntersectionObserver' in window)) return;
    const targets = root.querySelectorAll('.logo-strip, .section-heading, .feature-card, .workflow-copy, .workflow-visual, .cta-panel, .footer-main');
    targets.forEach((el) => el.classList.add('reveal-on-scroll'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const openSignup = (route) => {
    // setSignupOpen(true);
    // setDrawerOpen(false);
    // setSubmitted(false);
    navigate(`/${route}`)
  };

  const submitSignup = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const navLinks = (
    <>
      <a href="#features" onClick={() => setDrawerOpen(false)}>Features</a>
      <a href="#how-it-works" onClick={() => setDrawerOpen(false)}>How it works</a>
      <a href="#about" onClick={() => setDrawerOpen(false)}>About</a>
    </>
  );

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="OneOrbit home">
          <span className="brand-mark"><AppstoreOutlined /></span>
          <span className="brand-name">oneorbit<span>.</span></span>
        </a>
        <nav className="desktop-nav">{navLinks}</nav>
        <div className="header-actions">
          <button className="login-link" onClick={()=>openSignup('login')}>Log in</button>
          <Button type="primary" className="header-cta" onClick={()=>openSignup('signup')}>Get started <ArrowRightOutlined /></Button>
        </div>
        <button className="mobile-menu" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}><MenuOutlined /></button>
      </header>

      <Drawer
        title={<span className="brand-name">oneorbit<span>.</span></span>}
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        closeIcon={<CloseOutlined />}
      >
        <nav className="mobile-nav">{navLinks}<Button type="primary" block onClick={()=>openSignup('signup')}>Get started <ArrowRightOutlined /></Button></nav>
      </Drawer>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> ONE WORKSPACE. MANY POSSIBILITIES.</div>
            <h1>Manage All Your Businesses <span>in One Portal</span></h1>
            <p className="hero-subtitle">Medical stores, hotels, restaurants, supermarkets — all in one place.</p>
            <p className="hero-description">Bring your businesses, branches and people together with one clear, connected management experience.</p>
            <div className="hero-actions">
              <Button type="primary" size="large" className="hero-cta" onClick={()=>openSignup('signup')}>Get Started <ArrowRightOutlined /></Button>
              <a className="text-link" href="#features">Explore features <span className="link-arrow">↓</span></a>
            </div>
            <div className="trust-row">
              <div className="trust-icon"><SafetyCertificateOutlined /></div>
              <div><strong>Built for clarity and control</strong><span>One portal for your whole business network</span></div>
            </div>
          </div>
          <div className="hero-visual"><DashboardPreview /></div>
          <div className="hero-bottom-note"><span className="note-line" /> MADE FOR THE WAY YOU WORK <span className="note-dot">✳</span></div>
        </section>

        <section className="logo-strip" aria-label="Supported business types">
          <div className="section-container logo-strip-inner">
            <span className="strip-label">ONE PORTAL FOR EVERY OPERATION</span>
            <div className="industry-list">
              <span><span className="industry-icon pharmacy">✚</span> Medical stores</span>
              <span><span className="industry-icon hotel">⌂</span> Hotels & dining</span>
              <span><span className="industry-icon market">▦</span> Supermarkets</span>
              <span><span className="industry-icon more">＋</span> And more</span>
            </div>
          </div>
        </section>

        <section className="features-section section-container" id="features">
          <div className="section-heading">
            <div className="eyebrow centered-eyebrow"><span className="eyebrow-dot" /> A BETTER WAY TO MANAGE</div>
            <h2>Less switching.<br /><span>More moving forward.</span></h2>
            <p>All the essentials your growing business needs, thoughtfully brought together.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className={`feature-icon ${feature.tone}`}>{feature.icon}</div>
                <div className="feature-number">0{index + 1}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <span className="feature-accent" />
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="section-container workflow-inner">
            <div className="workflow-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> SIMPLE BY DESIGN</div>
              <h2>Your whole operation.<br /><span>One clear view.</span></h2>
              <p>From head office to every branch, give your people a more consistent way to work — without adding complexity.</p>
              <ul className="benefit-list">
                <li><CheckCircleFilled /> Organize multiple businesses in one portal</li>
                <li><CheckCircleFilled /> Give each team the access they need</li>
                <li><CheckCircleFilled /> Keep workflows clear as you grow</li>
              </ul>
              <Button type="primary" size="large" className="workflow-cta" onClick={()=>openSignup('signup')}>Build your workspace <ArrowRightOutlined /></Button>
            </div>
            <div className="workflow-visual">
              <div className="workflow-glow" />
              <div className="workflow-card main-workflow-card">
                <div className="workflow-card-header"><div><span className="tiny-label">ORGANIZATION</span><h3>Your business network</h3></div><span className="network-badge"><ApartmentOutlined /></span></div>
                <div className="network-root"><span className="node-icon root-icon"><AppstoreOutlined /></span><span><strong>OneOrbit Portal</strong><small>Company workspace</small></span><span className="node-status" /></div>
                <div className="network-branches">
                  <div className="network-branch"><span className="branch-connector" /><span className="node-icon branch-icon teal-node"><ShopOutlined /></span><span><strong>Business A</strong><small>4 branches</small></span></div>
                  <div className="network-branch"><span className="branch-connector" /><span className="node-icon branch-icon blue-node"><ShopOutlined /></span><span><strong>Business B</strong><small>3 branches</small></span></div>
                  <div className="network-branch"><span className="branch-connector" /><span className="node-icon branch-icon amber-node"><ShopOutlined /></span><span><strong>Business C</strong><small>2 branches</small></span></div>
                </div>
                <div className="workflow-card-footer"><span><span className="online-dot" /> Workspace organized</span><span>View structure <ArrowRightOutlined /></span></div>
              </div>
              <div className="permission-chip"><SafetyCertificateOutlined /><span><strong>Access under control</strong><small>Permissions by role</small></span><CheckCircleFilled /></div>
            </div>
          </div>
        </section>

        <section className="cta-section section-container" id="about">
          <div className="cta-panel">
            <div className="cta-decoration deco-one" /><div className="cta-decoration deco-two" />
            <div className="cta-content">
              <div className="eyebrow cta-eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
              <h2>Ready to bring it<br />all together?</h2>
              <p>One portal. Your businesses. A clearer way forward.</p>
              <Button size="large" className="cta-button" onClick={()=>openSignup('signup')}>Get Started <ArrowRightOutlined /></Button>
            </div>
            <div className="cta-mark"><span className="cta-mark-ring ring-a" /><span className="cta-mark-ring ring-b" /><span className="cta-mark-core"><AppstoreOutlined /></span><span className="cta-star star-a">✳</span><span className="cta-star star-b">✦</span></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-container footer-main">
          <a className="brand footer-brand" href="#home"><span className="brand-mark"><AppstoreOutlined /></span><span className="brand-name">oneorbit<span>.</span></span></a>
          <p className="footer-tagline">Empowering businesses with technology.</p>
          <div className="footer-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><button onClick={()=>openSignup('signup')}>Get started</button></div>
        </div>
        <div className="section-container footer-bottom"><span>© 2026 OneOrbit. All rights reserved.</span><span className="footer-made">Designed for the people who build businesses <span>✳</span></span></div>
      </footer>

      <Drawer
        title={null}
        placement="right"
        width={Math.min(440, typeof window !== 'undefined' ? window.innerWidth : 440)}
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        closeIcon={<CloseOutlined />}
        className="signup-drawer"
      >
        {!submitted ? (
          <div className="signup-content">
            <div className="signup-brand"><span className="brand-mark"><AppstoreOutlined /></span><span className="brand-name">oneorbit<span>.</span></span></div>
            <div className="eyebrow"><span className="eyebrow-dot" /> GET STARTED</div>
            <h2>Make room to<br /><span>grow.</span></h2>
            <p>Tell us a little about your business to get started with your OneOrbit workspace.</p>
            <form className="signup-form" onSubmit={submitSignup}>
              <label htmlFor="company-name">Business or company name</label>
              <Input id="company-name" size="large" placeholder="e.g. Acme Enterprises" value={company} onChange={(e) => setCompany(e.target.value)} required />
              <label htmlFor="email-address">Work email</label>
              <Input id="email-address" size="large" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="primary" htmlType="submit" size="large" block className="signup-submit">Create your workspace <ArrowRightOutlined /></Button>
              <div className="signup-privacy"><SafetyCertificateOutlined /> Your information stays private and secure.</div>
            </form>
            <div className="signup-note">Already have an account? <button type="button" onClick={() => { setSubmitted(false); }}>Contact your workspace administrator</button></div>
          </div>
        ) : (
          <div className="signup-success">
            <div className="success-icon"><CheckCircleFilled /></div>
            <div className="eyebrow centered-eyebrow">THANK YOU</div>
            <h2>You’re on your way.</h2>
            <p>This demo form has captured your details locally. Connect it to your signup API to create an account and send a confirmation.</p>
            <div className="submitted-details"><span>Business</span><strong>{company}</strong><span>Work email</span><strong>{email}</strong></div>
            <Button type="primary" size="large" block onClick={() => setSignupOpen(false)}>Back to home</Button>
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default App;
