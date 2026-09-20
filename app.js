const copy={
 tr:{brandReplay:'AWS TEDU — logoyu canlandır',replay:'Logoyu canlandır',orbitLabel:'FİKİRLER GERÇEĞE DÖNÜŞÜR.',artCaption:'GELECEĞİ BİRLİKTE ÜRET.',footerSlogan:'Aynı bulutta. Birlikte daha parlak.',title:'AWS TEDU — Birlikte üret.',description:'TED Üniversitesi AWS Student Builder Group. Merak et, birlikte öğren ve fikirlerini toplulukla büyüt.',skip:'İçeriğe geç',nav:'Ana gezinme',navAbout:'Bizi tanı',navConnect:'Bağlantı kur',join:'Aramıza katıl',heroTitle:'Merak et.<br> <span>Birlikte üret.</span>',heroDescription:'Bir fikir, yeni bir bağlantı, bir sonraki adım.<br> Buluta ve teknolojiye merak duyan TEDÜ öğrencileri burada buluşuyor.',heroCta:'Topluluğa katıl',heroExplore:'Bizi keşfet',heroNote:'Aynı merak. Daha büyük fikirler.',scroll:'Aşağı kaydır, bizi tanı',video:'Küplerin dağılıp kulüp logosuna dönüştüğü 3B animasyon',band:'ÖĞREN <b>✦</b> ÜRET <b>✦</b> BAĞ KUR <b>✦</b> BÜYÜ <b>✦</b>',aboutLabel:'01 — BİZ KİMİZ?',aboutTitle:'Tek başına bir fikir.<br> <span>Birlikte bir başlangıç.</span>',aboutCopy:'Biz, <strong>AWS Student Builder Group — TED University</strong> topluluğuyuz. Teknolojiye merak duyan, birlikte öğrenmek ve fikirlerini hayata geçirmek isteyen öğrencilerin buluştuğu topluluğuz.',aboutCopy2:'Bir soruyla da gelebilirsin, aklındaki bir projeyle de. Başlamak için her şeyi bilmen gerekmiyor.',learn:'Öğren.',learnCopy:'Bulut teknolojilerine birlikte yakından bak. Sorular sor, yeni şeyler keşfet.',build:'Üret.',buildCopy:'Aklındaki fikre bir şans ver. Küçük başla, dene ve birlikte geliştir.',connect:'Bağ kur.',connectCopy:'Aynı merakı paylaşan insanlarla tanış. Bildiklerini paylaş, yeni bakış açıları kazan.',connectLabel:'02 — TOPLULUĞA KATIL',connectTitle:'Bir sonraki adımı<br> <span>birlikte atalım.</span>',connectDescription:'Bizi takip et, merhaba de.<br> Sıradaki fikrini birlikte konuşalım.',instagramAction:'Merhaba de',linkedinAction:'Bağlantıda kal',backTop:'Başa dön ↑'},
 en:{brandReplay:'AWS TEDU — animate the logo',replay:'Animate the logo',orbitLabel:'IDEAS BECOME REAL.',artCaption:'BUILD WHAT’S NEXT.',footerSlogan:'Same cloud. Brighter together.',title:'AWS TEDU — Build together.',description:'AWS Student Builder Group at TED University. Stay curious, learn together, and bring your ideas to life with a community of student builders.',skip:'Skip to content',nav:'Main navigation',navAbout:'About us',navConnect:'Connect',join:'Join us',heroTitle:'Stay curious.<br> <span>Build together.</span>',heroDescription:'One idea. A new connection. Your next step.<br> A home for TED University students curious about cloud and technology.',heroCta:'Join us',heroExplore:'Meet the builders',heroNote:'Same curiosity. Bigger ideas.',scroll:'Scroll to meet us',video:'3D cubes scattering and assembling into the club emblem',band:'LEARN <b>✦</b> BUILD <b>✦</b> CONNECT <b>✦</b> GROW <b>✦</b>',aboutLabel:'01 — WHO WE ARE',aboutTitle:'Your idea.<br> <span>A shared beginning.</span>',aboutCopy:'We are <strong>AWS Student Builder Group — TED University.</strong> A community of students who are curious about technology, eager to learn together, and ready to bring ideas to life.',aboutCopy2:'Bring a question or a project you have in mind. You don’t need to know everything to get started.',learn:'Learn.',learnCopy:'Explore cloud technology together. Ask questions. Discover something new.',build:'Build.',buildCopy:'Give your idea a chance. Start small, experiment, and make it better together.',connect:'Connect.',connectCopy:'Meet people who share your curiosity. Share what you know and discover new perspectives.',connectLabel:'02 — JOIN THE COMMUNITY',connectTitle:'Take your next step.<br> <span>Let’s build together.</span>',connectDescription:'Follow along and say hello.<br> Let’s talk about your next idea.',instagramAction:'Say hello',linkedinAction:'Stay connected',backTop:'Back to top ↑'}
};
const video = document.querySelector('#hero-video');
const hero = document.querySelector('.hero');
const stage = document.querySelector('.visual-stage');
const brand = document.querySelector('.brand');
const artTrigger = document.querySelector('.art-trigger');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let lang = 'tr';
let heroVisible = true;
let replayTimer;

