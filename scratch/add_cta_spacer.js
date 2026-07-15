const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Insert a 90px spacer between the blog section and the CTA
// The CTA banner comment is the insertion point
const ctaComment = '    <!-- ============================================ -->\n    <!-- CTA BANNER — straddles page/footer boundary -->';

if (!c.includes(ctaComment)) {
    console.error('CTA comment not found!');
    process.exit(1);
}

const spacer = `    <!-- Spacer: top half of CTA floats on page bg -->
    <div style="height: 90px; background: #ffffff;"></div>\n\n`;

c = c.replace(ctaComment, spacer + ctaComment);

fs.writeFileSync('index.html', c);
console.log('Spacer added. Structure:');
console.log('  Blog section → 90px white spacer → CTA (margin-bottom:-90px) → Footer (pt:90px)');
