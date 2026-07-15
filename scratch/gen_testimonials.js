const fs = require('fs');

const indexFile = 'index.html';

const sectionHTML = `
    <!-- ============================================ -->
    <!-- TESTIMONIALS SECTION -->
    <section class="w-full bg-[#f4f5f5] py-24 relative font-sans">
        
        <div class="max-w-[1600px] mx-auto w-full px-8 relative z-10">
            
            <!-- Section Header -->
            <div class="flex items-end justify-between w-full mb-12">
                <!-- Left: Titles -->
                <div class="flex flex-col items-start gap-3">
                    <span class="bg-[#dce6e5] text-[#0f4a47] font-semibold px-4 py-1.5 rounded-[4px] text-[14px]">Trusted By Thousand People</span>
                    <h2 class="text-[44px] font-bold text-gray-900 tracking-tight leading-tight">Hear Our Happy Clients</h2>
                </div>
                
                <!-- Right: Button -->
                <button class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-[15px] px-8 py-3.5 rounded-[6px] transition-colors flex items-center gap-2 group shadow-sm">
                    View All Testimonials
                    <svg class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 19L19 5M19 5v10M19 5h-10"></path></svg>
                </button>
            </div>

            <!-- Content Area -->
            <div class="flex gap-12 h-[520px]">
                
                <!-- Left: Large Family Image -->
                <div class="w-[45%] h-full rounded-[24px] overflow-hidden shadow-lg bg-gray-200">
                    <img src="assets/images/home/hero-main.webp" alt="Happy Family" class="w-full h-full object-cover">
                </div>

                <!-- Right: Testimonial Bubble & Avatars -->
                <div class="w-[55%] h-full flex items-center pr-8">
                    
                    <!-- Main Testimonial Block -->
                    <div class="flex-grow flex flex-col mr-12 h-full justify-center">
                        
                        <!-- Dark Green Speech Bubble -->
                        <div class="relative bg-[#0f4a47] rounded-[16px] p-10 shadow-2xl">
                            
                            <!-- Stars and Quote -->
                            <div class="flex justify-between items-start mb-6">
                                <div class="flex items-center gap-1.5 text-yellow-500">
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                </div>
                                <svg class="w-10 h-10 text-[#dce6e5]/40" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                            </div>

                            <!-- Text -->
                            <p class="text-[#93b4af] text-[20px] font-medium leading-relaxed">
                                "From start to finish, the team was exceptional. There are listened to our needs, provided expert guidance, & found us the perfect home. We couldn't be happier on with their service! got the best deal possible! Thanks"
                            </p>

                            <!-- Speech Bubble Tail -->
                            <div class="absolute -bottom-5 left-10 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[24px] border-t-[#0f4a47]"></div>
                        </div>

                        <!-- Author Info -->
                        <div class="flex items-center justify-between mt-10 ml-8">
                            <!-- Avatar & Name -->
                            <div class="flex items-center gap-4">
                                <div class="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-200 shadow-md">
                                    <img src="assets/images/home/avatar-1.webp" alt="Sheldon Jackson" class="w-full h-full object-cover">
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-bold text-gray-900 text-[18px]">Sheldon Jackson</span>
                                    <span class="text-gray-500 font-medium text-[14px]">Shop Store Owner</span>
                                </div>
                            </div>
                            
                            <!-- Google Logo text-based -->
                            <div class="font-sans font-bold text-[26px] tracking-tighter select-none opacity-90">
                                <span class="text-[#4285F4]">G</span><span class="text-[#EA4335]">o</span><span class="text-[#FBBC05]">o</span><span class="text-[#4285F4]">g</span><span class="text-[#34A853]">l</span><span class="text-[#EA4335]">e</span>
                            </div>
                        </div>

                    </div>

                    <!-- Right Stack of Avatars -->
                    <div class="flex flex-col justify-center items-center gap-6 h-full ml-auto">
                        <!-- Active Avatar -->
                        <div class="w-[60px] h-[60px] rounded-full p-1 border-2 border-[#0f4a47] cursor-pointer hover:scale-110 transition-transform">
                            <img src="assets/images/home/avatar-1.webp" class="w-full h-full rounded-full object-cover">
                        </div>
                        <!-- Inactive Avatars -->
                        <div class="w-[52px] h-[52px] rounded-full p-[2px] border border-gray-300 opacity-60 cursor-pointer hover:opacity-100 hover:scale-110 transition-all">
                            <img src="assets/images/home/clientdp.png" class="w-full h-full rounded-full object-cover">
                        </div>
                        <div class="w-[52px] h-[52px] rounded-full p-[2px] border border-gray-300 opacity-60 cursor-pointer hover:opacity-100 hover:scale-110 transition-all">
                            <img src="assets/images/home/avatar-1.webp" class="w-full h-full rounded-full object-cover">
                        </div>
                        <div class="w-[52px] h-[52px] rounded-full p-[2px] border border-gray-300 opacity-60 cursor-pointer hover:opacity-100 hover:scale-110 transition-all">
                            <img src="assets/images/home/clientdp.webp" class="w-full h-full rounded-full object-cover">
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
    console.log('Successfully injected Testimonials section into index.html');
} else {
    console.error('Could not find insert target.');
}
