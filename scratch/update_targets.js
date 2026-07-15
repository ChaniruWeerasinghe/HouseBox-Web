const fs = require('fs');

function updateTarget(file) {
    let c = fs.readFileSync(file, 'utf-8');
    c = c.replace(/const insertTarget = .*;/, "const insertTarget = '    <!-- ============================================ -->\\n    <!-- INJECTION POINT -->';");
    fs.writeFileSync(file, c);
}

updateTarget('scratch/gen.js');
updateTarget('scratch/gen_locations.js');
updateTarget('scratch/gen_accordion.js');
console.log('Targets updated.');
