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
    const keepStart = c.substring(0, start) + `
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
