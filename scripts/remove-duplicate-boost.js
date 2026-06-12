const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'blog-content');
const start = '<h2 id="practical-next-steps">';
fs.readdirSync(dir).forEach((f) => {
  if (!f.endsWith('.html')) return;
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, 'utf8');
  const idx = c.indexOf(start);
  if (idx === -1) return;
  const endIdx = c.indexOf('</p>', c.lastIndexOf('Celestial Studios works as an extension'));
  if (endIdx !== -1) {
    c = c.slice(0, idx) + c.slice(endIdx + 4);
    fs.writeFileSync(fp, c);
    console.log('Cleaned', f);
  }
});
