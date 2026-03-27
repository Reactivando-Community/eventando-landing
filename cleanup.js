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

  // Clean up "Techstars techstars_"
  content = content.replace(/Techstars techstars_/g, "techstars_");
  content = content.replace(/techstars_ techstars_/g, "techstars_");
  
  // Also clean up any uppercase "TECHSTARS_ TECHSTARS_"
  content = content.replace(/TECHSTARS_ TECHSTARS_/g, "TECHSTARS_");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
});

console.log(`Replaced redundant techstars_ prefixes in ${count} files.`);
