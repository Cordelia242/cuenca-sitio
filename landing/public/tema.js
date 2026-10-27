// Runs before the first paint: applies the theme chosen with the toggle, so the page never flashes the other theme.
// Must match STORAGE_KEY in src/composables/useTheme.ts.
;(function () {
  try {
    var theme = localStorage.getItem('cuenca-tema')
    if (theme !== 'light' && theme !== 'dark') return
    document.documentElement.dataset.theme = theme
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa')
    })
  } catch (e) {}
})()
