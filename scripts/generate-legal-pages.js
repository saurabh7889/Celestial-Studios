const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const navbar = fs.readFileSync(path.join(root, 'assets/partials/navbar.html'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'assets/partials/footer.html'), 'utf8');
const novaWidget = fs
  .readFileSync(path.join(root, 'assets/partials/nova-widget.html'), 'utf8')
  .replace(/ASSET_PREFIX/g, '');

const bootstrapScript = `<script type="module">function i(){if(window.modalInitialized)return;const n=function(o){const e=document.getElementById(o);e&&(e.classList.remove("hidden"),document.body.style.overflow="hidden")},d=function(o){const e=document.getElementById(o);e&&(e.classList.add("hidden"),document.body.style.overflow="")};window.openModal||(window.openModal=n),window.closeModal||(window.closeModal=d),document.addEventListener("keydown",function(o){o.key==="Escape"&&document.querySelectorAll(".modal:not(.hidden)").forEach(t=>{t.classList.add("hidden"),document.body.style.overflow=""})}),document.addEventListener("click",function(o){if(o.target.classList.contains("modal-backdrop")){const e=o.target.closest(".modal");e&&(e.classList.add("hidden"),document.body.style.overflow="")}}),window.modalInitialized=!0}document.addEventListener("DOMContentLoaded",function(){i(),sessionStorage.getItem("entry_page")||sessionStorage.setItem("entry_page",window.location.href),!sessionStorage.getItem("referral_source")&&document.referrer&&document.referrer.indexOf(window.location.origin)===-1&&sessionStorage.setItem("referral_source",document.referrer)});</script>`;

const gtmHead = `<script type="module">(function(e,n,r,t,m){e[t]=e[t]||[],e[t].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var g=n.getElementsByTagName(r)[0],a=n.createElement(r),s="";a.async=!0,a.src="https://www.googletagmanager.com/gtm.js?id="+m+s,g.parentNode.insertBefore(a,g)})(window,document,"script","dataLayer","GTM-N6TV92J");</script>`;

const gtmBody = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6TV92J" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`;

const novaScripts = `<script src="assets/js/nova-config.js" defer></script>
<script src="assets/js/chat.js" defer></script>`;

