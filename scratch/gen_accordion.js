const fs = require('fs');

const sectionHTML = `
    <!-- ============================================ -->
    <!-- PROPERTY LOCATION ACCORDION SECTION -->
    <!-- ============================================ -->
    <section class="w-full bg-[#f4f7f6] pt-24 pb-28 px-12 relative overflow-hidden">
        <div class="max-w-[1400px] mx-auto w-full flex flex-col items-center gap-14 relative z-10">
            
            <!-- Section Header -->
            <div class="w-full flex flex-col items-center text-center gap-4 reveal-clip">
                <!-- Pill -->
                <span class="inline-block bg-[#e8efec] text-[#0f4a47] font-medium px-4 py-1.5 rounded-sm text-[14px]">
                    Property Location
                </span>
                <!-- Title -->
                <h2 class="text-[44px] leading-tight font-bold text-gray-900 tracking-tight">
                    Explore Our Property Location
                </h2>
            </div>

            <!-- Content Grid: Accordion + Map -->
            <div class="w-full grid grid-cols-12 gap-10 items-stretch reveal-clip" style="transition-delay: 200ms;">
                
                <!-- Left: Accordion List -->
                <div class="col-span-5 flex flex-col gap-4 w-full">
                    
                    <!-- Accordion Item 1 (Active by default) -->
                    <div class="accordion-item active bg-[#0f4a47] text-white p-6 rounded-[12px] shadow-sm cursor-pointer transition-colors duration-300">
                        <div class="flex items-center justify-between">
                            <h3 class="text-[18px] font-semibold">First Floor</h3>
                            <div class="icon-wrapper w-9 h-9 bg-white rounded-full flex items-center justify-center transition-transform duration-300">
                                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                            </div>
                        </div>
                        <div class="accordion-content mt-4 text-[15px] leading-relaxed text-gray-200">
                            Kitchen appliances are essential tools that simplify and enhance our culinary experiences, transforming routine.
                        </div>
                    </div>

                    <!-- Accordion Item 2 -->
                    <div class="accordion-item bg-white text-gray-900 p-6 rounded-[12px] shadow-sm cursor-pointer transition-colors duration-300">
                        <div class="flex items-center justify-between">
                            <h3 class="text-[18px] font-semibold">Second Floor</h3>
                            <div class="icon-wrapper w-9 h-9 bg-[#0f4a47] rounded-full flex items-center justify-center transition-transform duration-300">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="accordion-content hidden mt-4 text-[15px] leading-relaxed text-gray-600">
                            The second floor features spacious bedrooms and luxurious bathrooms designed for maximum comfort and relaxation.
                        </div>
                    </div>

                    <!-- Accordion Item 3 -->
                    <div class="accordion-item bg-white text-gray-900 p-6 rounded-[12px] shadow-sm cursor-pointer transition-colors duration-300">
                        <div class="flex items-center justify-between">
                            <h3 class="text-[18px] font-semibold">Swimming Pool</h3>
                            <div class="icon-wrapper w-9 h-9 bg-[#0f4a47] rounded-full flex items-center justify-center transition-transform duration-300">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="accordion-content hidden mt-4 text-[15px] leading-relaxed text-gray-600">
                            Enjoy our infinity pool with temperature control, surrounded by a beautiful deck area perfect for lounging.
                        </div>
                    </div>

                    <!-- Accordion Item 4 -->
                    <div class="accordion-item bg-white text-gray-900 p-6 rounded-[12px] shadow-sm cursor-pointer transition-colors duration-300">
                        <div class="flex items-center justify-between">
                            <h3 class="text-[18px] font-semibold">Kitchen Appliances</h3>
                            <div class="icon-wrapper w-9 h-9 bg-[#0f4a47] rounded-full flex items-center justify-center transition-transform duration-300">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div class="accordion-content hidden mt-4 text-[15px] leading-relaxed text-gray-600">
                            Fully equipped with top-of-the-line modern appliances to make your culinary endeavors a breeze.
                        </div>
                    </div>
                </div>

                <!-- Right: Map Embed -->
                <div class="col-span-7 relative w-full h-full min-h-[480px] rounded-[16px] overflow-hidden group shadow-md border border-gray-100 bg-gray-200">
                    <iframe 
                        src="https://maps.google.com/maps?q=Bay+Area,+CA&t=&z=10&ie=UTF8&iwloc=&output=embed" 
                        width="100%" 
                        height="100%" 
                        style="border:0; position: absolute; inset: 0;" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    
                    <!-- Hover Overlay for Map -->
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span class="text-white font-medium text-[16px]">Use ctrl + scroll to zoom the map</span>
                    </div>
                </div>

            </div>
            
            <!-- Scroll to Top Button (Floating bottom right of section) -->
            <button class="absolute -bottom-6 right-0 w-[54px] h-[54px] bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-transform hover:-translate-y-1 z-30">
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            </button>

        </div>
    </section>
`;

const indexFile = 'index.html';
let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '    <!-- Search Overlay -->';
if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, sectionHTML + '\\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Property Location Accordion section into index.html');
} else {
    console.error('Could not find insert target.');
}
