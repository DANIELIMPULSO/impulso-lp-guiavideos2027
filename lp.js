// Landing page do guia 2027: interações do site novo e envio do formulário para o RD Station
const CFG = window.LP || {};
const UP = 'https://www.impulsofilmes.com.br/wp-content/uploads/';
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Links que dependem da configuração (PDF, WhatsApp, orçamento, política)
document.querySelectorAll('.zap-link').forEach(a => { if (CFG.whatsapp) a.href = CFG.whatsapp; });
document.querySelectorAll('.orcamento-link').forEach(a => { if (CFG.orcamento) a.href = CFG.orcamento; });
document.querySelectorAll('.politica').forEach(a => { if (CFG.politica) a.href = CFG.politica; });
const pdf = document.getElementById('pdf');
if (pdf && CFG.pdf) pdf.href = CFG.pdf;

// Vídeo do sócio: nome, cargo e player que só carrega o vídeo no clique
document.querySelectorAll('[data-socio-nome]').forEach(el => { if (CFG.socioNome && !/^Nome do/.test(CFG.socioNome)) el.textContent = CFG.socioNome; });
document.querySelectorAll('b[data-socio-nome]').forEach(el => { if (CFG.socioNome) el.textContent = CFG.socioNome; });
document.querySelectorAll('[data-socio-cargo]').forEach(el => { if (CFG.socioCargo) el.textContent = CFG.socioCargo; });
const player = document.querySelector('.player');
if (player) {
  if (CFG.videoCapa) player.querySelector('.player-poster').src = CFG.videoCapa;
  const url = CFG.video || '';
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
  const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  const tocar = () => {
    if (player.classList.contains('playing')) return;
    let el;
    if (vimeo) {
      el = document.createElement('iframe');
      el.src = 'https://player.vimeo.com/video/' + vimeo[1] + '?autoplay=1&title=0&byline=0&portrait=0' + (vimeo[2] ? '&h=' + vimeo[2] : '');
    } else if (yt) {
      el = document.createElement('iframe');
      el.src = 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&rel=0';
    } else {
      el = document.createElement('video');
      el.src = url; el.controls = true; el.autoplay = true; el.playsInline = true;
    }
    if (el.tagName === 'IFRAME') { el.allow = 'autoplay; fullscreen; picture-in-picture'; el.allowFullscreen = true; el.title = 'Vídeo sobre o guia'; }
    player.append(el);
    player.classList.add('playing');
    player.removeAttribute('role'); player.removeAttribute('tabindex'); delete player.dataset.cursor;
  };
  if (url) {
    player.addEventListener('click', tocar);
    player.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tocar(); } });
  } else {
    player.classList.add('soon');
    player.removeAttribute('role'); player.removeAttribute('tabindex'); delete player.dataset.cursor;
    player.setAttribute('aria-label', 'Vídeo em breve');
    player.querySelector('.player-label').textContent = 'Vídeo em breve';
  }
}

// Anos de mercado sempre atualizados
document.querySelectorAll('[data-anos]').forEach(el => { el.textContent = new Date().getFullYear() - 2013; });

// Cabeçalho
const header = document.querySelector('.top');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), { passive: true });

// Entrada dos blocos ao rolar; cartões de uma mesma grade entram em sequência
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => {
  const irmaos = [...el.parentElement.children].filter(c => c.classList.contains('reveal') && !c.classList.contains('statement'));
  const k = irmaos.indexOf(el);
  if (k > 0 && !calm) el.style.transitionDelay = (k % 4) * 90 + 'ms';
  io.observe(el);
});

// Faixa de clientes (lista duplicada para o movimento contínuo)
const logos = document.getElementById('logos');
if (logos) {
  const LOGOS = [
    '2024/05/ARCELORMITTAL_LOGO-1', '2024/05/UNIMED_LOGO', '2024/05/SAUDALI_LOGO', '2024/05/SUPPORTE_LOGO',
    '2024/05/UR_LOGO', '2024/05/TR_LOGO', '2024/05/FUNDACAO_ESTUDAR_LOGO', '2024/05/CANAL_BRASIL_LOGO',
    '2024/05/CURTA_LOGO', '2024/05/CODEMIG_LOGO', '2024/05/CBA_LOGO', '2024/05/UAU_HUB_LOGO',
    '2024/05/logo-dispetral', '2024/05/ORALUNIC_LOGO-2', '2024/05/NEXINVOICE_LOGO', '2024/05/CALHADAS_LOGO',
  ];
  [...LOGOS, ...LOGOS].forEach(l => {
    const im = new Image();
    im.loading = 'lazy';
    im.alt = '';
    im.src = UP + l + '-90x90.png';
    if (/CALHADAS|UNIMED|dispetral/.test(l)) im.className = 'fill';
    logos.append(im);
  });
}

