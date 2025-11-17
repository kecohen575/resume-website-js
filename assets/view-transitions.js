(function () {
  if (typeof document.startViewTransition !== 'function') {
    return;
  }

  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const shouldSkip = () => reduceMotionQuery.matches;

  const isSameOrigin = (anchor) => {
    const url = new URL(anchor.href, location.href);
    return url.origin === location.origin;
  };

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest?.('a[href]');
    if (!anchor) return;
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (!isSameOrigin(anchor)) return;

    event.preventDefault();
    const destination = anchor.href;

    if (shouldSkip()) {
      window.location.href = destination;
      return;
    }

    document.startViewTransition(() => {
      window.location.href = destination;
    });
  });
})();
