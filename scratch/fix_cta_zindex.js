const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// ── 1. Remove any previous CTA attempts ──
// Remove spacer+CTA block or CTA BANNER block that may exist before footer marker
const footerMarker = '    <!-- Footer -->';
const footerIdx = c.indexOf(footerMarker);

// Look for anything inserted between blog section and footer
const blogEnd = c.indexOf('</section>', c.indexOf('Our Real Estate Updates'));
const blogEndFull = c.indexOf('</section>', blogEnd) + 10; // actual closing tag

// Remove everything between blog section end and footer marker
// (any stray spacers, CTA wrappers, etc.)
const beforeBlog = c.substring(0, blogEndFull);
const fromFooter = c.substring(footerIdx);

// ── 2. Build the clean structure ──
const ctaCardStart = fromFooter.indexOf('<div class="relative w-full rounded-[20px]');
const ctaCardEnd   = fromFooter.indexOf('</div>\n\n        </div>\n\n    <!-- Footer');
if (ctaCardStart === -1) {
    console.error('Cannot find CTA card in footer area');
    process.exit(1);
}
const ctaCard = fromFooter.substring(ctaCardStart, ctaCardEnd + 6).trim();
console.log('CTA card found, length:', ctaCard.length);

// ── 3. Build the new injection block ──
const injection = `

    <!-- White spacer: top half of CTA sits on white page bg -->
    <div style="height: 95px; background: #ffffff; position: relative; z-index: 1;"></div>

    <!-- CTA: z-index layers it above both the spacer and the footer -->
    <div style="position: relative; z-index: 20; margin-top: -95px; margin-bottom: -95px; padding: 0 2rem;">
        <div style="max-width: 1320px; margin: 0 auto;">
            ${ctaCard}
        </div>
    </div>

`;

// ── 4. Clean footer — remove old CTA from inside it, fix padding ──
let footerOnly = fromFooter;
// Remove old CTA wrapper inside footer if present
const oldCTAinFooter = footerOnly.indexOf('<!-- CTA Banner');
if (oldCTAinFooter !== -1) {
    const afterOldCTA = footerOnly.indexOf('<!-- Footer Grid -->');
    footerOnly = footerOnly.substring(0, oldCTAinFooter - 9) + footerOnly.substring(afterOldCTA);
}
// Fix footer padding-top to 95px for the CTA bottom half
footerOnly = footerOnly
    .replace(/style="padding-top:\s*\d+px;"/, 'style="padding-top: 95px;"')
    .replace(/pt-\[0\]/, 'pt-0')
    .replace('pt-0 pb-0 relative z-10"', 'pb-0 relative z-10" style="padding-top: 95px;"');

// Also fix stray wrapper div if present from previous fix_cta_final
footerOnly = footerOnly.replace('    </div><!-- end CTA+FOOTER wrapper -->\n\n', '');
footerOnly = footerOnly.replace('    </div><!-- end CTA+FOOTER wrapper -->\r\n\r\n', '');

// ── 5. Stitch together ──
c = beforeBlog + injection + footerOnly;

fs.writeFileSync('index.html', c);

// Verify
const n = fs.readFileSync('index.html', 'utf-8');
console.log('Structure check:');
console.log('  White spacer:', n.includes('top half of CTA sits on white'));
console.log('  CTA z-index 20:', n.includes('z-index: 20'));
console.log('  margin-top -95px:', n.includes('margin-top: -95px'));
console.log('  margin-bottom -95px:', n.includes('margin-bottom: -95px'));
console.log('  Footer after CTA:', n.indexOf('<footer') > n.indexOf('z-index: 20'));
