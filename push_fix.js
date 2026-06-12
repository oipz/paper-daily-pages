const { execSync } = require('child_process');
const fs = require('fs');

// Read token
let token;
try {
  const hostsYaml = fs.readFileSync('C:\\Users\\aqzlp\\.config\\gh\\hosts.yml', 'utf8');
  const match = hostsYaml.match(/token:\s*(\S+)/);
  token = match ? match[1] : null;
} catch(e) {}

if (!token) {
  console.error('No GitHub token found');
  process.exit(1);
}

// Configure git to use token
execSync('git config credential.helper store');
fs.writeFileSync('C:\\Users\\aqzlp\\.git-credentials', `https://oipz:${token}@github.com\n`);

// Push
try {
  const out = execSync('git push origin main', { encoding: 'utf8', stdio: 'pipe' });
  console.log('Push succeeded:', out);
} catch(e) {
  console.log('Push output:', e.stdout);
  console.log('Push error:', e.stderr);
}
