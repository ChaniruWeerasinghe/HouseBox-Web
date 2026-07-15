const fs = require('fs');

const sectionHTML = `
    <!-- ============================================ -->
    <!-- OUR FEATURED ITEMS (PARALLAX) SECTION -->
    <!-- ============================================ -->
    <!-- Background container with bg-fixed for parallax -->
    <section class="w-full relative py-24 bg-fixed bg-center bg-cover bg-no-repeat" style="background-image: url('assets/images/home/hero-main.webp');">
        
        <!-- Dark Green Overlay -->
        <div class="absolute inset-0 bg-[#063330]/85 z-0 pointer-events-none"></div>

        <div class="max-w-[1600px] mx-auto w-full flex flex-col items-center relative z-10 px-8">
            
            <!-- Section Header -->
            <div class="w-full flex flex-col items-center text-center gap-4 mb-16">
                <!-- Pill -->
                <span class="inline-block bg-white/10 border border-white/20 text-white font-medium px-4 py-1.5 rounded-sm text-[14px] backdrop-blur-sm">
                    Our Best Featured Item
                </span>
                <!-- Title -->
                <h2 class="text-[44px] leading-tight font-bold text-white tracking-tight">
                    Our Featured Items
                </h2>
            </div>

            <!-- Slider Area -->
            <div class="w-full flex items-center justify-between gap-6 relative">
                
                <!-- Left Navigation Arrow -->
                <button class="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all z-20 group">
                    <svg class="w-6 h-6 text-gray-900 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
                </button>

                <!-- Central Cards Container -->
                <div class="flex-grow flex gap-6 h-[460px]">
                    
                    <!-- Left: House Image Card -->
                    <div class="w-[40%] h-full relative overflow-hidden rounded-[24px] shadow-2xl">
                        <img id="feat-img" src="assets/images/home/hero-left-bg-1.webp" alt="Property View" class="w-full h-full object-cover transition-opacity duration-300">
                    </div>

                    <!-- Right: Info Card -->
                    <div class="w-[60%] h-full bg-white p-10 flex flex-col justify-between rounded-[24px] shadow-2xl transition-opacity duration-300" id="feat-info-panel">
                        
                        <div class="flex flex-col items-start gap-4">
                            <!-- Badges -->
                            <div class="flex items-center gap-3">
                                <span id="feat-badge-1" class="bg-[#0f4a47] text-white font-semibold px-4 py-1.5 rounded-[4px] text-[13px]">Featured</span>
                                <span id="feat-badge-2" class="bg-yellow-400 text-gray-900 font-bold px-4 py-1.5 rounded-[4px] text-[13px]">For Rent</span>
                            </div>

                            <!-- Title -->
                            <h3 id="feat-title" class="text-[28px] font-bold text-gray-900 tracking-tight leading-tight mt-1">Rancho Vista Verde, Santos Barba</h3>
                            
                            <!-- Location -->
                            <div class="flex items-center gap-2 text-gray-600 font-medium">
                                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span id="feat-location" class="text-[16px]">742 Terrace, Springfield, IL 62704, USA</span>
                            </div>

                            <!-- Stats (Features) -->
                            <div class="flex items-center gap-3 mt-6">
                                <div class="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-gray-700 font-medium text-[15px]">
                                    <svg class="w-[18px] h-[18px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">
                                        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                                        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
                                        <path d="M12 4v6"/>
                                        <path d="M2 18h20"/>
                                    </svg>
                                    <span id="feat-beds">x12 Beds</span>
                                </div>
                                <div class="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-gray-700 font-medium text-[15px]">
                                    <svg class="w-[18px] h-[18px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">
                                        <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" />
                                        <path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" />
                                        <path d="M4 21l1 -1.5" />
                                        <path d="M20 21l-1 -1.5" />
                                    </svg>
                                    <span id="feat-baths">x16 Baths</span>
                                </div>
                                <div class="flex items-center gap-2 border border-gray-200 rounded-full px-5 py-2.5 text-gray-700 font-medium text-[15px]">
                                    <svg class="w-[18px] h-[18px] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8">
                                        <circle cx="5" cy="5" r="2" />
                                        <circle cx="19" cy="5" r="2" />
                                        <circle cx="5" cy="19" r="2" />
                                        <circle cx="19" cy="19" r="2" />
                                        <line x1="5" y1="7" x2="5" y2="17" />
                                        <line x1="7" y1="5" x2="17" y2="5" />
                                        <line x1="7" y1="19" x2="17" y2="19" />
                                        <line x1="19" y1="7" x2="19" y2="17" />
                                    </svg>
                                    <span id="feat-sqft">1200 sq</span>
                                </div>
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="w-full border-t border-gray-100 pt-6 mt-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img id="feat-agent-img" src="assets/images/home/clientdp.png" alt="Alex Roberts" class="w-[72px] h-[48px] object-contain">
                                <span id="feat-agent-name" class="font-semibold text-gray-900 text-[15px]">Alex Roberts</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </button>
                                <button id="feat-price" class="bg-[#0f4a47] hover:bg-[#0a3331] text-white font-bold text-[15px] px-6 py-2.5 rounded-[6px] transition-colors">
                                    $820,000
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Right Navigation Arrow -->
                <button class="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all z-20 group">
                    <svg class="w-6 h-6 text-gray-900 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                </button>

            </div>

        </div>
    </section>
`;

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '    <!-- INJECTION POINT -->';
if (content.includes(insertTarget)) {
    // Inject the section, and re-add the insertion target right below it
    content = content.replace(insertTarget, sectionHTML + '\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Featured Items section into index.html');
} else {
    console.error('Could not find insert target.');
}