const pages = [
  {
    file: 'privacy-policy.html',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    meta: 'Privacy Policy for Celestial Studios. Learn how we collect, use, and protect your personal information.',
    eyebrow: 'Legal',
    headline: 'Privacy',
    gradient: 'Policy',
    subtitle: 'Last updated: June 12, 2026',
    body: `
      <p>Celestial Studios ("we," "us," or "our") operates the website celestialstudios.in and provides digital services including Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.</p>

      <h2 id="information-we-collect">Information We Collect</h2>
      <p>We may collect personal information that you voluntarily provide when you:</p>
      <ul>
        <li>Complete contact forms or request a consultation</li>
        <li>Subscribe to our newsletter or blog updates</li>
        <li>Communicate with us via email, phone, WhatsApp, or Nova AI chat</li>
        <li>Engage us for Website Development, Branding, SEO, Digital Marketing, Business Consulting, or Digital Solutions</li>
      </ul>
      <p>This information may include your name, email address, phone number, company name, project details, and any other information you choose to provide.</p>
      <p>We automatically collect certain technical data when you visit our website, including IP address, browser type, device information, pages viewed, and referring URLs through cookies and analytics tools such as Google Tag Manager.</p>

      <h2 id="how-we-use">How We Use Your Information</h2>
      <p>We use collected information to:</p>
      <ul>
        <li>Respond to inquiries and provide requested services</li>
        <li>Deliver Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions</li>
        <li>Improve our website, user experience, and service offerings</li>
        <li>Send relevant updates, proposals, and project communications</li>
        <li>Comply with legal obligations and protect our legitimate business interests</li>
      </ul>

      <h2 id="sharing">Information Sharing</h2>
      <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our website, delivering services, or conducting business operations, provided they agree to keep information confidential. We may also disclose information when required by law or to protect our rights.</p>

      <h2 id="cookies">Cookies and Tracking</h2>
      <p>Our website uses cookies and similar technologies to enhance functionality and analyze traffic. For detailed information, please review our <a href="cookie-policy.html">Cookie Policy</a>.</p>

      <h2 id="security">Data Security</h2>
      <p>We implement reasonable administrative, technical, and organizational measures to protect your personal information. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security.</p>

      <h2 id="retention">Data Retention</h2>
      <p>We retain personal information only as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.</p>

      <h2 id="your-rights">Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights, contact us using the details on our <a href="contact-information.html">Contact Information</a> page.</p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the revised policy.</p>

      <h2 id="contact">Contact Us</h2>
      <p>For privacy-related questions, contact Celestial Studios at <a href="mailto:azayrth1319@gmail.com">azayrth1319@gmail.com</a> or visit our <a href="contact.html">Contact</a> page.</p>
    `,
  },
  {
    file: 'terms-and-conditions.html',
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    meta: 'Terms and Conditions governing the use of Celestial Studios website and services.',
    eyebrow: 'Legal',
    headline: 'Terms &',
    gradient: 'Conditions',
    subtitle: 'Last updated: June 12, 2026',
    body: `
      <p>Welcome to Celestial Studios. These Terms & Conditions ("Terms") govern your access to and use of our website at celestialstudios.in and the services we provide, including Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions.</p>
      <p>By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please do not use our website or services.</p>

      <h2 id="services">Services</h2>
      <p>Celestial Studios provides professional digital agency services tailored to each client's needs. Specific deliverables, timelines, and fees are defined in individual proposals, statements of work, or service agreements.</p>

      <h2 id="use-of-website">Use of Website</h2>
      <p>You agree to use our website only for lawful purposes. You may not:</p>
      <ul>
        <li>Attempt to gain unauthorized access to our systems or data</li>
        <li>Transmit harmful code, spam, or malicious content</li>
        <li>Copy, reproduce, or distribute website content without written permission</li>
        <li>Misrepresent your affiliation with Celestial Studios</li>
      </ul>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>All content on this website—including text, graphics, logos, images, and software—is the property of Celestial Studios or its licensors and is protected by applicable intellectual property laws. Upon full payment, clients receive rights to deliverables as specified in their service agreement.</p>

      <h2 id="client-responsibilities">Client Responsibilities</h2>
      <p>Clients agree to provide accurate information, timely feedback, and necessary materials required for project completion. Delays in client-provided assets may affect project timelines.</p>

      <h2 id="payment">Payment Terms</h2>
      <p>Payment terms, including deposits, milestones, and final balances, are outlined in individual proposals or invoices. Late payments may result in project suspension. Refund eligibility is governed by our <a href="refund-policy.html">Refund Policy</a>.</p>

      <h2 id="limitation">Limitation of Liability</h2>
      <p>To the fullest extent permitted by law, Celestial Studios shall not be liable for indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>

      <h2 id="termination">Termination</h2>
      <p>Either party may terminate a service engagement according to the terms specified in the applicable agreement. Celestial Studios reserves the right to suspend or terminate website access for violations of these Terms.</p>

      <h2 id="governing-law">Governing Law</h2>
      <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Prayagraj, Uttar Pradesh, India.</p>

      <h2 id="contact">Contact</h2>
      <p>Questions regarding these Terms may be directed to Celestial Studios via our <a href="contact-information.html">Contact Information</a> page or <a href="contact.html">Contact form</a>.</p>
    `,
  },
  {
    file: 'cookie-policy.html',
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    meta: 'Cookie Policy for Celestial Studios. Learn about cookies and tracking technologies we use.',
    eyebrow: 'Legal',
    headline: 'Cookie',
    gradient: 'Policy',
    subtitle: 'Last updated: June 12, 2026',
    body: `
      <p>This Cookie Policy explains how Celestial Studios ("we," "us," or "our") uses cookies and similar tracking technologies on celestialstudios.in when you visit our website to learn about our Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions.</p>

      <h2 id="what-are-cookies">What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, and understand how visitors interact with content.</p>

      <h2 id="cookies-we-use">Cookies We Use</h2>
      <h3>Essential Cookies</h3>
      <p>These cookies are necessary for basic website functionality, such as session management and security. They cannot be disabled without affecting site performance.</p>
      <h3>Analytics Cookies</h3>
      <p>We use analytics tools, including Google Tag Manager, to understand how visitors use our website. This helps us improve content, navigation, and user experience.</p>
      <h3>Functional Cookies</h3>
      <p>Functional cookies remember choices you make, such as dismissing the Nova AI welcome prompt, to provide a more personalized experience.</p>

      <h2 id="third-party">Third-Party Cookies</h2>
      <p>Third-party services integrated into our website (such as analytics providers, form handlers, and embedded content) may set their own cookies. We encourage you to review the privacy policies of these third parties.</p>

      <h2 id="managing-cookies">Managing Cookies</h2>
      <p>You can control or delete cookies through your browser settings. Most browsers allow you to block or delete cookies; however, disabling cookies may affect website functionality.</p>

      <h2 id="updates">Updates</h2>
      <p>We may update this Cookie Policy periodically. Changes will be posted on this page with a revised date.</p>

      <h2 id="contact">Contact Us</h2>
      <p>For questions about our use of cookies, contact us at <a href="mailto:azayrth1319@gmail.com">azayrth1319@gmail.com</a> or visit <a href="contact-information.html">Contact Information</a>.</p>
    `,
  },
  {
    file: 'disclaimer.html',
    slug: 'disclaimer',
    title: 'Disclaimer',
    meta: 'Disclaimer for Celestial Studios website content and digital services.',
    eyebrow: 'Legal',
    headline: 'Website',
    gradient: 'Disclaimer',
    subtitle: 'Last updated: June 12, 2026',
    body: `
      <p>The information provided on celestialstudios.in is for general informational purposes only. Celestial Studios makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of content on this website.</p>

      <h2 id="general">General Information</h2>
      <p>Content on our website—including blog articles, service descriptions, case studies, and Nova AI responses—is provided for informational purposes and does not constitute professional, legal, financial, or technical advice. Always consult qualified professionals before making business decisions.</p>

      <h2 id="services">Service Outcomes</h2>
      <p>While Celestial Studios strives to deliver high-quality Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions, we do not guarantee specific results such as search engine rankings, revenue increases, or lead volumes. Outcomes depend on numerous factors including market conditions, client participation, and industry competition.</p>

      <h2 id="third-party-links">Third-Party Links</h2>
      <p>Our website may contain links to third-party websites. Celestial Studios is not responsible for the content, privacy practices, or availability of external sites. Inclusion of a link does not imply endorsement.</p>

      <h2 id="testimonials">Testimonials and Case Studies</h2>
      <p>Testimonials and case studies reflect individual client experiences and may not represent typical results. Past performance is not indicative of future outcomes.</p>

      <h2 id="ai-assistant">Nova AI Assistant</h2>
      <p>Responses from Nova, our AI assistant, are generated for general guidance and may contain inaccuracies. Nova responses do not replace direct consultation with our team. For accurate project quotes and advice, please <a href="contact.html">contact us</a> directly.</p>

      <h2 id="limitation">Limitation of Liability</h2>
      <p>Celestial Studios shall not be held liable for any direct or indirect damages arising from the use of this website or reliance on its content. Use of this website is at your own risk.</p>

      <h2 id="contact">Contact</h2>
      <p>For questions about this Disclaimer, visit our <a href="contact-information.html">Contact Information</a> page.</p>
    `,
  },
  {
    file: 'refund-policy.html',
    slug: 'refund-policy',
    title: 'Refund Policy',
    meta: 'Refund Policy for Celestial Studios digital services and projects.',
    eyebrow: 'Legal',
    headline: 'Refund',
    gradient: 'Policy',
    subtitle: 'Last updated: June 12, 2026',
    body: `
      <p>At Celestial Studios, we are committed to delivering quality Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions. This Refund Policy outlines the conditions under which refunds may be issued.</p>

      <h2 id="general">General Policy</h2>
      <p>Because our services involve custom work, creative deliverables, and allocated resources, refunds are evaluated on a case-by-case basis according to project stage, work completed, and the terms specified in your proposal or service agreement.</p>

      <h2 id="deposits">Deposits and Retainers</h2>
      <p>Initial deposits and retainers are generally non-refundable once work has commenced, as they cover project planning, resource allocation, and initial deliverables. Specific terms will be stated in your signed agreement.</p>

      <h2 id="project-cancellation">Project Cancellation</h2>
      <p>If a project is cancelled by the client after work has begun, the client is responsible for payment of all work completed up to the cancellation date, including any third-party costs incurred on the client's behalf.</p>

      <h2 id="eligible-refunds">Eligible Refunds</h2>
      <p>Refunds may be considered in the following circumstances:</p>
      <ul>
        <li>Celestial Studios fails to deliver agreed-upon services without reasonable cause</li>
        <li>Duplicate or erroneous payments are made</li>
        <li>A refund is explicitly guaranteed in your written service agreement</li>
      </ul>

      <h2 id="non-refundable">Non-Refundable Items</h2>
      <p>The following are typically non-refundable:</p>
      <ul>
        <li>Completed deliverables that have been approved by the client</li>
        <li>Third-party fees (domain registration, hosting, ad spend, software licenses)</li>
        <li>Consultation fees for completed strategy sessions</li>
      </ul>

      <h2 id="process">Refund Process</h2>
      <p>To request a refund, contact us at <a href="mailto:azayrth1319@gmail.com">azayrth1319@gmail.com</a> with your project details and reason for the request. Approved refunds will be processed within 14–21 business days to the original payment method.</p>

      <h2 id="contact">Contact</h2>
      <p>For refund inquiries, visit our <a href="contact-information.html">Contact Information</a> page or call +91 9235827223.</p>
    `,
  },
  {
    file: 'contact-information.html',
    slug: 'contact-information',
    title: 'Contact Information',
    meta: 'Contact information for Celestial Studios — phone, email, location, and business hours.',
    eyebrow: 'Contact',
    headline: 'Contact',
    gradient: 'Information',
    subtitle: 'Reach Celestial Studios anytime',
    body: `
      <p>Celestial Studios is a digital agency helping businesses grow through Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions. We serve clients remotely worldwide from our base in Prayagraj, Uttar Pradesh, India.</p>

      <h2 id="business-details">Business Details</h2>
      <ul>
        <li><strong>Business Name:</strong> Celestial Studios</li>
        <li><strong>Tagline:</strong> Click. Connect. Grow.</li>
        <li><strong>Location:</strong> Prayagraj, Uttar Pradesh, India</li>
        <li><strong>Service Area:</strong> India and international clients (remote)</li>
      </ul>

      <h2 id="phone">Phone</h2>
      <ul>
        <li><strong>Primary:</strong> <a href="tel:+919235827223">+91 9235827223</a></li>
        <li><strong>Secondary:</strong> <a href="tel:+916388303193">+91 6388303193</a></li>
      </ul>

      <h2 id="email">Email</h2>
      <p><a href="mailto:azayrth1319@gmail.com">azayrth1319@gmail.com</a></p>

      <h2 id="social">Social & Messaging</h2>
      <ul>
        <li><strong>Instagram:</strong> <a href="https://www.instagram.com/celestialstudios1301/" target="_blank" rel="noopener noreferrer">@celestialstudios1301</a></li>
        <li><strong>WhatsApp:</strong> <a href="https://wa.me/message/GDF3NI3OCOOSN1" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a></li>
      </ul>

      <h2 id="services">Services We Offer</h2>
      <ul>
        <li>Website Development & Support</li>
        <li>Branding & Identity Design</li>
        <li>SEO (Search Engine Optimization)</li>
        <li>Digital Marketing</li>
        <li>Business Consulting</li>
        <li>Digital Solutions & AI Automation</li>
      </ul>

      <h2 id="contact-form">Send a Message</h2>
      <p>For project inquiries, quotes, or general questions, use our <a href="contact.html">Contact form</a> and our team will respond promptly.</p>
    `,
  },
];

