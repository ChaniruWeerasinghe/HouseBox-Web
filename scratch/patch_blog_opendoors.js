const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

// Blog card image wrappers currently have: class="relative w-full h-[260px] overflow-hidden"
// We need to add openDoors-container to them
const oldWrapper = 'class="relative w-full h-[260px] overflow-hidden"';
const newWrapper = 'class="relative w-full h-[260px] overflow-hidden openDoors-container"';

const count = (c.match(new RegExp(oldWrapper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
c = c.split(oldWrapper).join(newWrapper);
const after = (c.match(new RegExp(newWrapper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

fs.writeFileSync('index.html', c);
console.log('Replaced:', count, '-> After:', after);
