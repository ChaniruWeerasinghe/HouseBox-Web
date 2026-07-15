const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

const overlay = '\n                        <!-- Expanding overlay -->\n                        <div class="absolute inset-0 pointer-events-none">\n                            <div class="w-full h-full bg-[#0c2d3a]/60 origin-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>\n                        </div>';

// Find and patch all 3 blog card images - they all have class "...group-hover:scale-105"
// inside a div with h-[260px]
const targets = [
    'alt="Blog 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">',
    'alt="Blog 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">',
    'alt="Blog 3" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">'
];

let count = 0;
targets.forEach(target => {
    if (c.includes(target)) {
        c = c.replace(target, target + overlay);
        count++;
    } else {
        console.warn('Could not find:', target.substring(0, 50));
    }
});

fs.writeFileSync('index.html', c);
console.log('Overlays injected:', count);