function buildPage(page) {
  const canonical = `https://celestialstudios.in/${page.slug}/`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    headline: `${page.title} | Celestial Studios`,
    description: page.meta,
    author: { '@type': 'Organization', name: 'Celestial Studios' },
    publisher: {
      '@type': 'Organization',
      name: 'Celestial Studios',
      logo: { '@type': 'ImageObject', url: 'https://celestialstudios.in/logo.png' },
    },
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link href="https://api.fontshare.com/v2/css?f[]=sentient@400,500,700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="assets/images/celestial-favicon.png">
  <title>${page.title} | Celestial Studios</title>
  <meta name="description" content="${page.meta}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${page.title} | Celestial Studios">
  <meta property="og:description" content="${page.meta}">
  <meta property="og:site_name" content="Celestial Studios">
  <meta property="twitter:card" content="summary">
  <meta property="twitter:title" content="${page.title} | Celestial Studios">
  <meta property="twitter:description" content="${page.meta}">
  <script type="application/ld+json">${jsonLd}</script>
  ${gtmHead}
  <link rel="stylesheet" href="assets/css/contact.css">
  <link rel="stylesheet" href="assets/css/brand-images.css">
  <link rel="stylesheet" href="assets/css/blog-article.css">
  <link rel="stylesheet" href="assets/css/footer.css">
</head>
<body class="font-sans">
  ${gtmBody}
  ${bootstrapScript}
  ${navbar}
  <script type="module">document.addEventListener("scroll",()=>{const e=document.getElementById("main-header");window.scrollY>0?e?.classList.add("shadow-header"):e?.classList.remove("shadow-header")});</script>

  <main class="overflow-hidden">
    <section class="relative bg-[#0a0f1c] text-white pt-32 lg:pt-40 pb-16 lg:pb-24 overflow-hidden">
      <div class="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10 text-center">
        <div class="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-blue-400 mb-3">
          <span class="text-[12px] font-bold tracking-wider uppercase">${page.eyebrow}</span>
        </div>
        <h1 class="heading-1-split !text-white">${page.headline} <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">${page.gradient}</span></h1>
        <p class="text-lg md:text-xl font-normal text-slate-300 max-w-2xl mx-auto leading-relaxed">${page.subtitle}</p>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white">
      <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <article class="article-body legal-content">
          ${page.body.trim()}
        </article>
      </div>
    </section>
  </main>

  ${footer}
  ${novaWidget}
  ${novaScripts}
</body>
</html>`;
}

for (const page of pages) {
  const html = buildPage(page);
  fs.writeFileSync(path.join(root, page.file), html, 'utf8');
  console.log(`Generated ${page.file}`);
}

console.log('Legal pages generated.');
