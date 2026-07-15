const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// The stray map block sits between the last location card and the closing grid divs
// It looks like: </div>\r\n                \r\n                </div>\r\n\r\n                <!-- Right: Map Embed -->
// We need to remove the stray Map Embed column and its closing divs up to </section>
// while preserving the correct closing structure of the grid section

const strayMapStart = c.indexOf('                \r\n                </div>\r\n\r\n                <!-- Right: Map Embed -->');
if (strayMapStart === -1) {
    console.error('Could not find stray map start');
    process.exit(1);
}

// The stray content ends at the </section> before PROPERTY LOCATION ACCORDION
const accordionMarker = '    <!-- ============================================ -->\r\n    <!-- PROPERTY LOCATION ACCORDION SECTION -->';
const strayMapEnd = c.indexOf(accordionMarker);

console.log('Stray map start:', strayMapStart);
console.log('Stray map end:', strayMapEnd);
console.log('Content being removed:');
console.log(c.substring(strayMapStart, strayMapStart + 300));

// Replace the stray content with just the correct closing tags for the grid section
const correctClose = `                \r\n                </div>\r\n\r\n            </div>\r\n            \r\n        </div>\r\n    </section>\r\n\r\n    `;

c = c.substring(0, strayMapStart) + correctClose + c.substring(strayMapEnd);

fs.writeFileSync('index.html', c);
console.log('\nDone!');
console.log('iframes:', (c.match(/<iframe/g) || []).length);
console.log('location-reveal:', (c.match(/location-reveal/g) || []).length);
console.log('accordion-item:', (c.match(/accordion-item/g) || []).length);
