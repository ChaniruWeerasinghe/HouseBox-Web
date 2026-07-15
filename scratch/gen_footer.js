const fs = require('fs');

const sectionHTML = `
    <!-- ============================================ -->
    <!-- CTA + FOOTER SECTION -->
    <!-- ============================================ -->

    <!-- CTA Banner (overlaps footer via negative margin) -->
    <div class="w-full px-8 md:px-16 relative z-20" style="margin-bottom: -90px;">
        <div class="max-w-[1320px] mx-auto">
            <div class="relative w-full rounded-[20px] overflow-hidden flex flex-col md:flex-row items-center justify-between px-12 py-14 gap-8"
                 style="background: url('assets/images/home/cta-bg2.png') center center / cover no-repeat;">
                <!-- Dark overlay for text readability -->
                <div class="absolute inset-0 pointer-events-none" style="background: rgba(30,32,10,0.72);"></div>

                <!-- Concentric rings decoration (right side) -->
                <div class="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" style="right: -20px;">
                    <div class="relative flex items-center justify-center" style="width: 380px; height: 380px;">
                        <div class="absolute rounded-full border border-white/10" style="width: 380px; height: 380px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 300px; height: 300px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 220px; height: 220px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 140px; height: 140px;"></div>
                        <div class="absolute rounded-full border border-white/10" style="width: 60px; height: 60px;"></div>
                    </div>
                </div>

                <!-- Left: Text -->
                <div class="relative z-10 flex flex-col gap-4 max-w-[480px]">
                    <h2 class="text-white font-bold leading-tight" style="font-size: 38px;">
                        Step Into Your Dream<br>Home with HouseBox
                    </h2>
                    <p class="text-white/70 text-[15px] leading-relaxed">
                        At HouseBox, we believe your next home is more than just a place – it's where your future begins you're buy.
                    </p>
                </div>

                <!-- Right: CTA Button -->
                <div class="relative z-10 shrink-0">
                    <a href="#" id="cta-dream-home-btn"
                       class="inline-flex items-center gap-3 bg-[#ffc107] text-gray-900 font-bold px-8 py-4 rounded-[8px] text-[16px] hover:bg-yellow-400 transition-colors duration-200 shadow-lg">
                        Find Your Dream Home
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H9M17 7v8"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="w-full bg-[#f3f4f0] pt-[130px] pb-0 relative z-10">
        <div class="max-w-[1320px] mx-auto px-8 md:px-16">

            <!-- Footer Grid -->
            <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">

                <!-- Col 1: Brand -->
                <div class="flex flex-col gap-6">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2">
                        <div class="w-11 h-11 rounded-full bg-[#ffc107] flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 22h16"/><path d="M6 22V12h4v10"/><path d="M10 22V6h5v16"/><path d="M15 22v-9h4v9"/>
                            </svg>
                        </div>
                        <span class="text-[20px] font-extrabold text-gray-900 tracking-tight">HOUSEBOX</span>
                    </a>

                    <!-- Contact details -->
                    <div class="flex flex-col gap-3">
                        <a href="tel:+11234567890" class="flex items-center gap-2.5 text-gray-600 text-[14px] hover:text-gray-900 transition-colors">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            +1 123 456 7890
                        </a>
                        <a href="#" class="flex items-center gap-2.5 text-gray-600 text-[14px] hover:text-gray-900 transition-colors">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            421 Allen, Mexico 4233
                        </a>
                        <a href="mailto:houseboxesate@com" class="flex items-center gap-2.5 text-gray-600 text-[14px] hover:text-gray-900 transition-colors">
                            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            houseboxesate@com
                        </a>
                    </div>

                    <!-- Social Icons -->
                    <div class="flex items-center gap-3">
                        <a href="https://web.facebook.com/Chanii2003/" id="footer-facebook" target="_blank" rel="noopener" class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#ffc107] hover:text-gray-900 transition-all duration-200">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/chaniru-weerasinghe-36aa2a326/" id="footer-linkedin" target="_blank" rel="noopener" class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#ffc107] hover:text-gray-900 transition-all duration-200">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="https://www.instagram.com/chaniruweerasinghe" id="footer-instagram" target="_blank" rel="noopener" class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#ffc107] hover:text-gray-900 transition-all duration-200">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                        <a href="#" id="footer-youtube" class="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#ffc107] hover:text-gray-900 transition-all duration-200">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                        </a>
                    </div>
                </div>

                <!-- Col 2: Category -->
                <div class="flex flex-col gap-5">
                    <h4 class="text-gray-900 font-bold text-[17px]">Category</h4>
                    <ul class="flex flex-col gap-3">
                        <li><a href="#" class="text-[#0f4a47] text-[14px] hover:text-[#ffc107] transition-colors font-medium">Modern House</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Cottage House</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Cabin House</a></li>
                        <li><a href="#" class="text-[#0f4a47] text-[14px] hover:text-[#ffc107] transition-colors font-medium">Rambler House</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Pent House</a></li>
                    </ul>
                </div>

                <!-- Col 3: Quick Links -->
                <div class="flex flex-col gap-5">
                    <h4 class="text-gray-900 font-bold text-[17px]">Quick Links</h4>
                    <ul class="flex flex-col gap-3">
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Refund Policy</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Become a Seller</a></li>
                        <li><a href="#" class="text-gray-600 text-[14px] hover:text-[#0f4a47] transition-colors">Help Center</a></li>
                    </ul>
                </div>

                <!-- Col 4: We are here (Map) -->
                <div class="flex flex-col gap-5">
                    <h4 class="text-gray-900 font-bold text-[17px]">We are here</h4>
                    <div class="w-full h-[180px] rounded-[12px] overflow-hidden border border-gray-200 shadow-sm relative">
                        <iframe
                            src="https://maps.google.com/maps?q=Bay+Area,+CA&t=&z=10&ie=UTF8&iwloc=&output=embed"
                            width="100%" height="100%"
                            style="border:0; position:absolute; inset:0;"
                            allowfullscreen=""
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>

            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="w-full border-t border-gray-300 bg-[#f3f4f0]">
            <div class="max-w-[1320px] mx-auto px-8 md:px-16 py-5 flex items-center justify-center">
                <p class="text-gray-500 text-[14px]">&copy;Copyright 2024 &ndash; Housebox. All Right Reserved</p>
            </div>
        </div>
    </footer>
`;

let content = fs.readFileSync('index.html', 'utf-8');
const target = '    <!-- ============================================ -->\r\n    <!-- SCROLL TO TOP BUTTON -->';
const target2 = '    <!-- ============================================ -->\n    <!-- SCROLL TO TOP BUTTON -->';

if (content.includes(target)) {
    content = content.replace(target, sectionHTML + '\n    <!-- ============================================ -->\r\n    <!-- SCROLL TO TOP BUTTON -->');
    fs.writeFileSync('index.html', content);
    console.log('CTA + Footer injected successfully (CRLF)');
} else if (content.includes(target2)) {
    content = content.replace(target2, sectionHTML + '\n    <!-- ============================================ -->\n    <!-- SCROLL TO TOP BUTTON -->');
    fs.writeFileSync('index.html', content);
    console.log('CTA + Footer injected successfully (LF)');
} else {
    console.error('Could not find scroll-to-top target');
}
