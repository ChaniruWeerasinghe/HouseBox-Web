const fs = require('fs');

const images = [
    "hero-main-1.webp",
    "hero-main-2.webp",
    "hero-main-3.webp",
    "hero-main-4.webp",
    "about-tall.webp",
    "about-bottom.webp"
];

let cardsHTML = '';

images.forEach((img, index) => {
    let dotsHTML = '';
    // Add dots only to the first image based on the screenshot
    if (index === 0) {
        dotsHTML = `
                            <!-- Dot Indicators -->
                            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                                <div class="w-2 h-2 rounded-full bg-white opacity-90"></div>
                                <div class="w-2 h-2 rounded-full bg-primary opacity-100"></div>
                            </div>
                            <!-- Subtle gradient overlay at bottom for dots -->
                            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        `;
    }

    // Determine col-span based on index (0 to 5)
    let colSpan = '';
    if (index === 0) colSpan = 'col-span-2';
    else if (index === 1) colSpan = 'col-span-3';
    else if (index === 2) colSpan = 'col-span-4';
    else if (index === 3) colSpan = 'col-span-4';
    else if (index === 4) colSpan = 'col-span-3';
    else if (index === 5) colSpan = 'col-span-2';

    // Determine swap group
    let swapGroup = (index === 0 || index === 4) ? 'A' : 'B';

    // Pick an alternate images array
    const altImages = [
        "hero-main-1.webp,hero-main-2.webp,hero-main-3.webp",
        "about-tall.webp,about-bottom.webp,hero-left-bg.webp",
        "hero-main-4.webp,about-top.webp,hero-main.webp",
        "hero-main-2.webp,hero-left-bg.webp,about-tall.webp",
        "about-bottom.webp,hero-main-3.webp,hero-main-1.webp",
        "hero-main.webp,hero-main-4.webp,about-top.webp"
    ];

    cardsHTML += `
                <!-- Location Card ${index + 1} -->
                <div class="location-reveal relative w-full h-[320px] rounded-[8px] overflow-hidden group cursor-pointer shadow-sm bg-gray-200" style="transition-delay: ${index * 150}ms;" data-swap-group="${swapGroup}" data-images="${altImages[index]}" data-current-index="0">
                    <img src="assets/images/home/${img}" alt="Location View" class="img-back w-full h-full object-cover absolute inset-0 z-0">
                    <img src="assets/images/home/${img}" alt="Location View" class="img-front w-full h-full object-cover absolute inset-0 z-10 transition-all duration-700 group-hover:scale-105">
                    ${dotsHTML}
                </div>
`;
});

// Split the cards into two rows
const row1HTML = cardsHTML.split('<!-- Location Card 4 -->')[0];
const row2HTML = '<!-- Location Card 4 -->' + cardsHTML.split('<!-- Location Card 4 -->')[1];

const sectionHTML = `
    <!-- ============================================ -->
    <!-- EXPLORE LOCATIONS SECTION -->
    <!-- ============================================ -->
    <section class="w-full bg-white pt-24 pb-28 px-12 relative overflow-hidden">
        <div class="max-w-[1400px] mx-auto w-full flex flex-col items-center gap-10">
            
            <!-- Section Header -->
            <div class="w-full flex flex-col items-center text-center gap-4">
                <!-- Pill -->
                <span class="inline-block bg-[#e8efec] text-[#0f4a47] font-medium px-4 py-1.5 rounded-sm text-[14px]">
                    Property Location
                </span>
                <!-- Title -->
                <h2 class="text-[44px] leading-tight font-bold text-gray-900 tracking-tight">
                    Explore Our Property Location
                </h2>
            </div>

            <!-- Locations Grid -->
            <div class="w-full relative mt-4 flex flex-col gap-6">
                <!-- Row 1 (2 : 2.8 : 3.6) -->
                <div class="w-full grid gap-6" style="grid-template-columns: 2fr 2.8fr 3.6fr;">
${row1HTML}
                </div>
                <!-- Row 2 (3.6 : 2.8 : 2) -->
                <div class="w-full grid gap-6" style="grid-template-columns: 3.6fr 2.8fr 2fr;">
${row2HTML}
                </div>
                
            </div>
            
        </div>
    </section>
`;

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '    <!-- ============================================ -->\n    <!-- INJECTION POINT -->';
if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, sectionHTML + '\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Explore Locations section into index.html');
} else {
    console.error('Could not find insert target.');
}
