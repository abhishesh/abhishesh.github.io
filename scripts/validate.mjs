import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { parseHTML } from 'linkedom';

const baseline = JSON.parse(
  readFileSync('docs/migration-baseline.json', 'utf8'),
);
const read = (path) => readFileSync(path, 'utf8');
const compact = (text) => text.replace(/\s+/gu, '');
const documentAt = (file) => parseHTML(read(file)).document;
const home = documentAt('dist/index.html');
for (const element of home.querySelectorAll('script, style')) element.remove();
const text = compact(home.documentElement.textContent);
for (const original of baseline.text)
  assert.ok(
    text.includes(compact(original)),
    `Missing original text: ${original}`,
  );
for (const href of baseline.links)
  assert.ok(
    [...home.querySelectorAll('a')].some(
      (a) => a.getAttribute('href') === href,
    ),
    `Missing original link: ${href}`,
  );
for (const id of baseline.ids)
  assert.ok(home.getElementById(id), `Missing original fragment: #${id}`);
for (const [file, hash] of Object.entries(baseline.files)) {
  if (file === 'src/content.config.ts') {
    // Only modernize the deprecated Zod API; preserve every validation field.
    const originalForm = read(file)
      .replace(
        "import { defineCollection } from 'astro:content';\nimport { z } from 'astro/zod';",
        "import { defineCollection, z } from 'astro:content';",
      )
      .replaceAll('z.url()', 'z.string().url()');
    assert.equal(
      createHash('sha256').update(originalForm).digest('hex'),
      hash,
      'Schema changed beyond the documented Zod API migration',
    );
    continue;
  }
  assert.equal(
    createHash('sha256').update(readFileSync(file)).digest('hex'),
    hash,
    `Protected file changed: ${file}`,
  );
  if (file.startsWith('public/'))
    assert.equal(
      readFileSync(join('dist', file.slice(7))).compare(readFileSync(file)),
      0,
      `Published asset differs: ${file}`,
    );
}
const routes = [
  '/',
  '/about/',
  '/photography/',
  '/audiophile/',
  '/coffee/',
  '/perfumes/',
  '/desk-setup/',
  '/travel/',
  '/projects/',
  '/pringles.html',
];
const sectionIds = [
  'about',
  'photography',
  'audio',
  'coffee',
  'perfumes',
  'tech',
  'travel',
  'projects',
];
function fileFor(pathname) {
  return join(
    'dist',
    pathname.endsWith('/') ? `${pathname}index.html` : pathname,
  );
}
for (const route of routes)
  assert.ok(existsSync(fileFor(route)), `Missing route: ${route}`);
for (const [i, route] of routes.slice(1, 9).entries()) {
  const doc = documentAt(fileFor(route));
  assert.equal(
    compact(doc.getElementById(sectionIds[i]).textContent),
    compact(home.getElementById(sectionIds[i]).textContent),
    `Section differs between homepage and ${route}`,
  );
}
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const file = join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const htmlFiles = walk('dist').filter((file) => extname(file) === '.html');
let internalLinks = 0;
for (const file of htmlFiles) {
  const doc = documentAt(file);
  const relative = file.slice(4).replace(/index\.html$/, '');
  const url = new URL(relative, 'https://abhishesh.com');
  const legacy = file === 'dist/pringles.html';
  if (!legacy) {
    assert.equal(
      doc.querySelectorAll('h1').length,
      1,
      `${file}: expected one h1`,
    );
    assert.ok(doc.querySelector('main'), `${file}: missing main landmark`);
    assert.ok(
      doc.querySelector('meta[name="description"]')?.getAttribute('content'),
      `${file}: missing description`,
    );
    assert.equal(
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      url.href,
      `${file}: canonical mismatch`,
    );
    const ids = [...doc.querySelectorAll('[id]')].map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
    for (const reference of doc.querySelectorAll('[aria-labelledby]'))
      for (const id of reference.getAttribute('aria-labelledby').split(' '))
        assert.ok(
          doc.getElementById(id),
          `${file}: invalid aria-labelledby ${id}`,
        );
  }
  for (const element of doc.querySelectorAll(
    'a[href], img[src], script[src], link[href]',
  )) {
    const value = element.getAttribute('href') ?? element.getAttribute('src');
    if (/^(data:|mailto:|tel:)/.test(value)) continue;
    const target = new URL(value, url);
    if (target.origin !== url.origin) continue;
    const targetFile = fileFor(decodeURIComponent(target.pathname));
    assert.ok(existsSync(targetFile), `${file}: broken local URL ${value}`);
    if (target.hash)
      assert.ok(
        documentAt(targetFile).getElementById(
          decodeURIComponent(target.hash.slice(1)),
        ),
        `${file}: broken fragment ${value}`,
      );
    internalLinks++;
  }
  for (const img of doc.querySelectorAll('img')) {
    const src = img.getAttribute('src');
    assert.ok(src, `${file}: empty image`);
    if (src.startsWith('data:image/png;base64,'))
      assert.equal(
        Buffer.from(src.split(',')[1], 'base64').subarray(1, 4).toString(),
        'PNG',
        'Invalid embedded notebook PNG',
      );
    if (!legacy)
      assert.ok(
        img.hasAttribute('alt'),
        `${file}: image missing alternative text`,
      );
  }
}
const sitemap = read('dist/sitemap-0.xml');
for (const route of routes)
  assert.ok(
    sitemap.includes(`https://abhishesh.com${route}`),
    `Sitemap missing ${route}`,
  );
assert.ok(!sitemap.includes('/404'), '404 must not be indexed');
console.log(
  `Validated ${htmlFiles.length} HTML pages, ${internalLinks} internal references, ${baseline.text.length} original text segments, ${baseline.links.length} original links, and ${Object.keys(baseline.files).length} protected files.`,
);
