import { readFileSync, writeFileSync } from 'node:fs';
const { links } = JSON.parse(
  readFileSync('docs/migration-baseline.json', 'utf8'),
);
const results = [];
let index = 0;
async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteLinkCheck/1.0)' },
    });
    await response.body?.cancel();
    return {
      url,
      status: response.status,
      finalUrl: response.url,
      result: response.ok
        ? 'ok'
        : [401, 403, 429, 999].includes(response.status)
          ? 'restricted'
          : 'needs-review',
    };
  } catch (error) {
    return {
      url,
      result: 'unverified',
      reason: error.cause?.code || error.name,
    };
  }
}
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (index < links.length) {
      const result = await check(links[index++]);
      results.push(result);
      console.log(`${result.status || result.reason} ${result.url}`);
    }
  }),
);
results.sort((a, b) => a.url.localeCompare(b.url));
writeFileSync(
  'docs/external-link-report.json',
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2) +
    '\n',
);
console.log(
  JSON.stringify(
    results.reduce(
      (counts, result) => ({
        ...counts,
        [result.result]: (counts[result.result] || 0) + 1,
      }),
      {},
    ),
  ),
);
