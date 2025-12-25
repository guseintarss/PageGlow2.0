// Кнопка переключения темы
const themeToggle = document.getElementById('theme-toggle');

// Проверяем сохранённую тему
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️'; // Показываем солнце
}

// Переключение при клике
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  }
});

// Лёгкая анимация при прокрутке
window.addEventListener('scroll', () => {
  if (window.scrollY > 100 && !document.body.classList.contains('dark-mode')) {
    console.log('Читатель уже в теме :)');
  }
});
