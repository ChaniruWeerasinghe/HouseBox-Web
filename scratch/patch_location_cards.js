const fs = require('fs');

const cityNames = ['Chicago', 'Los Angeles', 'New York', 'Miami', 'Seattle', 'Boston'];
const counts = [10, 12, 15, 8, 11, 9];

const images = [
    "hero-main-1.webp",
    "hero-main-2.webp",
    "hero-main-3.webp",
    "hero-main-4.webp",
    "about-tall.webp",
    "about-bottom.webp"
];

const altImages = [
    "hero-main-1.webp,hero-main-2.webp,hero-main-3.webp",
    "about-tall.webp,about-bottom.webp,hero-left-bg.webp",
    "hero-main-4.webp,about-top.webp,hero-main.webp",
    "hero-main-2.webp,hero-left-bg.webp,about-tall.webp",
    "about-bottom.webp,hero-main-3.webp,hero-main-1.webp",
    "hero-main.webp,hero-main-4.webp,about-top.webp"
];

const swapGroups = ['A', 'B', 'B', 'B', 'A', 'B'];

let content = fs.readFileSync('index.html', 'utf-8');

for (let i = 0; i < 6; i++) {
    const cardNum = i + 1;
    const dotsHTML = i === 0 ? `
                    <!-- Dot Indicators -->
                    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
                        <div class="w-2 h-2 rounded-full bg-white opacity-90"></div>
                        <div class="w-2 h-2 rounded-full bg-primary opacity-100"></div>
                    </div>
                    <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-30"></div>` : '';

    const newCard = `<!-- Location Card ${cardNum} -->
                <div class="location-reveal relative w-full h-[320px] rounded-[12px] overflow-hidden group cursor-pointer shadow-sm bg-gray-200" style="transition-delay: ${i * 150}ms;" data-swap-group="${swapGroups[i]}" data-images="${altImages[i]}" data-current-index="0">
                    <!-- Base image -->
                    <img src="assets/images/home/${images[i]}" alt="Location View" class="img-back w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-110">
                    <!-- Expanding dark overlay: scale from center point to full card -->
                    <div class="absolute inset-0 z-10 pointer-events-none">
                        <div class="w-full h-full bg-[#0c2d3a]/65 origin-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
                    </div>
                    <!-- Overlay content — fades in after overlay expands -->
                    <div class="absolute inset-0 z-20 flex flex-col justify-between p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-200 pointer-events-none">
                        <!-- Count badge top right -->
                        <div class="flex justify-end">
                            <span class="w-10 h-10 rounded-full bg-white text-gray-900 font-bold text-[15px] flex items-center justify-center shadow">${counts[i]}</span>
                        </div>
                        <!-- City name bottom left -->
                        <div class="flex items-end justify-start">
                            <div class="bg-white text-gray-900 font-bold text-[16px] px-5 py-3 rounded-[6px] shadow">${cityNames[i]}</div>
                        </div>
                    </div>
                    ${dotsHTML}
                </div>`;

    // Find and replace the old card
    const oldCardStart = content.indexOf(`<!-- Location Card ${cardNum} -->`);
    if (oldCardStart === -1) {
        console.error(`Could not find Location Card ${cardNum}`);
        continue;
    }

    // Find the end: next card comment OR closing </div> of the grid row
    let oldCardEnd = content.indexOf(`<!-- Location Card ${cardNum + 1} -->`, oldCardStart);
    if (oldCardEnd === -1) {
        // Last card in a row — find the closing </div></div> after it
        oldCardEnd = content.indexOf('</div>\r\n                </div>', oldCardStart);
        if (oldCardEnd === -1) {
            oldCardEnd = content.indexOf('</div>\n                </div>', oldCardStart);
        }
        if (oldCardEnd !== -1) {
            oldCardEnd += 6; // include the closing </div> of the card
        }
    }

    if (oldCardEnd === -1) {
        console.error(`Could not find end of Location Card ${cardNum}`);
        continue;
    }

    const before = content.substring(0, oldCardStart);
    const after = content.substring(oldCardEnd);
    content = before + newCard + '\n                ' + after;
    console.log(`Patched Location Card ${cardNum}`);
}

fs.writeFileSync('index.html', content);
console.log('Done patching all location cards.');
