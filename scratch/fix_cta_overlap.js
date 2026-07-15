const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Fix 1: Reduce dark overlay opacity so CTA is brighter
c = c.replace(
    'style="background: rgba(30,32,10,0.72);"',
    'style="background: rgba(30,32,10,0.42);"'
);

// Fix 2: Set margin-bottom so CTA center = footer top
// CTA card has py-14 (56px*2=112px) + content ~60px ≈ 172px total. Half = ~86px
// Use -86px margin-bottom so footer top cuts through CTA center
c = c.replace(
    'style="margin-bottom: -90px;"',
    'style="margin-bottom: -86px;"'
);

// Fix 3: Adjust footer padding-top to exactly half the CTA height + breathing room
// CTA ≈ 172px, half = 86px. Footer should start 86px below CTA top = 86px padding
c = c.replace(
    'class="w-full bg-[#f3f4f0] pt-[130px] pb-0 relative z-10"',
    'class="w-full bg-[#f3f4f0] pt-[100px] pb-0 relative z-10"'
);

fs.writeFileSync('index.html', c);
console.log('CTA brightness and overlap fixed.');