// Timecode do topo, a 24 quadros por segundo
const tc = document.getElementById('tc');
if (tc && !calm) {
  const t0 = performance.now();
  const p2 = n => String(n).padStart(2, '0');
  setInterval(() => {
    const f = Math.floor((performance.now() - t0) / (1000 / 24));
    tc.textContent = [Math.floor(f / 86400), Math.floor(f / 1440) % 60, Math.floor(f / 24) % 60, f % 24].map(p2).join(':');
  }, 1000 / 24);
}

// Linha de progresso, vídeo do topo que aproxima e palavra em contorno que desliza
if (!calm) {
  const root = document.documentElement;
  const heroEl = document.querySelector('.hero');
  const budget = document.querySelector('.budget');
  const outline = document.querySelector('.outline');
  let queued = false;
  function onScroll() {
    queued = false;
    const vh = innerHeight;
    root.style.setProperty('--p', (scrollY / Math.max(1, root.scrollHeight - vh)).toFixed(4));
    if (heroEl) heroEl.style.setProperty('--hs', Math.min(1, scrollY / heroEl.offsetHeight).toFixed(3));
    if (budget && outline) {
      const r = budget.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) outline.style.setProperty('--ox', ((r.top - vh * .3) * .14).toFixed(1));
    }
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
}

// Interações com o mouse
if (finePointer && !calm) {
  document.body.classList.add('has-cursor');
  const ring = document.querySelector('.cursor');
  const dot = document.querySelector('.dot');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    const t = e.target.closest('[data-cursor], a, button, summary, input, select, textarea');
    const field = t && /INPUT|SELECT|TEXTAREA/.test(t.tagName);
    ring.classList.toggle('off', !!field);
    ring.classList.toggle('label', !!t && !!t.dataset.cursor);
    ring.classList.toggle('link', !!t && !t.dataset.cursor && !field);
    ring.textContent = t && t.dataset.cursor ? t.dataset.cursor : '';
  }, { passive: true });
  (function follow() {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(follow);
  })();

  // Foco de luz que acompanha o mouse sobre o vídeo
  const hero = document.querySelector('.hero');
  const shade = document.querySelector('.hero-shade');
  hero?.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    shade.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    shade.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  // Livro do guia: gira conforme o mouse e os números de "2027" esticam com a proximidade
  const book = document.querySelector('.book');
  if (book) {
    const turn = book.querySelector('.book-3d');
    const shadow = book.querySelector('.book-shadow');
    const digits = [...book.querySelectorAll('.cover-year i')];
    hero.addEventListener('mousemove', e => {
      const r = book.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const ny = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      turn.style.setProperty('--ry', (-26 + nx * 34).toFixed(2) + 'deg');
      turn.style.setProperty('--rx', (6 - ny * 14).toFixed(2) + 'deg');
      shadow.style.setProperty('--sx', (-14 + nx * 30).toFixed(1));
      digits.forEach(l => {
        const b = l.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (b.left + b.width / 2), (e.clientY - (b.top + b.height / 2)) * 1.6);
        l.style.setProperty('--k', (1 + .42 * Math.max(0, 1 - d / 220) ** 2).toFixed(3));
      });
    }, { passive: true });
    hero.addEventListener('mouseleave', () => {
      turn.style.removeProperty('--ry'); turn.style.removeProperty('--rx'); shadow.style.removeProperty('--sx');
      digits.forEach(l => l.style.removeProperty('--k'));
    });
  }

  // Imagem do vídeo de apresentação se desloca levemente na direção oposta ao mouse
  document.querySelectorAll('.reel').forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      img.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * -18 + 'px');
      img.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * -18 + 'px');
    }, { passive: true });
    card.addEventListener('mouseleave', () => { img.style.removeProperty('--px'); img.style.removeProperty('--py'); });
  });

  // Botões principais são atraídos pelo mouse (menos o do formulário, que ocupa a largura toda)
  document.querySelectorAll('.btn.solid:not([type=submit]), .cta').forEach(b => {
    b.classList.add('magnet');
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('mouseleave', () => { b.style.transform = ''; });
  });
}

