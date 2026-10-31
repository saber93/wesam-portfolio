const pageLanguage = document.documentElement.lang;
const languageChoice = new URLSearchParams(location.search).get('lang');
try {
  if (languageChoice === 'en' || pageLanguage === 'ar') localStorage.setItem('wesam-language', pageLanguage);
  else if (localStorage.getItem('wesam-language') === 'ar') location.replace('/ar/' + location.hash);
} catch { /* The pages remain usable when storage is disabled. */ }
document.querySelectorAll('[data-language]').forEach(link => {
  link.setAttribute('aria-current', link.dataset.language === pageLanguage ? 'true' : 'false');
  link.addEventListener('click', () => {
    try { localStorage.setItem('wesam-language', link.dataset.language); } catch {}
    link.href = (link.dataset.language === 'ar' ? '/ar/' : '/?lang=en') + location.hash;
  });
});
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);

const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      activateTab(tabs[next]);
      tabs[next].focus();
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-10% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}
