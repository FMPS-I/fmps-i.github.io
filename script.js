(() => {
  const menuBtn = document.getElementById('menuBtn');
  const navMobile = document.getElementById('navMobile');

  if (!menuBtn || !navMobile) return;

  const close = () => {
    navMobile.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  const toggle = () => {
    const open = navMobile.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  menuBtn.addEventListener('click', toggle);
  navMobile.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) close();
  });
})();