// Números que contam quando entram na tela, em cascata
{
  const anoAtual = new Date().getFullYear();
  const alvo = el => el.dataset.to === 'ano' ? anoAtual : Number(el.dataset.to);
  const partida = el => Number(el.dataset.from || 0);
  const escrever = (el, v) => { el.textContent = Math.round(v) + (el.dataset.suffix || ''); };
  const numeros = [...document.querySelectorAll('.facts strong[data-to]')];
  numeros.forEach(el => escrever(el, alvo(el)));
  const contar = el => {
    const de = partida(el), ate = alvo(el), t0 = performance.now();
    el.closest('li').classList.remove('wait');
    (function passo(agora) {
      const t = Math.min(1, (agora - t0) / 2000);
      escrever(el, de + (ate - de) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(passo);
    })(t0);
  };
  if (!calm && numeros.length) {
    numeros.forEach(el => { escrever(el, partida(el)); el.closest('li').classList.add('wait'); });
    const ver = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      ver.unobserve(e.target);
      [...e.target.querySelectorAll('strong[data-to]')].forEach((el, k) => setTimeout(() => contar(el), k * 450));
    }), { threshold: .4 });
    document.querySelectorAll('.facts').forEach(ul => ver.observe(ul));
  }
}

// ---------- Formulário: envia a conversão para o RD Station ----------
const form = document.getElementById('form');
if (form) {
  const note = form.querySelector('.form-note');
  const tel = form.elements.whatsapp;

  // Máscara do WhatsApp: (00) 00000-0000
  tel.addEventListener('input', () => {
    const d = tel.value.replace(/\D/g, '').slice(0, 11);
    tel.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
      : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
  });

  const valido = el => {
    if (el.type === 'checkbox') return el.checked;
    if (el.name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim());
    if (el.name === 'whatsapp') return el.value.replace(/\D/g, '').length >= 10;
    return el.value.trim() !== '';
  };
  const campos = [...form.querySelectorAll('[required]')];
  campos.forEach(el => el.addEventListener(el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input',
    () => { if (valido(el)) el.closest('label').classList.remove('invalid'); }));

  // Origem do tráfego gravada pelo script de monitoramento do RD Station, se ele estiver na página
  const cookie = n => decodeURIComponent((document.cookie.match('(?:^|; )' + n.replace(/\./g, '\\.') + '=([^;]*)') || [])[1] || '');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    note.classList.remove('err');
    const ruins = campos.filter(el => !valido(el));
    campos.forEach(el => el.closest('label').classList.toggle('invalid', ruins.includes(el)));
    if (ruins.length) {
      note.classList.add('err');
      note.textContent = ruins.some(el => el.type === 'checkbox') && ruins.length === 1
        ? 'Para receber o guia, marque a caixa de consentimento.'
        : 'Confira os campos destacados.';
      ruins[0].focus();
      return;
    }

    const f = form.elements;
    const digitos = f.whatsapp.value.replace(/\D/g, '');
    const payload = {
      conversion_identifier: CFG.conversao || 'lp-guia-planejamento-audiovisual-2027',
      name: f.nome.value.trim(),
      email: f.email.value.trim(),
      mobile_phone: '+55' + digitos,
      company_name: f.empresa.value.trim(),
      job_title: f.cargo.value.trim(),
      [CFG.campoPorte || 'cf_porte_da_empresa']: f.porte.value,
      [CFG.campoObjetivo || 'cf_objetivo_com_video_em_2027']: f.objetivo.value,
      available_for_mailing: true,
      // Registro do consentimento (LGPD) no lead
      legal_bases: [{ category: 'communications', type: 'consent', status: 'granted' }],
    };
    const origem = cookie('__trf.src');
    if (origem) payload.traffic_source = origem;

    const botao = form.querySelector('button');
    botao.disabled = true;
    note.textContent = 'Enviando…';

    if (!CFG.rdToken) {
      // Modo de teste: sem token do RD Station, nada é enviado
      console.info('[LP] Modo de teste. Dados que seriam enviados ao RD Station:', payload);
      note.textContent = 'Modo de teste: falta o token do RD Station. Indo para a página de agradecimento…';
      setTimeout(() => { location.href = 'obrigado.html'; }, 1200);
      return;
    }

    try {
      const r = await fetch('https://api.rd.services/platform/conversions?api_key=' + encodeURIComponent(CFG.rdToken), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'CONVERSION', event_family: 'CDP', payload }),
      });
      if (!r.ok) throw new Error('RD Station respondeu ' + r.status + ': ' + await r.text());
      location.href = 'obrigado.html';
    } catch (err) {
      console.error(err);
      botao.disabled = false;
      note.classList.add('err');
      note.textContent = 'Não conseguimos enviar agora. Tente de novo em instantes ou fale com a gente pelo WhatsApp.';
    }
  });
}
