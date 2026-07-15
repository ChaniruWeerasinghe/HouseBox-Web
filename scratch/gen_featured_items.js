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
                    <div class="w-[45%] h-full relative overflow-hidden rounded-[24px] shadow-2xl">
                        <img src="assets/images/home/hero-left-bg-1.webp" alt="Property View" class="w-full h-full object-cover">
                    </div>

                    <!-- Right: Info Card -->
                    <div class="w-[55%] h-full bg-white p-10 flex flex-col justify-between rounded-[24px] shadow-2xl">
                        
                        <div class="flex flex-col items-start gap-4">
                            <!-- Badges -->
                            <div class="flex items-center gap-3">
                                <span class="bg-[#0f4a47] text-white font-semibold px-4 py-1.5 rounded-[4px] text-[13px]">Featured</span>
                                <span class="bg-yellow-400 text-gray-900 font-bold px-4 py-1.5 rounded-[4px] text-[13px]">For Rent</span>
                            </div>

                            <!-- Title -->
                            <h3 class="text-[28px] font-bold text-gray-900 tracking-tight leading-tight mt-1">Rancho Vista Verde, Santos Barba</h3>
                            
                            <!-- Location -->
                            <div class="flex items-center gap-2 text-gray-600 font-medium">
                                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span class="text-[16px]">742 Terrace, Springfield, IL 62704, USA</span>
                            </div>

                            <!-- Stats (Features) -->
                            <div class="flex items-center gap-4 mt-6">
                                <div class="flex items-center gap-2 border border-gray-200 rounded-[8px] px-5 py-2.5 text-gray-600 text-[14px]">
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                    <span>x12 Beds</span>
                                </div>
                                <div class="flex items-center gap-2 border border-gray-200 rounded-[8px] px-5 py-2.5 text-gray-600 text-[14px]">
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                    <span>x16 Baths</span>
                                </div>
                                <div class="flex items-center gap-2 border border-gray-200 rounded-[8px] px-5 py-2.5 text-gray-600 text-[14px]">
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                    <span>1200 sq</span>
                                </div>
                            </div>
                        </div>

                        <!-- Card Footer -->
                        <div class="w-full border-t border-gray-100 pt-6 mt-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <img src="assets/images/home/avatar-1.webp" alt="Alex Roberts" class="w-12 h-12 rounded-full object-cover shadow-sm bg-gray-100">
                                <span class="font-semibold text-gray-900 text-[15px]">Alex Roberts</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </button>
                                <button class="bg-[#0f4a47] hover:bg-[#0a3331] text-white font-bold text-[15px] px-6 py-2.5 rounded-[6px] transition-colors">
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
    content = content.replace(insertTarget, sectionHTML + '\\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Featured Items section into index.html');
} else {
    console.error('Could not find insert target.');
}
