/**
 * Generates blog.html, blog/*.html articles, and blogpage.html from metadata + content files.
 * Run: node scripts/generate-blog-site.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const contentDir = path.join(__dirname, 'blog-content');
const blogDir = path.join(root, 'blog');

const posts = [
  {
    slug: 'professional-business-website',
    title: 'Why Every Modern Business Needs a Professional Website',
    category: 'Website Development',
    excerpt: 'Your website is your digital storefront. Discover why a professional site builds credibility, captures leads, and fuels growth in today\'s connected economy.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-01-15',
    dateDisplay: 'January 15, 2026',
    readTime: '9 min read',
    image: 'assets/images/web-devel.png',
    imageAlt: 'Professional business website displayed on modern devices',
    metaDescription: 'Learn why every modern business needs a professional website. Celestial Studios explains how great web design builds trust, generates leads, and drives growth.',
    featured: true,
    related: ['website-mistakes-costing-customers', 'generate-leads-through-website', 'website-speed-optimization'],
  },
  {
    slug: 'website-mistakes-costing-customers',
    title: '10 Website Mistakes That Are Costing You Customers',
    category: 'Web Design',
    excerpt: 'Slow load times, confusing navigation, and weak mobile experiences silently drive visitors away. Here are ten fixable mistakes hurting your conversions.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-01-22',
    dateDisplay: 'January 22, 2026',
    readTime: '10 min read',
    image: 'assets/images/website-support.jpg',
    imageAlt: 'Website audit and performance review on laptop',
    metaDescription: 'Avoid these 10 common website mistakes that cost you customers. Celestial Studios shares practical fixes for speed, UX, and conversion problems.',
    related: ['professional-business-website', 'user-experience-matters', 'website-speed-optimization'],
  },
  {
    slug: 'branding-builds-trust',
    title: 'How Branding Builds Trust and Increases Sales',
    category: 'Branding',
    excerpt: 'Consistent branding signals reliability before a customer reads a single word. See how visual identity and messaging translate into measurable sales growth.',
    author: 'Aryan Raman Asthana',
    authorRole: 'Business Development Partner',
    authorImage: 'assets/images/aryan-profile.svg',
    date: '2026-02-03',
    dateDisplay: 'February 3, 2026',
    readTime: '8 min read',
    image: 'assets/images/brand-design.png',
    imageAlt: 'Brand identity design elements and logo concepts',
    metaDescription: 'Discover how strategic branding builds customer trust and increases sales. Expert insights from Celestial Studios on brand identity and growth.',
    related: ['strong-brand-identity', 'digital-marketing-strategies', 'professional-business-website'],
  },
  {
    slug: 'seo-for-small-businesses',
    title: 'SEO for Small Businesses: A Complete Beginner\'s Guide',
    category: 'SEO',
    excerpt: 'Search engine optimization isn\'t reserved for enterprise brands. This beginner-friendly guide breaks down SEO into actionable steps any small business can follow.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-02-12',
    dateDisplay: 'February 12, 2026',
    readTime: '11 min read',
    image: 'assets/images/blog-seo-growth.jpg',
    imageAlt: 'SEO analytics and search ranking growth chart',
    metaDescription: 'A complete beginner\'s guide to SEO for small businesses. Learn keywords, on-page SEO, and local search strategies from Celestial Studios.',
    related: ['digital-marketing-strategies', 'generate-leads-through-website', 'website-speed-optimization'],
  },
  {
    slug: 'social-media-business-growth',
    title: 'How Social Media Helps Businesses Grow Faster',
    category: 'Social Media Marketing',
    excerpt: 'Social platforms are where discovery happens. Learn how to turn followers into customers with content that connects and campaigns that convert.',
    author: 'Aryan Raman Asthana',
    authorRole: 'Business Development Partner',
    authorImage: 'assets/images/aryan-profile.svg',
    date: '2026-02-20',
    dateDisplay: 'February 20, 2026',
    readTime: '8 min read',
    image: 'assets/images/blog-marketing-analytics.jpg',
    imageAlt: 'Social media marketing analytics dashboard',
    metaDescription: 'Learn how social media marketing helps businesses grow faster. Celestial Studios shares strategies for engagement, content, and conversion.',
    related: ['digital-marketing-strategies', 'branding-builds-trust', 'digital-presence-checklist-startups'],
  },
  {
    slug: 'digital-presence-checklist-startups',
    title: 'The Ultimate Digital Presence Checklist for Startups',
    category: 'Startup Growth',
    excerpt: 'Launching a startup? Use this comprehensive checklist to build a credible digital foundation—from your website to SEO, social, and analytics.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-03-01',
    dateDisplay: 'March 1, 2026',
    readTime: '10 min read',
    image: 'assets/images/consult.png',
    imageAlt: 'Startup team planning digital strategy',
    metaDescription: 'The ultimate digital presence checklist for startups. Build your website, brand, SEO, and marketing foundation with Celestial Studios.',
    related: ['professional-business-website', 'strong-brand-identity', 'seo-for-small-businesses'],
  },
  {
    slug: 'website-speed-optimization',
    title: 'Website Speed Optimization and Why It Matters',
    category: 'Website Development',
    excerpt: 'Every second of load time costs conversions and search rankings. Understand the technical and design factors behind fast, high-performing websites.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-03-10',
    dateDisplay: 'March 10, 2026',
    readTime: '9 min read',
    image: 'assets/images/web-deve.png',
    imageAlt: 'Website performance and speed optimization metrics',
    metaDescription: 'Website speed optimization explained: why page speed matters for SEO, conversions, and user experience. Tips from Celestial Studios.',
    related: ['website-mistakes-costing-customers', 'user-experience-matters', 'seo-for-small-businesses'],
  },
  {
    slug: 'generate-leads-through-website',
    title: 'How to Generate Leads Through Your Website',
    category: 'Digital Marketing',
    excerpt: 'Your website should be your best salesperson. Learn proven tactics for lead capture, landing pages, and conversion funnels that turn traffic into pipeline.',
    author: 'Aryan Raman Asthana',
    authorRole: 'Business Development Partner',
    authorImage: 'assets/images/aryan-profile.svg',
    date: '2026-03-18',
    dateDisplay: 'March 18, 2026',
    readTime: '9 min read',
    image: 'assets/images/blog-web-growth.jpg',
    imageAlt: 'Lead generation funnel and conversion growth',
    metaDescription: 'How to generate leads through your website. Landing pages, CTAs, and conversion strategies from Celestial Studios digital marketing experts.',
    related: ['professional-business-website', 'digital-marketing-strategies', 'user-experience-matters'],
  },
  {
    slug: 'strong-brand-identity',
    title: 'Building a Strong Brand Identity From Scratch',
    category: 'Branding',
    excerpt: 'From logo to color palette to voice—here\'s how to craft a brand identity that feels intentional, memorable, and aligned with your business goals.',
    author: 'Aryan Raman Asthana',
    authorRole: 'Business Development Partner',
    authorImage: 'assets/images/aryan-profile.svg',
    date: '2026-04-02',
    dateDisplay: 'April 2, 2026',
    readTime: '10 min read',
    image: 'assets/images/brand-design.png',
    imageAlt: 'Brand identity workbook with logos and color swatches',
    metaDescription: 'Build a strong brand identity from scratch. Logo, colors, typography, and voice guidelines from Celestial Studios branding experts.',
    related: ['branding-builds-trust', 'digital-presence-checklist-startups', 'social-media-business-growth'],
  },
  {
    slug: 'digital-marketing-strategies',
    title: 'Digital Marketing Strategies That Actually Work',
    category: 'Digital Marketing',
    excerpt: 'Cut through the noise with marketing strategies backed by data—not hype. SEO, content, paid ads, and email combined into a cohesive growth plan.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-04-15',
    dateDisplay: 'April 15, 2026',
    readTime: '11 min read',
    image: 'assets/images/blog-digital-strategy.jpg',
    imageAlt: 'Digital marketing strategy planning session',
    metaDescription: 'Digital marketing strategies that actually work in 2026. SEO, content, paid ads, and email marketing insights from Celestial Studios.',
    related: ['seo-for-small-businesses', 'social-media-business-growth', 'generate-leads-through-website'],
  },
  {
    slug: 'user-experience-matters',
    title: 'Why User Experience Matters More Than Ever',
    category: 'UI/UX Design',
    excerpt: 'Users expect seamless digital experiences everywhere. Discover why UX is a competitive advantage and how to design interfaces people actually enjoy using.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-05-01',
    dateDisplay: 'May 1, 2026',
    readTime: '8 min read',
    image: 'assets/images/why-us.png',
    imageAlt: 'User experience design wireframes and interface mockups',
    metaDescription: 'Why user experience matters more than ever for business growth. UX design principles and best practices from Celestial Studios.',
    related: ['website-mistakes-costing-customers', 'website-speed-optimization', 'professional-business-website'],
  },
  {
    slug: 'future-of-business-growth',
    title: 'The Future of Business Growth in the Digital Age',
    category: 'Business Growth',
    excerpt: 'AI, automation, and evolving consumer behavior are reshaping how businesses grow. Here\'s what founders and marketers need to prepare for next.',
    author: 'Saurabh Kumar',
    authorRole: 'Founder, Celestial Studios',
    authorImage: 'assets/images/saurabh-profile.png',
    date: '2026-05-20',
    dateDisplay: 'May 20, 2026',
    readTime: '10 min read',
    image: 'assets/images/blog-ai-marketing.jpg',
    imageAlt: 'Futuristic digital business growth and AI technology',
    metaDescription: 'The future of business growth in the digital age. AI, automation, and digital strategy trends from Celestial Studios.',
    related: ['digital-marketing-strategies', 'future-of-business-growth', 'digital-presence-checklist-startups'],
  },
];

// Fix duplicate in future-of-business-growth related
posts[11].related = ['digital-marketing-strategies', 'professional-business-website', 'future-of-business-growth'].filter((s, i, a) => a.indexOf(s) === i && s !== 'future-of-business-growth');
posts[11].related = ['digital-marketing-strategies', 'professional-business-website', 'website-speed-optimization'];

function adjustPaths(html, prefix) {
  return html
    .replace(/href="assets\//g, `href="${prefix}assets/`)
    .replace(/src="assets\//g, `src="${prefix}assets/`)
    .replace(/href="index\.html/g, `href="${prefix}index.html`)
    .replace(/href="services\.html/g, `href="${prefix}services.html`)
    .replace(/href="about\.html/g, `href="${prefix}about.html`)
    .replace(/href="contact\.html/g, `href="${prefix}contact.html`)
    .replace(/href="blog\.html/g, `href="${prefix}blog.html`)
    .replace(/href="industries\.html/g, `href="${prefix}industries.html`)
    .replace(/href="blog\//g, `href="${prefix}blog/`);
}

function extractToc(bodyHtml) {
  const toc = [];
  const h2Regex = /<h2\s+id="([^"]+)"[^>]*>([^<]+)</g;
  let match;
  while ((match = h2Regex.exec(bodyHtml)) !== null) {
    toc.push({ id: match[1], text: match[2].trim(), children: [] });
  }
  const h3Regex = /<h3\s+id="([^"]+)"[^>]*>([^<]+)</g;
  while ((match = h3Regex.exec(bodyHtml)) !== null) {
    const lastH2 = toc[toc.length - 1];
    if (lastH2) {
      lastH2.children.push({ id: match[1], text: match[2].trim() });
    }
  }
  return toc;
}

function buildTocHtml(toc, articlePrefix) {
  if (!toc.length) return '';
  let html = '<nav class="article-toc__inner" aria-label="Table of contents"><p class="article-toc__title">On this page</p><ul class="article-toc__list">';
  toc.forEach((item) => {
    html += `<li><a href="${articlePrefix}#${item.id}">${item.text}</a>`;
    if (item.children.length) {
      html += '<ul class="article-toc__list">';
      item.children.forEach((child) => {
        html += `<li class="toc-h3"><a href="${articlePrefix}#${child.id}">${child.text}</a></li>`;
      });
      html += '</ul>';
    }
    html += '</li>';
  });
  html += '</ul></nav>';
  return html;
}

function buildRelatedHtml(post, allPosts, pathPrefix) {
  const related = post.related
    .map((slug) => allPosts.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  let html = '<section class="article-related"><h2>Related Articles</h2><div class="article-related-grid">';
  related.forEach((r) => {
    html += `<a href="${pathPrefix}blog/${r.slug}.html" class="article-related-card">
      <img src="${pathPrefix}${r.image}" alt="${r.imageAlt}" loading="lazy" width="400" height="200">
      <div class="article-related-card__body"><h3>${r.title}</h3></div>
    </a>`;
  });
  html += '</div></section>';
  return html;
}

function buildArticlePage(post, allPosts, pathPrefix, isRoot) {
  const contentPath = path.join(contentDir, `${post.slug}.html`);
  if (!fs.existsSync(contentPath)) {
    console.warn(`Missing content: ${contentPath}`);
    return null;
  }
  let bodyHtml = fs.readFileSync(contentPath, 'utf8');
  if (pathPrefix === '../') {
    bodyHtml = bodyHtml.replace(/href="\.\.\//g, 'href="../');
  } else if (pathPrefix === '') {
    bodyHtml = bodyHtml.replace(/href="\.\.\//g, 'href="');
  }

  const toc = extractToc(bodyHtml);
  const articleUrl = isRoot
    ? `https://celestialstudios.in/blog/${post.slug}/`
    : `https://celestialstudios.in/blog/${post.slug}/`;
  const canonical = articleUrl;
  const ogImage = `https://celestialstudios.in/${post.image.replace('assets/', 'assets/')}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: ogImage,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Celestial Studios',
      logo: { '@type': 'ImageObject', url: 'https://celestialstudios.in/assets/images/celestial-logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  const navbar = adjustPaths(fs.readFileSync(path.join(root, 'assets/partials/navbar.html'), 'utf8'), pathPrefix);
  const footer = adjustPaths(fs.readFileSync(path.join(root, 'assets/partials/footer.html'), 'utf8'), pathPrefix);

  const tocHtml = buildTocHtml(toc, '');
  const relatedHtml = buildRelatedHtml(post, allPosts, pathPrefix);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <link href="https://api.fontshare.com/v2/css?f[]=sentient@400,500,700&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="${pathPrefix}assets/images/celestial-favicon.png">
  <title>${post.title} | Celestial Studios Blog</title>
  <meta name="description" content="${post.metaDescription}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.metaDescription}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="Celestial Studios">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.metaDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <link rel="stylesheet" href="${pathPrefix}assets/css/contact.css">
  <link rel="stylesheet" href="${pathPrefix}assets/css/brand-images.css">
  <link rel="stylesheet" href="${pathPrefix}assets/css/blog-article.css">
</head>
<body class="font-sans">
  <div id="reading-progress" class="reading-progress" aria-hidden="true"></div>
  ${navbar}
  <script type="module">document.addEventListener("scroll", () => { const e = document.getElementById("main-header"); window.scrollY > 0 ? e?.classList.add("shadow-header") : e?.classList.remove("shadow-header"); });</script>

  <section class="article-hero text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
    <div class="article-hero__orb" aria-hidden="true"></div>
    <div class="max-w-4xl mx-auto relative z-10">
      <p class="article-breadcrumb"><a href="${pathPrefix}index.html">Home</a> / <a href="${pathPrefix}blog.html">Blog</a> / <span>${post.category}</span></p>
      <span class="blog-card__category" style="color:#60a5fa;background:rgba(59,130,246,0.15);border-color:rgba(96,165,250,0.3);">${post.category}</span>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mt-4 mb-6">${post.title}</h1>
      <div class="flex flex-wrap items-center gap-4 text-sm text-white/70">
        <span>${post.author}</span>
        <span>·</span>
        <time datetime="${post.date}">${post.dateDisplay}</time>
        <span>·</span>
        <span>${post.readTime}</span>
      </div>
    </div>
  </section>

  <div class="article-layout">
    <aside class="article-toc lg:block">${tocHtml}</aside>
    <article class="article-content">
      <div class="article-featured-image celestial-image-wrap">
        <img src="${pathPrefix}${post.image}" alt="${post.imageAlt}" class="celestial-brand-img w-full h-auto object-cover" width="1200" height="630" loading="eager">
      </div>
      <div class="article-meta-bar">
        <span><strong>${post.author}</strong> · ${post.authorRole}</span>
        <span>${post.dateDisplay}</span>
        <span>${post.readTime}</span>
      </div>
      <div class="article-body">${bodyHtml}</div>

      <div class="article-author-card">
        <img src="${pathPrefix}${post.authorImage}" alt="${post.author}" width="56" height="56" loading="lazy">
        <div>
          <strong class="text-slate-900">${post.author}</strong>
          <p class="text-sm text-slate-500 m-0">${post.authorRole}</p>
          <p class="text-sm text-slate-600 mt-2 mb-0">Celestial Studios helps businesses grow through websites, branding, digital marketing, and AI-powered solutions. <em>Click. Connect. Grow.</em></p>
        </div>
      </div>

      <div class="article-share">
        <span class="text-sm text-slate-500 font-medium">Share:</span>
        <a class="article-share__btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a class="article-share__btn" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(canonical)}&text=${encodeURIComponent(post.title)}" target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a class="article-share__btn" href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(canonical)}" aria-label="Share via email">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </a>
      </div>

      ${relatedHtml}

      <section class="article-cta">
        <h2>Ready to Grow Your Brand?</h2>
        <p>Partner with Celestial Studios to build a stronger online presence and accelerate your business growth.</p>
        <div class="article-cta__buttons">
          <a href="${pathPrefix}contact.html" class="article-cta__btn-primary">Book a Free Consultation</a>
          <a href="${pathPrefix}services.html" class="article-cta__btn-secondary">Explore Our Services</a>
        </div>
      </section>
    </article>
  </div>

  ${footer}
  <button id="back-to-top" class="back-to-top" aria-label="Back to top">
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>
  </button>
  <script src="${pathPrefix}assets/js/blog-article-ui.js" defer></script>
  <script src="${pathPrefix}assets/js/chat.js" defer></script>
</body>
</html>`;
}

function buildBlogListing() {
  const navbar = fs.readFileSync(path.join(root, 'assets/partials/navbar.html'), 'utf8');
  const footer = fs.readFileSync(path.join(root, 'assets/partials/footer.html'), 'utf8');

  let cardsHtml = '';
  posts.forEach((post) => {
    const featuredBadge = post.featured ? '<span class="blog-featured-badge">Featured</span>' : '';
    cardsHtml += `
    <article class="blog-card group">
      <a href="blog/${post.slug}.html" class="block">
        <div class="blog-card__image-wrap celestial-image-wrap relative">
          ${featuredBadge}
          <img src="${post.image}" alt="${post.imageAlt}" class="celestial-brand-img w-full h-full object-cover" loading="lazy" width="640" height="360">
        </div>
        <div class="blog-card__body">
          <span class="blog-card__category">${post.category}</span>
          <h2 class="blog-card__title">${post.title}</h2>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <div class="blog-card__meta">
            <span>${post.author}</span>
            <span class="blog-card__meta-divider" aria-hidden="true"></span>
            <time datetime="${post.date}">${post.dateDisplay}</time>
            <span class="blog-card__meta-divider" aria-hidden="true"></span>
            <span>${post.readTime}</span>
          </div>
          <span class="blog-card__read-more">Read More <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
        </div>
      </a>
    </article>`;
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
  <link rel="icon" type="image/png" href="assets/images/celestial-favicon.png">
  <title>Celestial Studios Blog | Digital Growth Insights</title>
  <meta name="description" content="Expert insights on website development, branding, SEO, and digital marketing from Celestial Studios. Click. Connect. Grow.">
  <link rel="canonical" href="https://celestialstudios.in/blog/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://celestialstudios.in/blog/">
  <meta property="og:title" content="Celestial Studios Blog | Digital Growth Insights">
  <meta property="og:description" content="Expert insights on websites, branding, SEO, and digital marketing from Celestial Studios.">
  <meta property="og:image" content="https://celestialstudios.in/assets/images/blog-web-growth.jpg">
  <meta property="og:site_name" content="Celestial Studios">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Blog","name":"Celestial Studios Blog","description":"Digital growth insights for modern businesses","url":"https://celestialstudios.in/blog/","publisher":{"@type":"Organization","name":"Celestial Studios"}}</script>
  <link rel="stylesheet" href="assets/css/contact.css">
  <link rel="stylesheet" href="assets/css/brand-images.css">
  <link rel="stylesheet" href="assets/css/blog.css">
</head>
<body class="font-sans">
  ${navbar}
  <script type="module">document.addEventListener("scroll", () => { const e = document.getElementById("main-header"); window.scrollY > 0 ? e?.classList.add("shadow-header") : e?.classList.remove("shadow-header"); });</script>

  <section class="blog-hero text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="blog-hero__inner max-w-7xl mx-auto">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        Insights for <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Growth</span>
      </h1>
      <p class="text-xl text-white/80 max-w-2xl leading-relaxed">
        Practical strategies on websites, branding, SEO, and marketing from the Celestial Studios team. <em>Click. Connect. Grow.</em>
      </p>
    </div>
  </section>

  <section class="blog-listing-section py-16 sm:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${cardsHtml}
      </div>
    </div>
  </section>

  ${footer}
  <script src="assets/js/chat.js" defer></script>
</body>
</html>`;
}

// Main
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

let generated = 0;
posts.forEach((post) => {
  const html = buildArticlePage(post, posts, '../', false);
  if (html) {
    fs.writeFileSync(path.join(blogDir, `${post.slug}.html`), html, 'utf8');
    generated++;
    console.log(`Generated blog/${post.slug}.html`);
  }
});

const blogHtml = buildBlogListing();
fs.writeFileSync(path.join(root, 'blog.html'), blogHtml, 'utf8');
console.log('Generated blog.html');

const firstPost = posts[0];
const blogpageHtml = buildArticlePage(firstPost, posts, '', true);
if (blogpageHtml) {
  fs.writeFileSync(path.join(root, 'blogpage.html'), blogpageHtml, 'utf8');
  console.log('Generated blogpage.html (template article)');
}

console.log(`Done. ${generated} articles generated.`);
