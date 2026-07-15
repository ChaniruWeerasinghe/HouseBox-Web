const fs = require('fs');

const properties = [
    { title: "Luxury Suite Villa", agent: "Sheldon Jackson", image: "hero-main.webp", location: "Los Angeles, CA" },
    { title: "Apartment Diamond", agent: "Alex Roberts", image: "hero-main-1.webp", location: "Miami, FL" },
    { title: "Apartment Angles", agent: "Alesa Healy", image: "hero-main-2.webp", location: "New York, NY" },
    { title: "Modern Glass House", agent: "Sarah Connor", image: "hero-main-3.webp", location: "Austin, TX" },
    { title: "Cozy Wood Cabin", agent: "Michael Smith", image: "hero-main-4.webp", location: "Denver, CO" },
    { title: "Beachfront Villa", agent: "David Chen", image: "about-tall.webp", location: "San Diego, CA" },
    { title: "Downtown Penthouse", agent: "Jessica Alba", image: "about-top.webp", location: "Chicago, IL" },
    { title: "Suburban Family Home", agent: "Tom Hanks", image: "about-bottom.webp", location: "Seattle, WA" },
    { title: "Countryside Estate", agent: "Emily Blunt", image: "hero-left-bg.webp", location: "San Francisco, CA" },
];

let rowsHTML = '';

properties.forEach((prop, index) => {
    rowsHTML += `
                <!-- Property Row ${index + 1} -->
                <div class="w-full grid grid-cols-12 gap-6 items-stretch h-[320px]">
                    
                    <!-- Merged Card (Image + Info) -->
                    <div class="col-span-9 flex bg-white rounded-[16px] shadow-sm border border-gray-100 overflow-hidden group">
                        
                        <!-- Left: Image Slider -->
                        <div class="relative w-[55%] h-full bg-gray-200 overflow-hidden">
                            <img src="assets/images/home/${prop.image}" alt="Property Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            
                            <!-- Tags -->
                            <div class="absolute top-5 left-5 flex items-center gap-2">
                                <span class="bg-white text-gray-900 font-semibold px-4 py-1.5 rounded-sm text-[13px] shadow-sm">Featured</span>
                                <span class="bg-white text-gray-900 font-semibold px-4 py-1.5 rounded-sm text-[13px] shadow-sm">For Sale</span>
                            </div>
                            
                            <!-- Dot Indicators -->
                            <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                                <div class="w-2 h-2 rounded-full bg-white opacity-100"></div>
                                <div class="w-2 h-2 rounded-full bg-[#0f4a47] opacity-100"></div>
                                <div class="w-2 h-2 rounded-full bg-white opacity-80"></div>
                            </div>
                            
                            <!-- Subtle gradient overlay at bottom for dots -->
                            <div class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        <!-- Right: Info Card -->
                        <div class="w-[45%] h-full p-8 flex flex-col justify-between">
                            <div class="flex flex-col items-start gap-4">
                                <h3 class="text-[26px] font-bold text-gray-900 tracking-tight leading-tight">${prop.title}</h3>
                                <div class="flex items-center gap-1.5 text-gray-600">
                                    <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <span class="text-[15px]">Los Angeles City, CA, USA</span>
                                </div>
                                
                                <!-- Stats -->
                                <div class="flex items-center gap-3 mt-1 w-full justify-start pr-2">
                                    <div class="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-gray-600 text-[14px]">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                        x12
                                    </div>
                                    <div class="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-gray-600 text-[14px]">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        x16
                                    </div>
                                    <div class="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 text-gray-600 text-[14px]">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                        1200 sq
                                    </div>
                                </div>
                            </div>

                            <div class="w-full">
                                <!-- Divider line -->
                                <div class="w-full h-px bg-gray-100 my-5"></div>
                                
                                <!-- Agent & Price -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <img src="assets/images/home/clientdp.webp" alt="Agent" class="w-11 h-11 rounded-full object-cover">
                                        <span class="font-medium text-gray-900 text-[15px]">${prop.agent}</span>
                                    </div>
                                    <div class="bg-[#0f4a47] text-white font-semibold text-[16px] px-5 py-2.5 rounded-[6px]">
                                        $820,000
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Map -->
                    <div class="col-span-3 relative w-full h-full rounded-[16px] overflow-hidden border border-gray-100 shadow-sm bg-gray-100">
                        <iframe 
                            src="https://maps.google.com/maps?q=${encodeURIComponent(prop.location)}&t=&z=11&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
`;
});

const sectionHTML = `
    <!-- ============================================ -->
    <!-- FEATURED PROPERTIES SECTION -->
    <!-- ============================================ -->
    <section class="w-full bg-[#f2f4f3] pt-24 pb-28 px-12 relative overflow-hidden">
        <div class="max-w-[1400px] mx-auto w-full flex flex-col gap-10">
            
            <!-- Section Header -->
            <div class="w-full flex items-end justify-between">
                <div class="flex flex-col items-start gap-4">
                    <!-- Pill -->
                    <span class="inline-block bg-[#dfe6e4] text-[#0f4a47] font-medium px-4 py-1.5 rounded-sm text-[14px]">
                        Featured Properties
                    </span>
                    <!-- Title -->
                    <h2 class="text-[44px] leading-tight font-bold text-gray-900 tracking-tight">
                        Our Featured Properties
                    </h2>
                </div>
                <!-- Button -->
                <a href="#" class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-yellow-500 text-black font-semibold text-[15px] px-8 py-3.5 rounded-md transition-transform hover:-translate-y-px">
                    See All Properties
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 19L19 5M19 5v10M19 5H9"></path></svg>
                </a>
            </div>

            <!-- Filter Tabs -->
            <div class="w-full flex items-center justify-start mt-2">
                <div class="flex items-center gap-4">
                    <!-- Active Tab -->
                    <button class="bg-[#0f4a47] text-white px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        For Sale
                    </button>
                    <!-- Inactive Tabs -->
                    <button class="bg-[#dfe6e4] text-gray-700 hover:bg-gray-300 px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Villas
                    </button>
                    <button class="bg-[#dfe6e4] text-gray-700 hover:bg-gray-300 px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        Apartments
                    </button>
                    <button class="bg-[#dfe6e4] text-gray-700 hover:bg-gray-300 px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        Houses
                    </button>
                    <button class="bg-[#dfe6e4] text-gray-700 hover:bg-gray-300 px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        Condos
                    </button>
                    <button class="bg-[#dfe6e4] text-gray-700 hover:bg-gray-300 px-6 py-2.5 rounded-sm font-medium text-[15px] flex items-center gap-2 transition-colors">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        Retail
                    </button>
                </div>
            </div>

            <!-- Properties List Grid Container -->
            <div class="w-full flex flex-col gap-8 mt-6">
${rowsHTML}
            </div>
            
        </div>
    </section>
`;

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '    <!-- Search Overlay -->';
if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, sectionHTML + '\\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Featured Properties section into index.html');
} else {
    console.error('Could not find insert target.');
}
