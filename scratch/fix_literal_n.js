const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Remove the literal \n that appears as text on the page
// It appears as: </section>\r\n\n    <!-- (with a literal backslash-n)
c = c.replace('    </section>\r\n\\n    <!-- ============================================ -->\r\n\r\n\n    <!-- ============================================ -->\n    <!-- PROPERTY LOCATION ACCORDION SECTION -->',
              '    </section>\r\n\r\n    <!-- ============================================ -->\r\n    <!-- PROPERTY LOCATION ACCORDION SECTION -->');

// Fallback: also try removing any standalone \n on its own line
c = c.replace(/^\\n\s*$/gm, '');

fs.writeFileSync('index.html', c);

// Verify
const remaining = (c.match(/\\n/g) || []).length;
console.log('Literal backslash-n remaining:', remaining);
console.log('iframes:', (c.match(/<iframe/g) || []).length);
