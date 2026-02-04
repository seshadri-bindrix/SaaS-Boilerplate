'use client';

import '@/styles/landing.css';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';

const LandingPageContent = () => {
  const t = useTranslations('Navbar');

  useEffect(() => {
    // --- FROM script.js ---

    function setupTabs(containerId: string) {
      const container = document.getElementById(containerId);
      if (!container) {
        return;
      }

      const buttons = container.querySelectorAll('.tab-btn');
      const panes = container.querySelectorAll('.tab-pane');

      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-tab');

          // Remove active class from all buttons and panes
          buttons.forEach(b => b.classList.remove('active'));
          panes.forEach(p => p.classList.remove('active'));

          // Add active class to clicked button and target pane
          btn.classList.add('active');
          if (targetId) {
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
              targetPane.classList.add('active');
            }
          }
        });
      });
    }

    // Initialize tabs
    setupTabs('ai-tabs');
    setupTabs('suite-tabs');
    setupTabs('solution-tabs');

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section, header');
    sections.forEach((sec) => {
      sec.classList.add('fade-section');
      observer.observe(sec);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach((q) => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        if (!item) {
          return;
        }
        const isActive = item.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
            });
          }
        }
      });
    });

    // Form Submission Logic
    const forms = document.querySelectorAll('.waitlist-form') as NodeListOf<HTMLFormElement>;
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

        // Loading State
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Submit to hidden_iframe
        form.submit();

        const showSuccess = () => {
          form.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #10b981; font-weight: 600;">
              <i class="fa-solid fa-circle-check" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
              You're on the list!
            </div>
          `;
        };

        const iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
        let successTriggered = false;

        const onLoad = () => {
          if (successTriggered) {
            return;
          }
          successTriggered = true;
          showSuccess();
          iframe.removeEventListener('load', onLoad);
        };
        iframe.addEventListener('load', onLoad);

        // Fallback Success
        setTimeout(() => {
          if (!successTriggered) {
            successTriggered = true;
            showSuccess();
            iframe?.removeEventListener('load', onLoad);
          }
        }, 1500);
      });
    });

    return () => {
      // Cleanup observers if necessary
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container container">
          <Link href="/" className="logo">
            Bindrix
            <span className="dot">.</span>
          </Link>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#integrations">Integrations</a>
            <a href="#results">Results</a>
            <a href="#use-cases">Solutions</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-auth">
            <LocaleSwitcher />
            <Link href="/sign-in" className="nav-link-auth">{t('sign_in')}</Link>
            <Link href="/sign-up" className="cta-button small auth-btn">{t('sign_up')}</Link>
          </div>
        </div>
      </nav>

      <div
        dangerouslySetInnerHTML={{
          __html: `
    <!-- Section 1: Hero -->
    <header class="hero-section" id="waitlist-hero">
        <div class="container hero-content">
            <div class="hero-text">
                <h1>One Smart Inbox for All Your Social Conversations — <span class="gradient-text">Powered by AI</span>
                </h1>
                <p class="hero-subtext">Bindrix unifies messages, comments, and DMs across channels, plus scheduling and analytics — then automates replies with intelligent, inventory‑aware AI so growing brands never miss a customer.</p>
                <form class="waitlist-form"
                    action="https://script.google.com/macros/s/AKfycbwkcSpS7g37C75TMLSM5nIRiS-2JgPNKlfAwxjHO-h7hbugzRi1IglOfYttPajU2huUSQ/exec"
                    method="POST" target="hidden_iframe">
                    <input type="email" name="email" placeholder="Enter your work email" required />
                    <button type="submit" class="cta-button">Join the Waitlist</button>
                </form>
                <div class="early-access-offer">
                    <div class="offer-badge">
                        <span class="offer-icon">✨</span>
                        <span class="offer-text">Early Access Perk</span>
                    </div>
                    <p class="offer-details">
                        Join the waitlist today and get <span class="offer-highlight">1 Month Free + Lifetime 'Early
                            Bird' Discount</span> when we
                        launch
                    </p>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="/landing/assets/images/dashboard-mockup.png" alt="Bindrix Unified Dashboard" class="hero-img" />
                <div class="hero-glow"></div>
            </div>
        </div>
    </header>

    <!-- ULTIMATE COMPARISON -->
    <section class="ultimate-comparison-section backgroundcustom">
        <div class="container">
            <div class="section-header center">
                <span class="badge premium">UPGRADE YOUR WORKFLOW</span>
                <h2>Stop Managing Chaos. Start Scaling Fast</h2>
                <p>The difference between keeping up and dominating the market is how you handle your conversations.
                    Bindrix
                    unifies your workflow into one intelligent engine built for growth.
                </p>
            </div>

            <div class="ultimate-v6-comparison">
                <!-- Left Side: Fragmented Reality -->
                <div class="v6-side fragmented">
                    <div class="v6-header">
                        <span class="v6-tag red">The Old Way</span>
                        <h3>Fragmented Chaos</h3>
                        <p>Managing multiple tabs, missing messages, and losing leads in the noise.</p>
                    </div>

                    <div class="v6-visual-box">
                        <div class="refined-chaos">
                            <div class="v6-msg-bubble b1">
                                <span class="v6-badge">12</span>
                                <div class="v6-msg-icon"><i class="fab fa-whatsapp"></i></div>
                                <div class="v6-msg-lines">
                                    <div class="v6-line"></div>
                                    <div class="v6-line short"></div>
                                </div>
                            </div>
                            <div class="v6-msg-bubble b2">
                                <span class="v6-badge">7</span>
                                <div class="v6-msg-icon"><i class="fab fa-instagram"></i></div>
                                <div class="v6-msg-lines">
                                    <div class="v6-line"></div>
                                    <div class="v6-line short"></div>
                                </div>
                            </div>
                            <div class="v6-msg-bubble b3">
                                <span class="v6-badge">18</span>
                                <div class="v6-msg-icon"><i class="fab fa-facebook-messenger"></i></div>
                                <div class="v6-msg-lines">
                                    <div class="v6-line"></div>
                                    <div class="v6-line short"></div>
                                </div>
                            </div>
                            <div class="v6-msg-bubble b4">
                                <span class="v6-badge">5</span>
                                <div class="v6-msg-icon"><i class="fab fa-x-twitter"></i></div>
                                <div class="v6-msg-lines">
                                    <div class="v6-line"></div>
                                    <div class="v6-line short"></div>
                                </div>
                            </div>
                            <div class="v6-msg-bubble b5">
                                <span class="v6-badge">3</span>
                                <div class="v6-msg-icon"><i class="fab fa-telegram"></i></div>
                                <div class="v6-msg-lines">
                                    <div class="v6-line"></div>
                                    <div class="v6-line short"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="v6-metrics-grid">
                        <div class="v6-metric-item"><span class="v6-val">37</span><span class="v6-lab">Missed DMs</span>
                        </div>
                        <div class="v6-metric-item"><span class="v6-val">8</span><span class="v6-lab">Open Tabs</span>
                        </div>
                        <div class="v6-metric-item"><span class="v6-val">40%</span><span class="v6-lab">Focus
                                Lost</span></div>
                    </div>
                </div>

                <!-- Right Side: Unified Reality -->
                <div class="v6-side unified">
                    <div class="v6-header">
                        <span class="v6-tag green">The Bindrix Way</span>
                        <h3>Unified Clarity</h3>
                        <p>One powerful inbox. AI-driven automation. Total control over your growth.</p>
                    </div>

                    <div class="v6-visual-box">
                        <div class="v6-mock-inbox">
                            <div class="v6-mock-header">
                                <div class="v6-mock-logo-wrap">
                                    <span class="v6-brand-name">Bindrix</span>
                                </div>
                                <div class="v6-mock-search"></div>
                            </div>
                            <div class="v6-mock-row">
                                <div class="v6-avatar-wrap">
                                    <div class="v6-mock-avatar"><img
                                            src="https://ui-avatars.com/api/?name=Sophie+C&background=random" alt=""
                                            style="width:100%; height:100%;" /></div>
                                    <div class="v6-source-badge insta"><i class="fab fa-instagram"></i></div>
                                </div>
                                <div class="v6-mock-info">
                                    <div class="v6-mock-name">Sophie Chen</div>
                                    <div class="v6-mock-msg">Can I get a bundle discount? Looking to buy for my whole
                                        team!</div>
                                </div>
                                <span class="v6-mock-tag ai">AI Answered</span>
                            </div>
                            <div class="v6-mock-row">
                                <div class="v6-avatar-wrap">
                                    <div class="v6-mock-avatar"><img
                                            src="https://ui-avatars.com/api/?name=Marcus+L&background=random" alt=""
                                            style="width:100%; height:100%;" /></div>
                                    <div class="v6-source-badge wa"><i class="fab fa-whatsapp"></i></div>
                                </div>
                                <div class="v6-mock-info">
                                    <div class="v6-mock-name">Marcus Lee</div>
                                    <div class="v6-mock-msg">Is the blue hoodie in stock? I need size XL.</div>
                                </div>
                                <span class="v6-mock-tag hot">Hot Lead</span>
                            </div>
                            <div class="v6-mock-row">
                                <div class="v6-avatar-wrap">
                                    <div class="v6-mock-avatar"><img
                                            src="https://ui-avatars.com/api/?name=Elena+G&background=random" alt=""
                                            style="width:100%; height:100%;" /></div>
                                    <div class="v6-source-badge x"><i class="fab fa-x-twitter"></i></div>
                                </div>
                                <div class="v6-mock-info">
                                    <div class="v6-mock-name">Elena Gomez</div>
                                    <div class="v6-mock-msg">Need help with my order... the tracking link isn't working.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="v6-metrics-grid">
                        <div class="v6-metric-item"><span class="v6-val">Zero</span><span class="v6-lab">Lead
                                Leakage</span></div>
                        <div class="v6-metric-item"><span class="v6-val">1</span><span class="v6-lab">Dashboard</span>
                        </div>
                        <div class="v6-metric-item"><span class="v6-val">Up to 15x</span><span
                                class="v6-lab">Engagement</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 3: AI-Powered Engagement (Tabbed) -->
    <section class="features-section ai-features" id="features">
        <div class="container">
            <div class="section-header">
                <span class="badge">AI Capabilities</span>
                <h2>Intelligent Engagement</h2>
            </div>

            <div class="tabs-container" id="ai-tabs">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="smart-replies">
                        <i class="fa-solid fa-robot"></i> Smart Auto Replies
                    </button>
                    <button class="tab-btn" data-tab="inventory-ai">
                        <i class="fa-solid fa-box"></i> Inventory-Aware AI
                    </button>
                    <button class="tab-btn" data-tab="ai-labeling">
                        <i class="fa-solid fa-tags"></i> AI Labeling
                    </button>
                    <button class="tab-btn" data-tab="rule-automation">
                        <i class="fa-solid fa-gears"></i> Rule-Based Automation
                    </button>
                </div>

                <div class="tabs-content">
                    <!-- Tab 1 -->
                    <div class="tab-pane active" id="smart-replies">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Human-like AI that responds instantly</h3>
                                <p>Bindrix’s AI agent understands customer intent and responds naturally — providing
                                    fast, accurate support and engagement.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Instant replies</li>
                                    <li><i class="fa-solid fa-check"></i> Natural conversations</li>
                                    <li><i class="fa-solid fa-check"></i> 24/7 availability</li>
                                </ul>
                            </div>
                            <div class="pane-visual card-visual">
                                <div class="chat-bubble user">Where is my order?</div>
                                <div class="chat-bubble ai">Hi! I checked your order #402. It's out for delivery today!
                                    🚚</div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 2 -->
                    <div class="tab-pane" id="inventory-ai">
                        <div class="pane-content inventory-pane">
                            <div class="pane-text">
                                <h3>AI that knows your products and stock</h3>
                                <p>Connected to Shopify and WooCommerce, Bindrix AI can answer product availability,
                                    order-related questions, and more.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Real-time inventory responses</li>
                                    <li><i class="fa-solid fa-check"></i> Faster conversions</li>
                                    <li><i class="fa-solid fa-check"></i> Less manual work</li>
                                </ul>
                            </div>
                            <div class="pane-visual inventory-showcase">
                                <!-- Panel 1: Conversation -->
                                <div class="inv-conversation">
                                    <div class="inv-conv-header">
                                        <div class="inv-user-info">
                                            <div class="inv-avatar-wrapper">
                                                <img src="https://ui-avatars.com/api/?name=James+K&background=f59e0b&color=fff"
                                                    alt="User" class="inv-avatar" />
                                                <div class="inv-platform-badge"><i class="fab fa-whatsapp"></i></div>
                                            </div>
                                            <div class="inv-user-details">
                                                <span class="inv-user-name">James Kim</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inv-messages">
                                        <div class="inv-msg customer">
                                            <span>Hi! I need 10 units of the Premium Wireless Headphones for my office.
                                                Can you help?</span>
                                        </div>
                                        <div class="inv-ai-thinking">
                                            <div class="inv-think-icon"><i class="fa-solid fa-microchip"></i></div>
                                            <div class="inv-think-content">
                                                <span class="inv-think-label">Checking inventory...</span>
                                                <div class="inv-think-bar">
                                                    <div class="inv-think-progress"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="inv-msg ai">
                                            <div class="inv-ai-badge"><i class="fa-solid fa-robot"></i> AI</div>
                                            <span>Hi James! 👋 We have <strong>3 units</strong> in stock. I can reserve
                                                those now + pre-order 7 more arriving Friday!</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- Owner Notification Panel -->
                                <div class="inv-notify-panel">
                                    <div class="inv-notify-header">
                                        <i class="fa-solid fa-bell"></i>
                                        <span>Owner Alert</span>
                                        <span class="inv-notify-badge">New</span>
                                    </div>
                                    <div class="inv-notify-content">
                                        <div class="inv-notify-icon">
                                            <i class="fa-solid fa-chart-line"></i>
                                        </div>
                                        <div class="inv-notify-text">
                                            <span class="inv-notify-title">Bulk Order Opportunity</span>
                                            <span class="inv-notify-desc">James Kim wants 10 units of Premium Wireless
                                                Headphones. Only 3 in stock.</span>
                                        </div>
                                    </div>
                                    <div class="inv-notify-actions">
                                        <button class="inv-action-btn primary"><i class="fa-solid fa-check"></i> Approve
                                            Pre-order</button>
                                        <button class="inv-action-btn secondary"><i class="fa-solid fa-message"></i>
                                            Reply</button>
                                    </div>
                                    <div class="inv-notify-footer">
                                        <span class="inv-notify-time"><i class="fa-solid fa-clock"></i> Just now</span>
                                        <span class="inv-notify-tag high"><i class="fa-solid fa-fire"></i> High
                                            Priority</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 3 -->
                    <div class="tab-pane" id="ai-labeling">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Automatically prioritize every conversation</h3>
                                <p>Bindrix analyzes messages and comments to intelligently categorize them, so you can
                                    focus on what matters most.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Smart prioritization</li>
                                    <li><i class="fa-solid fa-check"></i> Intent detection</li>
                                    <li><i class="fa-solid fa-check"></i> Custom labels</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="dashboard-demo">
                                    <div class="dashboard-mini-header">
                                        <div class="dash-title-group">
                                            <i class="fa-solid fa-robot"></i>
                                            <span>AI Classification</span>
                                        </div>
                                        <div class="dash-filters" id="label-filters">
                                            <button class="filter-chip active" data-filter="all">All</button>
                                            <button class="filter-chip" data-filter="urgent">Urgent</button>
                                            <button class="filter-chip" data-filter="lead">Lead</button>
                                            <button class="filter-chip" data-filter="support">Support</button>
                                        </div>
                                    </div>
                                    <div class="message-feed" id="message-feed">
                                        <!-- Message 1 -->
                                        <div class="msg-card" data-label="urgent">
                                            <div class="msg-card-top">
                                                <div class="msg-user">
                                                    <div class="msg-avatar-container">
                                                        <img src="https://ui-avatars.com/api/?name=Alex+M&background=ef4444&color=fff"
                                                            alt="User" />
                                                        <span class="platform-mini ig"><i
                                                                class="fab fa-instagram"></i></span>
                                                    </div>
                                                    <div class="msg-info">
                                                        <span class="msg-sender">Alex Meyer</span>
                                                        <span class="msg-time">2m ago</span>
                                                    </div>
                                                </div>
                                                <span class="ai-label-tag urgent">Urgent</span>
                                            </div>
                                            <p class="msg-preview">"My order #1234 hasn't arrived and I need it today
                                                for a gift! Please help."</p>
                                        </div>

                                        <!-- Message 2 -->
                                        <div class="msg-card" data-label="lead">
                                            <div class="msg-card-top">
                                                <div class="msg-user">
                                                    <div class="msg-avatar-container">
                                                        <img src="https://ui-avatars.com/api/?name=Sarah+J&background=10b981&color=fff"
                                                            alt="User" />
                                                        <span class="platform-mini fb"><i
                                                                class="fab fa-facebook-messenger"></i></span>
                                                    </div>
                                                    <div class="msg-info">
                                                        <span class="msg-sender">Sarah Jenkins</span>
                                                        <span class="msg-time">15m ago</span>
                                                    </div>
                                                </div>
                                                <span class="ai-label-tag lead">Hot Lead</span>
                                            </div>
                                            <p class="msg-preview">"Looking to buy 50+ units for a corporate event. Do
                                                you offer bulk discounts?"</p>
                                        </div>

                                        <!-- Message 3 -->
                                        <div class="msg-card" data-label="support">
                                            <div class="msg-card-top">
                                                <div class="msg-user">
                                                    <div class="msg-avatar-container">
                                                        <img src="https://ui-avatars.com/api/?name=Tom+W&background=3b82f6&color=fff"
                                                            alt="User" />
                                                        <span class="platform-mini tw"><i
                                                                class="fab fa-x-twitter"></i></span>
                                                    </div>
                                                    <div class="msg-info">
                                                        <span class="msg-sender">Tom Wilson</span>
                                                        <span class="msg-time">1h ago</span>
                                                    </div>
                                                </div>
                                                <span class="ai-label-tag support">Question</span>
                                            </div>
                                            <p class="msg-preview">"How do I reset my password? The link in the email
                                                seems to be expired."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 4 -->
                    <div class="tab-pane" id="rule-automation">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Automate actions based on behavior</h3>
                                <p>Set intelligent rules for comments and messages.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Auto reply on keywords</li>
                                    <li><i class="fa-solid fa-check"></i> Assign to teams</li>
                                    <li><i class="fa-solid fa-check"></i> Trigger workflows</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="rule-builder-visual">
                                    <div class="rule-node trigger-node">
                                        <div class="node-icon trigger"><i class="fa-solid fa-bolt"></i></div>
                                        <div class="node-content">
                                            <span class="node-label">IF MESSAGE CONTAINS</span>
                                            <span class="node-value">"how much" OR "price"</span>
                                        </div>
                                    </div>
                                    <div class="rule-connector">
                                        <div class="connector-line"></div>
                                        <div class="connector-dot"></div>
                                    </div>
                                    <div class="rule-node action-node">
                                        <div class="node-icon action"><i class="fa-solid fa-reply-all"></i></div>
                                        <div class="node-content">
                                            <span class="node-label">THEN AUTO-REPLY</span>
                                            <span class="node-value">Send "Pricing Catalog"</span>
                                        </div>
                                    </div>
                                    <div class="rule-status-badge">
                                        <span class="status-pulse"></span> Active & Running
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: Social Management Suite (Tabbed) -->
    <section class="features-section suite-features backgroundcustom">
        <div class="container">
            <div class="section-header">
                <span class="badge">Complete Suite</span>
                <h2>Powerful Social Management</h2>
            </div>

            <div class="tabs-container" id="suite-tabs">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="unified-inbox">Unified Inbox</button>
                    <button class="tab-btn" data-tab="scheduling">Scheduling</button>
                    <button class="tab-btn" data-tab="team-flow">Team Workflow</button>
                    <button class="tab-btn" data-tab="analytics">Analytics</button>
                    <button class="tab-btn" data-tab="listening">Social Listening</button>
                </div>

                <div class="tabs-content">
                    <!-- Inbox -->
                    <div class="tab-pane active" id="unified-inbox">
                        <div class="pane-content left-align">
                            <div class="pane-text">
                                <h3>All messages and comments in one place</h3>
                                <p>Respond to everything from a single smart dashboard — never miss a conversation.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Messages across platforms</li>
                                    <li><i class="fa-solid fa-check"></i> Unified comment management</li>
                                    <li><i class="fa-solid fa-check"></i> Faster engagement</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="inbox-visual">
                                    <div class="inbox-header">
                                        <span>Unified Inbox</span>
                                        <div class="inbox-search"><i class="fa-solid fa-magnifying-glass"></i></div>
                                    </div>
                                    <div class="inbox-list">
                                        <div class="inbox-item active">
                                            <div class="inbox-avatar insta"><i class="fa-brands fa-instagram"></i><span
                                                    class="status-dot"></span></div>
                                            <div class="inbox-info">
                                                <div class="inbox-user">Sarah Jenkins</div>
                                                <div class="inbox-snippet">Love the new collection!</div>
                                            </div>
                                            <div class="inbox-time">2m</div>
                                        </div>
                                        <div class="inbox-item">
                                            <div class="inbox-avatar twitter"><i class="fa-brands fa-twitter"></i><span
                                                    class="status-dot"></span></div>
                                            <div class="inbox-info">
                                                <div class="inbox-user">Mike Ross</div>
                                                <div class="inbox-snippet">When is the restock?</div>
                                            </div>
                                            <div class="inbox-time">15m</div>
                                        </div>
                                        <div class="inbox-item">
                                            <div class="inbox-avatar facebook"><i
                                                    class="fa-brands fa-facebook"></i><span class="status-dot"></span>
                                            </div>
                                            <div class="inbox-info">
                                                <div class="inbox-user">Jane Doe</div>
                                                <div class="inbox-snippet">Sent a message...</div>
                                            </div>
                                            <div class="inbox-time">1h</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Scheduling -->
                    <div class="tab-pane" id="scheduling">
                        <div class="pane-content left-align">
                            <div class="pane-text">
                                <h3>Plan and schedule content effortlessly</h3>
                                <p>Create, schedule, and publish posts across platforms with ease.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Visual calendar</li>
                                    <li><i class="fa-solid fa-check"></i> Multi-platform posting</li>
                                    <li><i class="fa-solid fa-check"></i> Consistent content flow</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="calendar-visual">
                                    <div class="cal-header">
                                        <span>February 2024</span>
                                        <div class="cal-nav"><i class="fa-solid fa-chevron-left"></i> <i
                                                class="fa-solid fa-chevron-right"></i></div>
                                    </div>
                                    <div class="cal-grid">
                                        <div class="cal-cell">12</div>
                                        <div class="cal-cell active">13 <span class="cal-post insta"></span></div>
                                        <div class="cal-cell">14 <span class="cal-post twitter"></span></div>
                                        <div class="cal-cell">15</div>
                                        <div class="cal-cell">16 <span class="cal-post fb"></span></div>
                                        <div class="cal-cell">17</div>
                                    </div>
                                    <div class="cal-preview">
                                        <div class="preview-img"></div>
                                        <div class="preview-details">
                                            <div class="preview-title">Spring Collection Launch</div>
                                            <div class="preview-status">Scheduled for 10:00 AM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Team -->
                    <div class="tab-pane" id="team-flow">
                        <div class="pane-content left-align">
                            <div class="pane-text">
                                <h3>Collaborate smoothly</h3>
                                <p>Assign tasks, review content, and approve posts before publishing.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Task assignment</li>
                                    <li><i class="fa-solid fa-check"></i> Approval workflows</li>
                                    <li><i class="fa-solid fa-check"></i> Campaign tracking</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="team-visual">
                                    <div class="task-card">
                                        <div class="task-header">
                                            <span class="task-tag">Review</span>
                                            <div class="task-users">
                                                <div class="task-user">JS</div>
                                                <div class="task-user">AK</div>
                                            </div>
                                        </div>
                                        <div class="task-body">Review Instagram Ad Creative</div>
                                        <div class="task-footer">
                                            <button class="approve-btn"><i class="fa-solid fa-check"></i>
                                                Approve</button>
                                            <button class="comment-btn"><i class="fa-solid fa-message"></i>
                                                Comment</button>
                                        </div>
                                    </div>
                                    <div class="approval-flow">
                                        <div class="flow-step completed"><i class="fa-solid fa-circle-check"></i> Draft
                                        </div>
                                        <div class="flow-step current"><i class="fa-solid fa-circle-dot"></i> Approval
                                        </div>
                                        <div class="flow-step"><i class="fa-solid fa-circle"></i> Published</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics -->
                    <div class="tab-pane" id="analytics">
                        <div class="pane-content left-align">
                            <div class="pane-text">
                                <h3>Track performance clearly</h3>
                                <p>View unified and platform-specific analytics in one dashboard.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Engagement metrics</li>
                                    <li><i class="fa-solid fa-check"></i> Growth trends</li>
                                    <li><i class="fa-solid fa-check"></i> Response time insights</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="analytics-visual">
                                    <div class="stat-grid wide">
                                        <div class="stat-card branded purple">
                                            <div class="stat-label">Conversion</div>
                                            <div class="stat-value">3.2%</div>
                                            <div class="stat-trend up"><i class="fa-solid fa-arrow-up"></i> 0.8%</div>
                                        </div>
                                        <div class="stat-card branded blue">
                                            <div class="stat-label">Reach</div>
                                            <div class="stat-value">14.2k</div>
                                            <div class="stat-trend up"><i class="fa-solid fa-arrow-up"></i> 15%</div>
                                        </div>
                                        <div class="stat-card branded teal">
                                            <div class="stat-label">Followers</div>
                                            <div class="stat-value">+842</div>
                                            <div class="stat-trend up"><i class="fa-solid fa-arrow-up"></i> 22%</div>
                                        </div>
                                        <div class="stat-card branded orange">
                                            <div class="stat-label">Engagement</div>
                                            <div class="stat-value">8.4%</div>
                                            <div class="stat-trend up"><i class="fa-solid fa-arrow-up"></i> 4%</div>
                                        </div>
                                    </div>
                                    <div class="growth-chart-v4">
                                        <div class="chart-header">
                                            <span>Revenue Growth</span>
                                            <div class="chart-legend">
                                                <span class="l-item"><span class="l-dot p"></span> Current</span>
                                                <span class="l-item"><span class="l-dot d"></span> Previous</span>
                                            </div>
                                        </div>
                                        <div class="main-chart-area">
                                            <div class="svg-container">
                                                <svg viewBox="0 0 400 100" preserveAspectRatio="none">
                                                    <path d="M0,80 Q50,70 100,40 T200,30 T300,60 T400,20" fill="none"
                                                        stroke="var(--secondary)" stroke-width="3" />
                                                    <path d="M0,80 Q50,70 100,40 T200,30 T300,60 T400,20 V100 H0 Z"
                                                        fill="url(#grad1)" opacity="0.1" />
                                                    <defs>
                                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%"
                                                                style="stop-color:var(--secondary);stop-opacity:1" />
                                                            <stop offset="100%"
                                                                style="stop-color:var(--secondary);stop-opacity:0" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Listening -->
                    <div class="tab-pane" id="listening">
                        <div class="pane-content left-align">
                            <div class="pane-text">
                                <h3>Stay on top of brand conversations</h3>
                                <p>Monitor mentions, keywords, and trends across platforms.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Brand monitoring</li>
                                    <li><i class="fa-solid fa-check"></i> Sentiment tracking</li>
                                    <li><i class="fa-solid fa-check"></i> Real-time alerts</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <div class="listening-visual">
                                    <div class="sentiment-card">
                                        <div class="sentiment-header">Brand Sentiment</div>
                                        <div class="sentiment-bars">
                                            <div class="s-bar positive" style="width: 70%"></div>
                                            <div class="s-bar neutral" style="width: 20%"></div>
                                            <div class="s-bar negative" style="width: 10%"></div>
                                        </div>
                                        <div class="sentiment-labels">
                                            <span>😊 Positive</span>
                                            <span>😐 Neutral</span>
                                            <span>☹️ Negative</span>
                                        </div>
                                    </div>
                                    <div class="alert-feed">
                                        <div class="alert-item">
                                            <div class="alert-icon"><i class="fa-solid fa-hashtag"></i></div>
                                            <div class="alert-content">
                                                <strong>#Bindrix</strong> is trending in NY
                                            </div>
                                        </div>
                                        <div class="alert-item">
                                            <div class="alert-icon"><i class="fa-solid fa-at"></i></div>
                                            <div class="alert-content">
                                                New mention by <strong>@techguru</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 5: Integrations -->
    <section class="integrations-section" id="integrations">
        <div class="container">
            <div class="section-header center">
                <span class="badge">Ecosystem</span>
                <h2>Connect all your platforms seamlessly</h2>
                <p>One hub to manage your entire social presence across major platforms and marketplaces.</p>
            </div>

            <div class="platform-hub">
                <div class="hub-center">
                    <div class="hub-logo">
                        <span class="logo-b">B</span>
                        <div class="hub-pulse"></div>
                    </div>
                </div>

                <div class="hub-platforms">
                    <div class="platform-item instagram" data-name="Instagram">
                        <div class="platform-icon"><i class="fa-brands fa-instagram"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item facebook" data-name="Facebook">
                        <div class="platform-icon"><i class="fa-brands fa-facebook"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item whatsapp" data-name="WhatsApp">
                        <div class="platform-icon"><i class="fa-brands fa-whatsapp"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item twitter" data-name="X (Twitter)">
                        <div class="platform-icon"><i class="fa-brands fa-x-twitter"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item linkedin" data-name="LinkedIn">
                        <div class="platform-icon"><i class="fa-brands fa-linkedin"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item shopify" data-name="Shopify">
                        <div class="platform-icon"><i class="fa-brands fa-shopify"></i></div>
                        <div class="platform-orbit"></div>
                    </div>
                    <div class="platform-item woocommerce" data-name="WooCommerce">
                        <div class="platform-icon"><img src="/landing/assets/images/woocommerce.png" alt="WooCommerce"
                                class="platform-img" /></div>
                        <div class="platform-orbit"></div>
                    </div>
                </div>
            </div>
            <p class="coming-soon">More integrations coming soon.</p>
        </div>
    </section>

    <!-- Section 6: Why Bindrix? (Results) -->
    <section class="results-section" id="results">
        <div class="container text-center">
            <div class="section-header">
                <span class="badge">Performance</span>
                <h2>Results you can count on</h2>
                <p>Metrics that prove Bindrix is the smartest investment for your brand.</p>
            </div>

            <div class="benefits-grid uniform-grid">
                <!-- Card 1: Response Time (Speed) -->
                <div class="benefit-card time-card">
                    <div class="card-header-row">
                        <div class="icon-box"><i class="fa-solid fa-bolt"></i></div>
                        <div class="stat-highlight">Up to 10x Faster</div>
                    </div>
                    <h3>Don't keep them waiting</h3>
                    <p>Stop losing customers to slow replies. Bindrix AI drafts instant responses, cutting your response
                        time from hours to minutes.</p>
                    <div class="impact-visual">
                        <div class="impact-badge old">Avg Reply: 4h 30m</div>
                        <div class="impact-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="impact-badge new">Avg Reply: 2m</div>
                    </div>
                </div>

                <!-- Card 2: Revenue (Sales) -->
                <div class="benefit-card leads-card">
                    <div class="card-header-row">
                        <div class="icon-box"><i class="fa-solid fa-bag-shopping"></i></div>
                        <div class="stat-highlight">Accelerated Sales</div>
                    </div>
                    <h3>Turn comments into cash</h3>
                    <p>Missed comments mean missed sales. Bindrix auto-detects purchase intent and sends customers a
                        direct checkout link.</p>
                    <div class="impact-visual ui-notification">
                        <div class="notif-icon"><i class="fa-brands fa-shopify"></i></div>
                        <div class="notif-text">
                            <span class="title">New Order • $125.00</span>
                            <span class="sub">via Instagram Comment</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3: Team (Inbox Zero) -->
                <div class="benefit-card engagement-card">
                    <div class="card-header-row">
                        <div class="icon-box"><i class="fa-solid fa-inbox"></i></div>
                        <div class="stat-highlight">Inbox Zero</div>
                    </div>
                    <h3>Stop drowning in DMs</h3>
                    <p>A unified inbox for every channel. Filter out the noise, auto-assign tasks, and clear your queue
                        in record time.</p>
                    <div class="impact-visual ui-success">
                        <div class="success-icon"><i class="fa-solid fa-check"></i></div>
                        <span>All caught up!</span>
                    </div>
                </div>

                <!-- Card 4: Growth (Followers) -->
                <div class="benefit-card growth-card">
                    <div class="card-header-row">
                        <div class="icon-box"><i class="fa-solid fa-chart-line"></i></div>
                        <div class="stat-highlight">Up to 2x Growth</div>
                    </div>
                    <h3>Ride the algorithm</h3>
                    <p>Consistency is key. Schedule posts across all platforms in one click and watch your follower
                        count climb.</p>
                    <div class="impact-visual ui-trend">
                        <div class="trend-number">12.5k</div>
                        <div class="trend-pill"><i class="fa-solid fa-arrow-trend-up"></i> +850 this week</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 7: Who is Bindrix for? (Use Cases) -->
    <section class="use-cases-section" id="use-cases">
        <div class="container">
            <div class="section-header center">
                <span class="badge">Solutions</span>
                <h2>Built for every way you work</h2>
                <p>Tailored workflows for teams and individuals managing a multi-channel presence.</p>
            </div>

            <!-- New Tabbed Solutions Layout -->
            <div id="solution-tabs" class="tabs-container">
                <div class="tabs-nav">
                    <button class="tab-btn active" data-tab="sol-ecommerce">E-commerce</button>
                    <button class="tab-btn" data-tab="sol-marketing">Marketing Teams</button>
                    <button class="tab-btn" data-tab="sol-creators">Creators</button>
                    <button class="tab-btn" data-tab="sol-agencies">Agencies</button>
                </div>

                <div class="tabs-content">
                    <!-- Tab 1: E-commerce -->
                    <div class="tab-pane active" id="sol-ecommerce">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>E-commerce Brands</h3>
                                <p>Seamlessly sync with Shopify & WooCommerce. Track every conversion from social
                                    comments directly to sales.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Auto-reply to product questions</li>
                                    <li><i class="fa-solid fa-check"></i> Sync inventory status in chats</li>
                                    <li><i class="fa-solid fa-check"></i> Track revenue from social</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <img src="/landing/assets/images/ecommerce.png" alt="E-commerce Dashboard" />
                            </div>
                        </div>
                    </div>

                    <!-- Tab 2: Marketing Teams -->
                    <div class="tab-pane" id="sol-marketing">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Marketing Teams</h3>
                                <p>Collaborate on a shared content calendar. Assign tasks, set approval chains, and
                                    ensure brand consistency.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Unified Team Inbox</li>
                                    <li><i class="fa-solid fa-check"></i> Approval Workflows</li>
                                    <li><i class="fa-solid fa-check"></i> Automated Reporting</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <img src="/landing/assets/images/marketing.png" alt="Marketing Workflow" />
                            </div>
                        </div>
                    </div>

                    <!-- Tab 3: Creators -->
                    <div class="tab-pane" id="sol-creators">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Creators</h3>
                                <p>Spend less time managing and more time creating. Engage your community with AI that
                                    sounds like you.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Personal Brand AI Voice</li>
                                    <li><i class="fa-solid fa-check"></i> Smart DMs & Replies</li>
                                    <li><i class="fa-solid fa-check"></i> Growth Analytics</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <img src="/landing/assets/images/creators.png" alt="Creator Tools" />
                            </div>
                        </div>
                    </div>

                    <!-- Tab 4: Agencies -->
                    <div class="tab-pane" id="sol-agencies">
                        <div class="pane-content">
                            <div class="pane-text">
                                <h3>Agencies</h3>
                                <p>Manage 100+ clients from a single dashboard. Switch between brand workspaces
                                    effortlessly.</p>
                                <ul class="feature-list">
                                    <li><i class="fa-solid fa-check"></i> Multi-Client Dashboard</li>
                                    <li><i class="fa-solid fa-check"></i> White-label Reports</li>
                                    <li><i class="fa-solid fa-check"></i> Secure Client Access</li>
                                </ul>
                            </div>
                            <div class="pane-visual">
                                <img src="/landing/assets/images/agencies.png" alt="Agency Dashboard" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 8: FAQ -->
    <section class="faq-section" id="faq">
        <div class="container">
            <div class="section-header">
                <span class="badge">FAQ</span>
                <h2>Frequently Asked Questions</h2>
            </div>

            <div class="faq-grid">
                <div class="faq-item">
                    <div class="faq-question">
                        <span>What do I get by joining the waitlist?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Early users who join the waitlist receive 1 Month Free + a Lifetime 'Early Bird' Discount,
                            along
                            with priority onboarding and early access to upcoming AI features.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Which platforms do you support?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>At launch, we will support Instagram, Facebook, and Shopify. WhatsApp, X (Twitter), and
                            LinkedIn integrations are coming soon.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>How long does it take to set up Bindrix?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Bindrix is designed for a 10-minute setup — connect your social accounts and start managing
                            conversations with no technical skills required.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Does the AI really understand my business and inventory?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes! By connecting your Shopify or WooCommerce store or uploading your business data, Bindrix
                            AI stays updated with real-time product details to provide accurate responses.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Can I control or approve AI replies?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Absolutely. You can enable full auto-replies, approval mode, or use AI only as smart
                            suggestions — you always stay in control.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Can I collaborate with my team?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes. Assign conversations, create approval workflows, and leave internal notes so your entire
                            team can work together seamlessly.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Is my data secure?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes. We use bank-level security and strict data privacy standards to protect both
                            your business and customer information.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>What happens after the free trial ends?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>You can choose a plan that fits your business size. We offer affordable pricing with no
                            long-term commitments, and you can cancel anytime.</p>
                    </div>
                </div>

                <div class="faq-item">
                    <div class="faq-question">
                        <span>Is Bindrix suitable for small businesses and agencies?</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                    <div class="faq-answer">
                        <p>Yes! Bindrix is designed to scale from solo founders to growing teams and high-volume
                            agencies.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 7: Final CTA -->
    <section class="final-cta">
        <div class="container">
            <h2>Be the first to experience smarter social engagement</h2>
            <form class="waitlist-form centered"
                action="https://script.google.com/macros/s/AKfycbwkcSpS7g37C75TMLSM5nIRiS-2JgPNKlfAwxjHO-h7hbugzRi1IglOfYttPajU2huUSQ/exec"
                method="POST" target="hidden_iframe">
                <input type="email" name="email" placeholder="Enter your work email" required />
                <button type="submit" class="cta-button">Join the Waitlist</button>
            </form>
            <div class="early-access-offer centered-offer">
                <div class="offer-badge">
                    <span class="offer-icon">✨</span>
                    <span class="offer-text">Early Access Perk</span>
                </div>
                <p class="offer-details">
                    Join the waitlist today and get <span class="offer-highlight">1 Month Free + Lifetime 'Early Bird'
                        Discount</span> when we launch
                </p>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2026 Bindrix. All rights reserved.</p>
        </div>
    </footer>

    <iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe>
        `,
        }}
      />
    </>
  );
};

export default LandingPageContent;
