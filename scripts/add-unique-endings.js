const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'blog-content');

const uniqueEndings = {
  'branding-builds-trust.html': `<h2 id="brand-trust-action-plan">Your Brand Trust Action Plan</h2>
<p>Audit every customer-facing touchpoint this week: website header, email signature, proposal template, and social profiles. Score each 1–10 on visual consistency and message clarity. The lowest-scoring touchpoint is your highest-priority branding fix. Trust repairs start where inconsistency is most visible.</p>
<p>Schedule quarterly brand reviews as your business evolves—new services, markets, and team members all introduce drift. Celestial Studios helps businesses maintain brand integrity through guidelines, templates, and periodic refreshes that keep trust signals strong.</p>\n`,
  'digital-marketing-strategies.html': `<h2 id="marketing-90-day-plan">Build a 90-Day Marketing Sprint</h2>
<p>Choose three channels maximum for your next quarter. Define one measurable goal per channel—organic traffic increase, email list growth, or paid ROAS target. Weekly reviews keep momentum; monthly retrospectives adjust allocation based on results rather than assumptions.</p>
<p>Document learnings in a shared team doc so institutional knowledge accumulates. Marketing strategies improve when teams build on prior experiments instead of restarting from zero each quarter.</p>\n`,
  'digital-presence-checklist-startups.html': `<h2 id="startup-week-one">Your First Week After Launch</h2>
<p>Day one: verify analytics, test all forms, and confirm search indexing. Day two: announce on personal networks with specific asks—feedback, referrals, introductions. Day three: publish first blog or resource article. Day four: reach out to five potential customers directly. Day five: review metrics and fix anything broken. Momentum matters more than perfection in early weeks.</p>\n`,
  'future-of-business-growth.html': `<h2 id="founder-mindset">The Founder Mindset for Digital Growth</h2>
<p>Leaders who thrive digitally treat experimentation as core operations—not marketing side projects. They allocate time weekly for learning new tools, reviewing competitor moves, and testing one new growth hypothesis. This rhythm compounds into advantages competitors cannot shortcut with occasional campaigns.</p>\n`,
  'generate-leads-through-website.html': `<h2 id="lead-magnet-ideas">Lead Magnet Ideas That Convert</h2>
<p>Effective lead magnets solve one specific problem completely: a website audit checklist for local businesses, a branding questionnaire for startups, an SEO keyword template for service companies. Specificity beats generic "ultimate guides" that try to cover everything and deliver little.</p>\n`,
  'seo-for-small-businesses.html': `<h2 id="local-seo-quick-wins">Local SEO Quick Wins This Month</h2>
<p>Update Google Business Profile photos, respond to every review, add Q&A entries for common customer questions, and publish one location-focused blog post. These four actions often produce visible ranking movement within 30 days for businesses previously neglecting local presence.</p>\n`,
  'social-media-business-growth.html': `<h2 id="social-analytics-review">Monthly Social Analytics Review</h2>
<p>Each month, export top-performing posts and analyze patterns: format, topic, posting time, and CTA type. Replicate winners deliberately rather than hoping random posts occasionally perform. Social growth accelerates when creativity follows data-informed patterns.</p>\n`,
  'strong-brand-identity.html': `<h2 id="brand-identity-workshop">Run a Brand Identity Workshop</h2>
<p>Gather key stakeholders for a two-hour session: define audience personas, list competitor visual traits to avoid, and collect words that describe desired brand perception. Workshop outputs become briefs that designers translate into identity systems—far more effective than vague requests for "something modern."</p>\n`,
  'user-experience-matters.html': `<h2 id="ux-quick-test">The Five-Minute UX Test</h2>
<p>Ask someone unfamiliar with your site to complete your primary task while you observe silently. Note where they hesitate, misclick, or ask questions. Five minutes of observation often reveals UX problems analytics cannot quantify—confusion, not just abandonment.</p>\n`,
  'website-mistakes-costing-customers.html': `<h2 id="priority-fix-matrix">Priority Fix Matrix</h2>
<p>Rank issues by impact and effort: high-impact, low-effort fixes ship first—broken forms, slow hero images, missing mobile menus. High-impact, high-effort projects—full redesigns—follow once quick wins restore baseline performance. This matrix prevents teams from debating aesthetics while conversions leak through technical gaps.</p>\n`,
  'website-speed-optimization.html': `<h2 id="speed-monitoring">Ongoing Speed Monitoring</h2>
<p>Set monthly PageSpeed alerts in Search Console. Performance degrades gradually as new content, plugins, and integrations accumulate. Proactive monitoring catches regressions before customers notice—and before rankings slip silently over weeks of gradual slowdown.</p>\n`,
};

function insertBeforeLastP(content, html) {
  const lastP = content.lastIndexOf('<p>');
  return lastP > 0 ? content.slice(0, lastP) + html + content.slice(lastP) : content + html;
}

Object.entries(uniqueEndings).forEach(([file, html]) => {
  const fp = path.join(dir, file);
  let c = fs.readFileSync(fp, 'utf8');
  const marker = html.match(/id="([^"]+)"/)[1];
  if (!c.includes(marker)) {
    c = insertBeforeLastP(c, html);
    fs.writeFileSync(fp, c);
    console.log(file, c.split(/\s+/).filter(Boolean).length, 'words');
  }
});
