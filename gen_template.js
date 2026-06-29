const fs = require('fs');
const items = JSON.parse(fs.readFileSync('vocab_extract.json', 'utf-8'));
let str = 'module.exports = {\n';
items.forEach(i => {
  str += `  "${i.id}": { "explanation": "", "explanationIndo": "" }, // ${i.word} - ${i.trans}\n`;
});
str += '};\n';
fs.writeFileSync('template.js', str);
