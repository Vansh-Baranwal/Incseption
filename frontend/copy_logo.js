const fs = require('fs');
const path = require('path');

const source = 'c:\\Users\\vansh\\AppData\\Roaming\\Code\\User\\globalStorage\\github.copilot-chat\\copilot-cli-images\\1775447646722-yqw5v5zg.png';
const dest = path.join(__dirname, 'public', 'govt-logo.png');

fs.copyFileSync(source, dest);
console.log('Logo copied successfully!');
