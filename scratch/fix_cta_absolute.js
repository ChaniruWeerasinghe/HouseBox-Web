const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// ─────────────────────────────────────────────
// 1. Extract the CTA card inner HTML
// ─────────────────────────────────────────────
const ctaCardStart = c.indexOf('<div class="relative w-full rounded-[20px]');
const ctaCardClose = c.indexOf('</div>\n\n    </div>\n\n', ctaCardStart) + 6;
const ctaCard = c.substring(ctaCardStart, ctaCardClose).trimEnd();

// ─────────────────────────────────────────────
// 2. Remove the entire old CTA wrapper block
// ─────────────────────────────────────────────
// The spacer + CTA comment block before footer
const spacerStart = c.indexOf('    <!-- Spacer: top half of CTA floats on page bg -->');
const footerStart = c.indexOf('    <!-- Footer -->');

if (spacerStart === -1 || footerStart === -1) {
    // Try the CTA BANNER comment
    const ctaBannerStart = c.indexOf('    <!-- ============================================ -->\n    <!-- CTA BANNER');
    const footerStart2 = c.indexOf('    <!-- Footer -->');
    if (ctaBannerStart !== -1 && footerStart2 !== -1) {
        c = c.substring(0, ctaBannerStart) + c.substring(footerStart2);
        console.log('Removed CTA block (no spacer found)');
    } else {
        console.error('Cannot find CTA block to remove!');
        console.log('spacerStart:', spacerStart, 'footerStart:', footerStart);
        console.log('ctaBannerStart:', ctaBannerStart, 'footerStart2:', footerStart2);
        process.exit(1);
    }
} else {
    c = c.substring(0, spacerStart) + c.substring(footerStart);
    console.log('Removed spacer + CTA block');
}

// ─────────────────────────────────────────────
// 3. Add pb-[90px] to the blog section
//    (so its white background shows for top half of CTA)
// ─────────────────────────────────────────────
c = c.replace(
    'class="w-full bg-white py-24 relative font-sans"',
    'class="w-full bg-white py-24 pb-[110px] relative font-sans"'
);

// ─────────────────────────────────────────────
// 4. Wrap footer + inject absolutely-positioned CTA
// ─────────────────────────────────────────────
const footerMarker = '    <!-- Footer -->';
const footerIdx = c.indexOf(footerMarker);

const newBlock = `    <!-- ============================================ -->
    <!-- CTA + FOOTER WRAPPER -->
    <!-- ============================================ -->
    <div class="relative">

        <!-- CTA Banner: absolutely centered ON the footer top boundary -->
        <div class="absolute top-0 left-0 right-0 z-30 px-8 md:px-16" style="transform: translateY(-50%);">
            <div class="max-w-[1320px] mx-auto">
                ${ctaCard}
            </div>
        </div>

    <!-- Footer -->\n`;

c = c.substring(0, footerIdx) + newBlock + c.substring(footerIdx + footerMarker.length);

// ─────────────────────────────────────────────
// 5. Close the wrapper div BEFORE the scroll-to-top button
// ─────────────────────────────────────────────
c = c.replace(
    '    <!-- ============================================ -->\r\n    <!-- SCROLL TO TOP BUTTON -->',
    '    </div><!-- end CTA+FOOTER wrapper -->\r\n\r\n    <!-- ============================================ -->\r\n    <!-- SCROLL TO TOP BUTTON -->'
);
c = c.replace(
    '    <!-- ============================================ -->\n    <!-- SCROLL TO TOP BUTTON -->',
    '    </div><!-- end CTA+FOOTER wrapper -->\n\n    <!-- ============================================ -->\n    <!-- SCROLL TO TOP BUTTON -->'
);

// ─────────────────────────────────────────────
// 6. Fix footer padding-top so content clears the CTA
// ─────────────────────────────────────────────
c = c.replace(/style="padding-top: 90px;"/, 'style="padding-top: 110px;"');
c = c.replace(/pt-\[\d+px\]/, 'pt-0');

fs.writeFileSync('index.html', c);
console.log('Done! CTA is now absolutely positioned at the footer top boundary.');
console.log('Footer found:', c.includes('<footer'));
console.log('CTA card found:', c.includes('Find Your Dream Home'));
