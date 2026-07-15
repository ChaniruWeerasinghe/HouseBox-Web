const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Remove the dark expanding overlay blocks injected into blog card images
const overlayBlock = `
                        <!-- Expanding overlay -->
                        <div class="absolute inset-0 pointer-events-none">
                            <div class="w-full h-full bg-[#0c2d3a]/60 origin-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                        </div>`;

const before = (c.match(/Expanding overlay/g) || []).length;
c = c.split(overlayBlock).join('');
const after = (c.match(/Expanding overlay/g) || []).length;

fs.writeFileSync('index.html', c);
console.log('Removed overlays:', before - after, '| Remaining:', after);
