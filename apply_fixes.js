const fs = require('fs');
const fixes1 = require('./fixes1.js');
const fixes2 = require('./fixes2.js');
const fixes3 = require('./fixes3.js');

const allFixes = { ...fixes1, ...fixes2, ...fixes3 };

const filePath = 'src/data/vocabulary.ts';
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const idMatch = line.match(/id:\s*'([^']+)'/);
  
  if (idMatch) {
    const id = idMatch[1];
    if (allFixes[id]) {
      const fix = allFixes[id];
      // escape quotes
      const safeExp = fix.explanation.replace(/'/g, "\\'");
      const safeIndo = fix.explanationIndo.replace(/'/g, "\\'");
      
      // We know the line has `explanation: '...'` or `explanationIndo: '...'` since we ran the previous script.
      // Let's just strip out everything after `partOfSpeech: '...'` and recreate the end of the line.
      const posMatch = line.match(/(.*partOfSpeech:\s*'[^']+')/);
      if (posMatch) {
         lines[i] = `${posMatch[1]}, explanation: '${safeExp}', explanationIndo: '${safeIndo}' },`;
      }
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log('Successfully applied ' + Object.keys(allFixes).length + ' fixes.');
