import fs from 'fs';
import path from 'path';

const dir = 'src/components';
const replacements = [
  { search: /\[#012a17\]/gi, replace: 'brand-royal-green' },
  { search: /\[#D4B78F\]/gi, replace: 'brand-gold' },
  { search: /\[#B5913A\]/gi, replace: 'brand-gold-dark' },
  { search: /\[#FAF9F6\]/gi, replace: 'brand-offwhite' },
];

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(file => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  replacements.forEach(({ search, replace }) => {
    if (search.test(content)) {
      content = content.replace(search, replace);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
