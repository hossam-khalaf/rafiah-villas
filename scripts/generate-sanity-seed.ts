import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VILLAS } from '../src/data/villas';

// Required for ES modules or mixed contexts in tsx if __dirname is undefined
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../sanity-seed');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const ndjsonPath = path.join(outputDir, 'villas.ndjson');

const ndjsonLines = VILLAS.map((villa, index) => {
  let titleAr = '';
  let titleEn = '';
  
  if (villa.type === 'corner') {
    titleAr = 'فيلا زاوية';
    titleEn = 'Corner Villa';
  } else if (villa.type === 'northFacade') {
    titleAr = 'فيلا واجهة شمالية';
    titleEn = 'North Facade Villa';
  } else if (villa.type === 'southFacade') {
    titleAr = 'فيلا واجهة جنوبية';
    titleEn = 'South Facade Villa';
  }

  const doc = {
    _id: `villa-${villa.id.toLowerCase()}`,
    _type: 'villa',
    villaCode: villa.id,
    type: villa.type,
    status: villa.status,
    ...(villa.plotSize ? { area: villa.plotSize } : {}),
    ...(villa.price ? { price: villa.price } : {}),
    isFeatured: false,
    titleAr: `${titleAr} - ${villa.id}`,
    titleEn: `${titleEn} - ${villa.id}`,
    displayOrder: index + 1,
  };

  return JSON.stringify(doc);
});

fs.writeFileSync(ndjsonPath, ndjsonLines.join('\n'), 'utf-8');
console.log(`Successfully generated ${ndjsonLines.length} villa documents in sanity-seed/villas.ndjson`);
