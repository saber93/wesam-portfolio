import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(root, 'dist');
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'assets']) {
  await cp(path.join(root, file), path.join(destination, file), { recursive: true });
}
const translations = JSON.parse(await readFile(path.join(root, 'translations/ar.json'), 'utf8'));
const source = await readFile(path.join(root, 'index.html'), 'utf8');
const translate = (text) => text.replace(text.trim(), translations[text.trim()] ?? text.trim());
let arabic = source.replace('<html lang="en">', '<html lang="ar" dir="rtl">')
  .replace(/>[^<>]+</g, text => '>' + translate(text.slice(1, -1)) + '<')
  .replace(/(aria-label|alt)="([^"]*)"/g, (_, key, value) => `${key}="${translate(value)}"`)
  .replaceAll('href="./', 'href="../').replaceAll('src="./', 'src="../')
  .replace('content="en_GB"', 'content="ar_AE"')
  .replace('content="ar_AE" data-alternate', 'content="en_GB" data-alternate')
  .replace('<link rel="canonical" href="https://wesam.elshafey.online/"', '<link rel="canonical" href="https://wesam.elshafey.online/ar/"')
  .replace('property="og:url" content="https://wesam.elshafey.online/"', 'property="og:url" content="https://wesam.elshafey.online/ar/"')
  .replaceAll('Wesam El Shafey | Facilities & Maintenance', 'وسام الشافعي | إدارة المرافق والصيانة')
  .replace('content="Wesam El Shafey"', 'content="وسام الشافعي"')
  .replaceAll('Practical technical experience. Thoughtful maintenance leadership. Based in Abu Dhabi.', 'خبرة فنية عملية وقيادة واعية لأعمال الصيانة. مقيم في أبوظبي.')
  .replace('Wesam El Shafey — facilities and maintenance professional based in Abu Dhabi. Practical expertise in HVAC, MEP, preventive maintenance and contractor coordination across the UAE, Saudi Arabia and Egypt.', 'وسام الشافعي — متخصص في إدارة المرافق والصيانة مقيم في أبوظبي. خبرة عملية في التكييف والأنظمة الكهروميكانيكية والصيانة الوقائية وتنسيق المقاولين في الإمارات والسعودية ومصر.')
  .replace('Portrait of Wesam El Shafey, facilities and maintenance professional based in Abu Dhabi', 'صورة وسام الشافعي، متخصص في إدارة المرافق والصيانة مقيم في أبوظبي')
  .replace('Portrait of Wesam El Shafey', 'صورة وسام الشافعي');
await mkdir(path.join(destination, 'ar'), {recursive: true});
await writeFile(path.join(destination, 'ar/index.html'), arabic);
console.log('Built English and Arabic portfolio pages in dist/');
