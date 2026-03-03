function applySystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute(
    'data-theme',
    prefersDark ? 'dark' : 'light'
  );
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute(
    'data-theme',
    current === 'dark' ? 'light' : 'dark'
  );
}

// Detecta automaticamente o tema do sistema
applySystemTheme();

// Atualiza automaticamente se o sistema mudar
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);