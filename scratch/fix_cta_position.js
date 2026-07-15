const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Step 1: Find and extract the CTA block from its current position
const ctaStart = c.indexOf('    <!-- CTA Banner (overlaps footer via negative margin) -->');
const ctaEnd = c.indexOf('    <!-- Footer -->');

if (ctaStart === -1 || ctaEnd === -1) {
    console.error('Could not find CTA or Footer markers');
    console.log('ctaStart:', ctaStart, 'ctaEnd:', ctaEnd);
    process.exit(1);
}

const ctaBlock = c.substring(ctaStart, ctaEnd);
console.log('CTA block length:', ctaBlock.length);
console.log('CTA preview:', ctaBlock.substring(0, 100));

// Step 2: Remove the CTA from its current position
c = c.substring(0, ctaStart) + c.substring(ctaEnd);

// Step 3: Find the footer opening and inject CTA inside it, with negative top margin
// The footer starts with: <footer class="w-full bg-[#f3f4f0] ...
const footerOpen = c.indexOf('    <!-- Footer -->');
if (footerOpen === -1) {
    console.error('Could not find footer marker after removal');
    process.exit(1);
}

// Find the actual <footer> tag
const footerTag = c.indexOf('<footer', footerOpen);
// Find the end of the opening footer tag
const footerTagEnd = c.indexOf('>', footerTag) + 1;

// Build new CTA that lives inside footer with margin-top pulling it up
const ctaInner = ctaBlock
    .replace('    <!-- CTA Banner (overlaps footer via negative margin) -->', '')
    .replace('    <div class="w-full px-8 md:px-16 relative z-20" style="margin-bottom: -86px;">', '')
    .replace('    <div class="w-full px-8 md:px-16 relative z-20" style="margin-bottom: -90px;">', '')
    .replace('        <div class="max-w-[1320px] mx-auto">', '')
    .replace('        </div>\n    </div>\n', '');

// Replace footer opening to include the CTA inside with negative margin
const newFooterContent = c.substring(0, footerTagEnd) +
    `\n        <!-- CTA Banner — pulled up so its center sits at footer top edge -->\n        <div class="w-full px-8 md:px-16 relative z-20" style="margin-top: -90px; margin-bottom: 24px;">\n            <div class="max-w-[1320px] mx-auto">\n` +
    ctaInner.trim() +
    `\n            </div>\n        </div>\n` +
    c.substring(footerTagEnd);

c = newFooterContent;

// Step 4: Remove old footer pt override — footer now needs just small top padding for the CTA overlap
c = c.replace(
    'class="w-full bg-[#f3f4f0] pt-[90px] pb-0 relative z-10"',
    'class="w-full bg-[#f3f4f0] pt-[0] pb-0 relative z-10"'
);
c = c.replace(
    'class="w-full bg-[#f3f4f0] pt-[100px] pb-0 relative z-10"',
    'class="w-full bg-[#f3f4f0] pt-[0] pb-0 relative z-10"'
);

fs.writeFileSync('index.html', c);
console.log('Done. CTA moved inside footer with margin-top pull-up.');
