const fs = require('fs');

const indexFile = 'index.html';

const sectionHTML = `
    <!-- ============================================ -->
    <!-- BLOG SECTION -->
    <section class="w-full bg-white py-24 relative font-sans">
        
        <div class="max-w-[1400px] mx-auto w-full px-8 relative z-10">
            
            <!-- Section Header -->
            <div class="flex flex-col items-center text-center w-full mb-14">
                <span class="bg-[#dce6e5] text-[#0f4a47] font-semibold px-4 py-1.5 rounded-[4px] text-[14px] mb-4">Latest Blog Posts</span>
                <h2 class="text-[44px] font-bold text-gray-900 tracking-tight leading-tight">Our Real Estate Updates</h2>
            </div>

            <!-- Blog Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <!-- Blog Card 1 -->
                <div class="bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                    <!-- Image -->
                    <div class="relative w-full h-[260px] overflow-hidden">
                        <img src="assets/images/home/thumb-1.webp" alt="Blog 1" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        
                        <!-- Author Badge -->
                        <div class="absolute bottom-5 left-5 bg-yellow-400 text-gray-900 font-bold px-3 py-1.5 rounded-[4px] text-[13px] flex items-center gap-1.5 shadow-sm">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
                            By Alex Roy
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8 flex flex-col flex-grow items-start">
                        <!-- Date -->
                        <div class="flex items-center gap-2 text-gray-800 font-semibold text-[14px] mb-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            8 December 2024
                        </div>
                        
                        <!-- Title -->
                        <h3 class="text-[22px] font-bold text-gray-900 leading-[1.3] mb-8 group-hover:text-[#0f4a47] transition-colors">
                            5 Tips Find Your Dream Home Without An Stress Know Budget
                        </h3>
                        
                        <!-- Learn More -->
                        <div class="mt-auto flex items-center gap-1.5 font-bold text-[15px] text-gray-900 group-hover:text-[#0f4a47] transition-colors">
                            Learn More
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9M17 7v8"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- Blog Card 2 -->
                <div class="bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                    <!-- Image -->
                    <div class="relative w-full h-[260px] overflow-hidden">
                        <img src="assets/images/home/hero-main.webp" alt="Blog 2" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        
                        <!-- Author Badge -->
                        <div class="absolute bottom-5 left-5 bg-yellow-400 text-gray-900 font-bold px-3 py-1.5 rounded-[4px] text-[13px] flex items-center gap-1.5 shadow-sm">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
                            By Alex Roy
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8 flex flex-col flex-grow items-start">
                        <!-- Date -->
                        <div class="flex items-center gap-2 text-gray-800 font-semibold text-[14px] mb-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            8 December 2024
                        </div>
                        
                        <!-- Title -->
                        <h3 class="text-[22px] font-bold text-gray-900 leading-[1.3] mb-8 group-hover:text-[#0f4a47] transition-colors">
                            How Choose the Perfect Home Neighborhood For Your Family
                        </h3>
                        
                        <!-- Learn More -->
                        <div class="mt-auto flex items-center gap-1.5 font-bold text-[15px] text-gray-900 group-hover:text-[#0f4a47] transition-colors">
                            Learn More
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9M17 7v8"></path></svg>
                        </div>
                    </div>
                </div>

                <!-- Blog Card 3 -->
                <div class="bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300">
                    <!-- Image -->
                    <div class="relative w-full h-[260px] overflow-hidden">
                        <img src="assets/images/home/thumb-2.webp" alt="Blog 3" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                        
                        <!-- Author Badge -->
                        <div class="absolute bottom-5 left-5 bg-yellow-400 text-gray-900 font-bold px-3 py-1.5 rounded-[4px] text-[13px] flex items-center gap-1.5 shadow-sm">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"/></svg>
                            By Alex Roy
                        </div>
                    </div>
                    
                    <!-- Content -->
                    <div class="p-8 flex flex-col flex-grow items-start">
                        <!-- Date -->
                        <div class="flex items-center gap-2 text-gray-800 font-semibold text-[14px] mb-3">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            8 December 2024
                        </div>
                        
                        <!-- Title -->
                        <h3 class="text-[22px] font-bold text-gray-900 leading-[1.3] mb-8 group-hover:text-[#0f4a47] transition-colors">
                            Common Homebuyer Mistakes And How To Home Avoid Them
                        </h3>
                        
                        <!-- Learn More -->
                        <div class="mt-auto flex items-center gap-1.5 font-bold text-[15px] text-gray-900 group-hover:text-[#0f4a47] transition-colors">
                            Learn More
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9M17 7v8"></path></svg>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
`;

let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '    <!-- INJECTION POINT -->';
if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, sectionHTML + '\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Blog section into index.html');
} else {
    console.error('Could not find insert target.');
}
