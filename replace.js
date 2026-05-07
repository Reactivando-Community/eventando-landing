const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (fullPath.match(/\.(js|ts|tsx|jsx|json)$/)) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk('/Users/pedrogoiania/projects/reactivando/eventando-landing/src');

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Let's protect the specific Hero logo HTML components so they don't get rewritten.
  // The hero text is scattered in StartupWeekendHero.js like:
  // Startup <br /> Weekend <br /> <span ...>Anápolis</span>
  // This already won't match our regex! So it's safe.

  // Normalize back to base forms if they were partially applied 
  // (In case of re-runs or partial edits)
  content = content.replace(/techstars_\s+Startup\s+Weekend\s+Anápolis/gi, "Startup Weekend Anápolis");
  content = content.replace(/techstars_\s+Startup\s+Weekend/gi, "Startup Weekend");
  content = content.replace(/TSW\s+Anápolis/gi, "SW Anápolis");

  // Apply new rules carefully
  // 1. "Startup Weekend Anápolis" -> "techstars_ Startup Weekend Anápolis"
  // 2. "Startup Weekend" -> "techstars_ Startup Weekend" (negative lookahead for Anápolis to avoid double prefixes)
  // 3. "SW Anápolis" -> "TSW Anápolis"
  // 4. "SW" -> "TSW" (using word boundary, without Anápolis)
  
  // NOTE: since we normalize all "techstars_ Startup Weekend Anápolis" down to "Startup Weekend Anápolis"
  // we can just replace "Startup Weekend" with "techstars_ Startup Weekend" and it will naturally cover
  // "Startup Weekend Anápolis" -> "techstars_ Startup Weekend Anápolis".
  
  // Replace case-sensitive to preserve original casing pattern
  // E.g., "STARTUP WEEKEND ANÁPOLIS" -> "techstars_ STARTUP WEEKEND ANÁPOLIS"
  // "Startup Weekend" -> "techstars_ Startup Weekend"

  content = content.replace(/STARTUP WEEKEND ANÁPOLIS/g, "techstars_ STARTUP WEEKEND ANÁPOLIS");
  content = content.replace(/Startup Weekend Anápolis/g, "techstars_ Startup Weekend Anápolis");
  
  // Any remaining STARTUP WEEKEND without ANÁPOLIS
  content = content.replace(/STARTUP WEEKEND(?! ANÁPOLIS)/g, "techstars_ STARTUP WEEKEND");
  // Any remaining Startup Weekend without Anápolis
  content = content.replace(/Startup Weekend(?! Anápolis)/g, "techstars_ Startup Weekend");

  // TSW Anápolis
  content = content.replace(/SW Anápolis/g, "TSW Anápolis");
  content = content.replace(/SW ANÁPOLIS/g, "TSW ANÁPOLIS");

  // TSW
  content = content.replace(/\bSW\b(?! Anápolis)/g, "TSW");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log(`Replaced strings in ${count} files.`);
