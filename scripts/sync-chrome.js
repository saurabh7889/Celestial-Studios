const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const navbar = fs.readFileSync(path.join(root, 'assets/partials/navbar.html'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'assets/partials/footer.html'), 'utf8');
const novaWidget = fs.readFileSync(path.join(root, 'assets/partials/nova-widget.html'), 'utf8').replace(/ASSET_PREFIX/g, '');

const mainPages = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'industries.html',
  'blog.html',
  'privacy-policy.html',
  'terms-and-conditions.html',
  'cookie-policy.html',
  'disclaimer.html',
  'refund-policy.html',
  'contact-information.html',
];

const novaScripts = `<script src="assets/js/nova-config.js" defer></script>
<script src="assets/js/chat.js" defer></script>`;

function injectFooterCss(html) {
  if (html.includes('assets/css/footer.css')) return html;
  return html.replace(
    '</head>',
    '  <link rel="stylesheet" href="assets/css/footer.css">\n</head>'
  );
}

function replaceChrome(html) {
  const headerStart = html.indexOf('<header id="main-header"');
  const headerEnd = html.indexOf('</header>', headerStart);
  if (headerStart === -1 || headerEnd === -1) return null;

  const scrollScriptEnd = html.indexOf('});</script>', headerEnd);
  const afterHeader =
    scrollScriptEnd !== -1 ? scrollScriptEnd + '});</script>'.length : headerEnd + '</header>'.length;

  const footerStart = html.indexOf('<footer');
  const footerEnd = html.indexOf('</footer>', footerStart);
  if (footerStart === -1 || footerEnd === -1) return null;

  return (
    html.slice(0, headerStart) +
    navbar +
    html.slice(afterHeader, footerStart) +
    footer +
    html.slice(footerEnd + '</footer>'.length)
  );
}

function replaceNovaWidget(html) {
  // Remove Astro island runtime scripts
  html = html.replace(/<style>\s*astro-island[\s\S]*?<\/style>\s*/g, '');
  html = html.replace(/<script>\(\(\) => \{ var l = \(n, t\)[\s\S]*?<\/script>\s*/g, '');
  html = html.replace(/<script>\(\(\) => \{ var A = Object\.defineProperty[\s\S]*?<\/script>\s*/g, '');

  const astroStart = html.indexOf('<astro-island');
  if (astroStart !== -1) {
    const astroEnd = html.indexOf('</astro-island>', astroStart);
    if (astroEnd !== -1) {
      html = html.slice(0, astroStart) + novaWidget + html.slice(astroEnd + '</astro-island>'.length);
    }
  } else if (!html.includes('id="nova-widget"')) {
    const bodyClose = html.lastIndexOf('</body>');
    if (bodyClose !== -1) {
      html = html.slice(0, bodyClose) + novaWidget + '\n' + html.slice(bodyClose);
    }
  }

  // Normalize script tags — remove duplicate/old chat.js, add nova-config + chat.js
  html = html.replace(/<script src="assets\/js\/chat\.js" defer><\/script>\s*/g, '');
  html = html.replace(/<script src="assets\/js\/nova-config\.js" defer><\/script>\s*/g, '');

  const bodyClose = html.lastIndexOf('</body>');
  if (bodyClose !== -1 && !html.includes('nova-config.js')) {
    html = html.slice(0, bodyClose) + novaScripts + '\n' + html.slice(bodyClose);
  }

  return html;
}

for (const page of mainPages) {
  const filePath = path.join(root, page);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing page: ${page}`);
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  html = injectFooterCss(html);

  const updated = replaceChrome(html);
  if (updated) html = updated;

  html = replaceNovaWidget(html);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Synced ${page}`);
}

console.log('Chrome and Nova sync complete.');
