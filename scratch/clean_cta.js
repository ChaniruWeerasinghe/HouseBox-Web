const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Remove the concentric rings HTML block entirely
const ringsBlock = `
                <!-- Concentric rings decoration (right side) -->
                <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style="right: -20px;">
                    <div class="relative flex items-center justify-center" style="width: 380px; height: 380px;">
                        <div class="absolute rounded-full border border-white/10" style="width: 380px; height: 380px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 300px; height: 300px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 220px; height: 220px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 140px; height: 140px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 60px; height: 60px;"></div>
                    </div>
                </div>`;

const before = c.includes(ringsBlock);
c = c.split(ringsBlock).join('');
console.log('Rings removed:', before);

// Also remove the dark overlay — image already handles the look
c = c.replace(
    '<!-- Dark overlay for text readability -->\n                <div class="absolute inset-0 pointer-events-none" style="background: rgba(30,32,10,0.42);"></div>',
    ''
);

fs.writeFileSync('index.html', c);
console.log('Done. CTA now uses only the image, no overlays or rings.');
