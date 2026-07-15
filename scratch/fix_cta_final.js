const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Find and remove the CTA from inside the footer
const footerTag = c.indexOf('<footer');
const footerEnd = c.indexOf('</footer>') + 9;
const footerContent = c.substring(footerTag, footerEnd);

// Extract just the CTA inner card HTML from inside footer
const ctaMarker = '<!-- CTA Banner — pulled up so its center sits at footer top edge -->';
const ctaWrapStart = footerContent.indexOf(ctaMarker);
const ctaWrapEnd = footerContent.indexOf('<!-- Footer Grid -->');

if (ctaWrapStart === -1 || ctaWrapEnd === -1) {
    console.error('Cannot find CTA inside footer. Markers:', ctaWrapStart, ctaWrapEnd);
    // Try alternate
    console.log('Footer start:', footerContent.substring(0, 300));
    process.exit(1);
}

// The actual CTA card inner div
const ctaInside = footerContent.substring(ctaWrapStart, ctaWrapEnd);
// Extract just the rounded card div
const cardStart = ctaInside.indexOf('<div class="relative w-full rounded-[20px]');
const cardEnd = ctaInside.lastIndexOf('</div>') + 6; // close the card
const ctaCard = ctaInside.substring(cardStart, cardEnd);

// Build the new clean CTA block (OUTSIDE footer, BEFORE it)
const newCTABlock = `
    <!-- ============================================ -->
    <!-- CTA BANNER — straddles page/footer boundary -->
    <!-- ============================================ -->
    <div class="w-full px-8 md:px-16" style="position: relative; z-index: 20; margin-bottom: -90px;">
        <div class="max-w-[1320px] mx-auto">
            ${ctaCard}
        </div>
    </div>

`;

// Clean footer — remove CTA from inside, restore padding-top
const cleanFooter = footerContent
    .substring(0, ctaWrapStart - 9) // remove the CTA wrapper
    + footerContent.substring(ctaWrapEnd);

// Replace footer class to have proper padding for the overlap
const fixedFooter = cleanFooter.replace(
    /class="w-full bg-\[#f3f4f0\] pt-\[\d+px\] pb-0 relative z-10"/,
    'class="w-full bg-[#f3f4f0] pb-0 relative z-10" style="padding-top: 90px;"'
).replace(
    /class="w-full bg-\[#f3f4f0\] pt-\[0\] pb-0 relative z-10"/,
    'class="w-full bg-[#f3f4f0] pb-0 relative z-10" style="padding-top: 90px;"'
);

// Rebuild the full HTML
c = c.substring(0, footerTag) + newCTABlock + fixedFooter + c.substring(footerEnd);

fs.writeFileSync('index.html', c);

// Verify
const newC = fs.readFileSync('index.html', 'utf-8');
const ctaPos = newC.indexOf('margin-bottom: -90px');
const footerPos = newC.indexOf('<footer');
console.log('CTA before footer:', ctaPos < footerPos, '| CTA at:', ctaPos, '| Footer at:', footerPos);
console.log('Footer padding-top 90px:', newC.includes('padding-top: 90px'));
