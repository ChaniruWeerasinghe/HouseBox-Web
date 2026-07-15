const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf-8');

const before = (c.match(/hover:-translate-y-1/g) || []).length;
c = c.split(' hover:-translate-y-1').join('');
const after = (c.match(/hover:-translate-y-1/g) || []).length;

fs.writeFileSync('index.html', c);
console.log('Removed hover:-translate-y-1 instances:', before - after);
