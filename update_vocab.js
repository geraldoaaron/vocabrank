const fs = require('fs');

async function processVocab() {
  const filePath = 'src/data/vocabulary.ts';
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("id: '") && line.includes("englishWord: '")) {
      if (line.includes("explanationIndo: '")) continue; // Skip if already has both

      const match = line.match(/englishWord:\s*'([^']+)'/);
      const posMatch = line.match(/partOfSpeech:\s*'([^']+)'/);
      
      if (match && posMatch) {
        const word = match[1];
        const pos = posMatch[1];
        
        console.log('Processing: ' + word);
        try {
          let bestDef = null;
          
          // If it already has an English explanation, use it
          const expMatch = line.match(/explanation:\s*'([^']+)'/);
          if (expMatch) {
             bestDef = expMatch[1];
          } else {
             const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word));
             if (res.ok) {
               const data = await res.json();
               if (Array.isArray(data) && data.length > 0) {
                 const meaning = data[0].meanings.find(m => m.partOfSpeech === pos) || data[0].meanings[0];
                 const defs = meaning?.definitions || [];
                 bestDef = defs.sort((a, b) => b.definition.length - a.definition.length)[0]?.definition;
               }
             }
          }
          
          if (bestDef) {
            const tRes = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=' + encodeURIComponent(bestDef));
            if (tRes.ok) {
              const tData = await tRes.json();
              if (tData && tData[0] && tData[0][0] && tData[0][0][0]) {
                 const indoDef = tData[0][0][0];
                 const safeDef = bestDef.replace(/'/g, "\\'");
                 const safeIndoDef = indoDef.replace(/'/g, "\\'");
                 
                 let newLine = line;
                 if (expMatch) {
                   newLine = line.replace(/explanation:\s*'[^']+'\s*}/, "explanation: '" + safeDef + "', explanationIndo: '" + safeIndoDef + "' }");
                 } else {
                   newLine = line.replace(/,\s*partOfSpeech:\s*'[^']+'\s*}/, matchStr => matchStr.replace(' }', '') + ", explanation: '" + safeDef + "', explanationIndo: '" + safeIndoDef + "' }");
                 }
                 lines[i] = newLine;
                 console.log('Updated: ' + word);
              }
            }
          } else {
            console.log('No definition found for: ' + word);
          }
        } catch (e) {
          console.error('Error on ' + word, e.message);
        }
        
        await new Promise(r => setTimeout(r, 150)); // rate limit
      }
    }
  }
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log('Finished updating vocabulary.ts');
}
processVocab();