try {
  const preferred = new URLSearchParams(location.search).get('lang') || localStorage.getItem('aws-tedu-lang');
  if (preferred === 'en' || preferred === 'tr') lang = preferred;
} catch {}

function setLanguage(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.title = copy[lang].title;
  document.querySelector('meta[name=description]').content = copy[lang].description;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = copy[lang][el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.querySelectorAll('[data-aria]').forEach(el => el.setAttribute('aria-label', copy[lang][el.dataset.aria]));
  document.querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === lang)));
  try {
    localStorage.setItem('aws-tedu-lang', lang);
    const url = new URL(location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url);
  } catch {}
}

document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
setLanguage(lang);

function syncVideo() {
  if (reduced.matches || document.hidden || !heroVisible) {
    video.pause();
    return;
  }
  video.play().catch(() => {});
}

function clearReplay() {
  brand.classList.remove('is-replaying');
  artTrigger.classList.remove('is-replaying');
}

function replayLogo(event) {
  if (event.currentTarget === brand) {
    event.preventDefault();
    window.scrollTo({top: 0, behavior: reduced.matches ? 'instant' : 'smooth'});
  }
  clearTimeout(replayTimer);
  clearReplay();
  if (reduced.matches) return;
  // Reset the short flourish so repeated clicks respond immediately.
  void brand.offsetWidth;
  brand.classList.add('is-replaying');
  artTrigger.classList.add('is-replaying');
  if (video.readyState >= 1) video.currentTime = 0;
  syncVideo();
  replayTimer = setTimeout(clearReplay, 1100);
}

document.querySelectorAll('[data-replay]').forEach(el => el.addEventListener('click', replayLogo));
if (reduced.matches) video.removeAttribute('autoplay');
syncVideo();
document.addEventListener('visibilitychange', syncVideo);
reduced.addEventListener('change', () => {
  if (reduced.matches) {
    clearTimeout(replayTimer);
    clearReplay();
    document.documentElement.classList.remove('js-motion');
  }
  syncVideo();
});

if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    syncVideo();
  }, {threshold: 0}).observe(hero);
  if (!reduced.matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), {threshold: .12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}

hero.addEventListener('pointermove', event => {
  if (reduced.matches || event.pointerType === 'touch') return;
  const r = hero.getBoundingClientRect();
  stage.style.setProperty('--px', `${((event.clientX - r.left) / r.width - .5) * 14}px`);
  stage.style.setProperty('--py', `${((event.clientY - r.top) / r.height - .5) * 10}px`);
});
hero.addEventListener('pointerleave', () => {
  stage.style.setProperty('--px', '0px');
  stage.style.setProperty('--py', '0px');
});
