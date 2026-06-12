const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const navbar = fs.readFileSync(path.join(root, 'assets/partials/navbar.html'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'assets/partials/footer.html'), 'utf8');

const pages = ['index.html', 'services.html', 'about.html', 'contact.html', 'industries.html', 'blog.html'];

for (const page of pages) {
  const filePath = path.join(root, page);
  let html = fs.readFileSync(filePath, 'utf8');

  const headerStart = html.indexOf('<header id="main-header"');
  const headerEnd = html.indexOf('</header>', headerStart);
  if (headerStart === -1 || headerEnd === -1) {
    console.error(`Could not find header in ${page}`);
    continue;
  }

  const scrollScriptEnd = html.indexOf('});</script>', headerEnd);
  const afterHeader = scrollScriptEnd !== -1
    ? scrollScriptEnd + '});</script>'.length
    : headerEnd + '</header>'.length;

  const footerStart = html.indexOf('<footer class="bg-black');
  const footerEnd = html.indexOf('</footer>', footerStart);
  if (footerStart === -1 || footerEnd === -1) {
    console.error(`Could not find footer in ${page}`);
    continue;
  }

  html = html.slice(0, headerStart) + navbar + html.slice(afterHeader, footerStart) + footer + html.slice(footerEnd + '</footer>'.length);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${page}`);
}
