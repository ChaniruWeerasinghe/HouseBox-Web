const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Find the end of the first section
const marker1 = '        <!-- Decorative Scroll/Arrow Element on Bottom Right -->';
let start = c.indexOf(marker1);

// Find the start of the footer/overlay
const marker2 = '    <!-- Search Overlay -->';
let end = c.indexOf(marker2);

if (start !== -1 && end !== -1) {
    // Keep everything up to marker1 + the rest of that section
    const keepStart = c.substring(0, start) + `        <!-- Decorative Scroll/Arrow Element on Bottom Right -->
        <div class="absolute bottom-10 right-12 opacity-80 pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="black" stroke-width="3">
                <path d="M50 70 V30 M35 45 L50 30 L65 45" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M70 20 Q 90 20, 90 40" stroke-linecap="round"/>
            </svg>
        </div>
    </section>

`;
    // Add marker for scripts to inject into
    const injectionPoint = `    <!-- ============================================ -->\n    <!-- INJECTION POINT -->\n\n`;
    
    // Keep everything from marker2 onwards
    const keepEnd = c.substring(end);
    
    fs.writeFileSync('index.html', keepStart + injectionPoint + keepEnd);
    console.log('Successfully cleaned index.html');
} else {
    console.log('Could not find markers');
}
