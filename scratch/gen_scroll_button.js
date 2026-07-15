const fs = require('fs');

const indexFile = 'index.html';

const sectionHTML = `
    <!-- ============================================ -->
    <!-- SCROLL TO TOP BUTTON -->
    <div id="scroll-to-top" class="fixed bottom-10 right-10 z-50 opacity-0 translate-y-4 transition-all duration-300 pointer-events-none cursor-pointer flex items-center justify-center w-14 h-14 group">
        <!-- SVG Progress Circle -->
        <svg class="absolute inset-0 w-full h-full -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
            <!-- Background track (optional, but screenshot shows only the active progress) -->
            <!-- <circle cx="50" cy="50" r="46" fill="none" stroke="#f3f4f6" stroke-width="4"></circle> -->
            <circle id="scroll-progress-circle" cx="50" cy="50" r="46" fill="none" stroke="#111827" stroke-width="4" stroke-dasharray="289.02" stroke-dashoffset="289.02" stroke-linecap="round" class="transition-all duration-150 ease-out"></circle>
        </svg>
        
        <!-- White Button Background & Arrow -->
        <div class="relative w-[85%] h-[85%] bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow">
            <svg class="w-5 h-5 text-gray-900 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20V4M5 11l7-7 7 7"></path></svg>
        </div>
    </div>
`;

let content = fs.readFileSync(indexFile, 'utf-8');

const insertTarget = '</body>';
if (content.includes(insertTarget)) {
    content = content.replace(insertTarget, sectionHTML + '\n' + insertTarget);
    fs.writeFileSync(indexFile, content);
    console.log('Successfully injected Scroll-to-Top Button into index.html');
} else {
    console.error('Could not find insert target.');
}
