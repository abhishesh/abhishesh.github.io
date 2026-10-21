// Local-only visual QA page, generated after building and discarded by the next build.
import { writeFileSync } from 'node:fs';
writeFileSync(
  'dist/__qa.html',
  `<!doctype html><html lang="en"><meta charset="utf-8"><title>Responsive QA</title><style>body{font:16px system-ui;background:#ddd;color:#111;margin:20px}button,select{font:inherit;padding:8px;margin:5px}iframe{height:750px;border:1px solid #555;background:white;display:block;margin-top:20px}pre{white-space:pre-wrap}</style><h1>Local responsive QA</h1><label>Page <select id="route"><option value="/">Home</option><option value="/pringles.html">Pringles notebook</option>${['about', 'photography', 'audiophile', 'coffee', 'perfumes', 'desk-setup', 'travel', 'projects'].map((s) => `<option value="/${s}/">${s}</option>`).join('')}</select></label><button data-width="320">320 px</button><button data-width="375">375 px</button><button data-width="768">768 px</button><button data-width="1280">1280 px</button><button id="test">Check all pages and widths</button><pre id="results" role="status">Choose a viewport or run checks.</pre><iframe title="Site preview" id="frame" width="375" src="/"></iframe><script>
const frame=document.querySelector('#frame'), route=document.querySelector('#route'), results=document.querySelector('#results');
document.querySelectorAll('[data-width]').forEach(b=>b.onclick=()=>frame.width=b.dataset.width);
route.onchange=()=>frame.src=route.value;
const navigate=url=>new Promise(resolve=>{frame.onload=()=>setTimeout(resolve,150);frame.src=url;});
document.querySelector('#test').onclick=async()=>{
 let errors=[],count=0;
 for(const width of [320,375,768,1280]){frame.width=width;for(const option of route.options){await navigate(option.value);const d=frame.contentDocument,w=frame.contentWindow;await d.fonts.ready;await new Promise(r=>requestAnimationFrame(r));count++;
 if(d.documentElement.scrollWidth>Number(width)+1)errors.push(option.value+' overflow at '+width+': '+d.documentElement.scrollWidth);
 for(const img of d.images)if(!img.complete||!img.naturalWidth)errors.push(option.value+' broken image');
 const select=d.querySelector('#theme-select');if(select) { for(const theme of ['dark','light','solarized','dracula','nord','monokai','catppuccin','retro']){select.value=theme;select.dispatchEvent(new w.Event('change'));if(d.documentElement.dataset.theme!==theme)errors.push('Theme failed '+theme);}
 select.value='dark';select.dispatchEvent(new w.Event('change')); }
 results.textContent='Checked '+count+' page/width combinations. '+errors.join('\\n');
 }}
 frame.width=375;await navigate('/audiophile/');route.value='/audiophile/';results.textContent='Completed '+count+' page/width combinations and all supported themes. '+(errors.length?errors.join('\\n'):'No page overflow or broken images.');
};
</script></html>`,
);
console.log(
  'Open http://127.0.0.1:4321/__qa.html after starting npm run preview. This local QA page is removed by npm run build.',
);
