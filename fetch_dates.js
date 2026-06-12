const fs = require('fs');
const https = require('https');
const http = require('http');

// All replace paper arxiv IDs
const replaceIds = [
  '2603.11678', '2510.23320', '2602.00560', '2606.06940', '2606.10360',
  '2604.16287', '2603.03855', '2606.06065', '2509.15680', '2606.02220',
  '2510.01157', '2606.06921', '2606.10046', '2405.06995', '2606.05394',
  '2605.28882'
];

function fetchArxiv(id) {
  return new Promise((resolve, reject) => {
    const url = `https://export.arxiv.org/api/query?id_list=${id}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const pubMatch = data.match(/<published>([^<]+)<\/published>/);
        const idMatch = data.match(/<id>http:\/\/arxiv\.org\/abs\/([^<]+)<\/id>/);
        const versionMatch = data.match(/(\d+)v(\d+)/);
        resolve({
          id,
          published: pubMatch ? pubMatch[1] : null,
          arxivId: idMatch ? idMatch[1] : null,
          version: versionMatch ? parseInt(versionMatch[2]) : null
        });
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching arxiv data for all replace papers...');
  const results = [];
  for (const id of replaceIds) {
    const r = await fetchArxiv(id);
    results.push(r);
    console.log(`${id}: published=${r.published}, version=v${r.version}`);
    await new Promise(r => setTimeout(r, 500)); // rate limit
  }
  
  // Save results
  fs.writeFileSync('D:\\Workspace\\paper-daily-pages\\replace_dates.json', JSON.stringify(results, null, 2));
  console.log('\nSaved to replace_dates.json');
}

main().catch(console.error);
