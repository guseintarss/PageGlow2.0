// Загружаем базу статей
async function loadArticles() {
  try {
    const response = await fetch('main/js/articles.js');
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки статей:', error);
    return [];
  }
}

// Поиск по тексту (заголовок + контент)
function searchByText(articles, query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return articles
    .map(article => {
      const titleMatch = article.title.toLowerCase().includes(q);
      const contentMatch = article.content.toLowerCase().includes(q);
      if (titleMatch || contentMatch) {
        const highlightedTitle = article.title.replace(
          new RegExp(q, 'gi'),
          match => `<span class="highlight">${match}</span>`
        );
        return { ...article, highlightedTitle };
      }
      return null;
    })
    .filter(Boolean)
    .slice(0, 5);
}

// Поиск по тегам
function searchByTags(articles, query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return articles
    .map(article => {
      const tagMatch = article.tags.some(tag =>
        tag.toLowerCase().includes(q)
      );
      if (tagMatch) {
        // Подсвечиваем совпадающий тег
        const matchedTags = article.tags
          .filter(tag => tag.toLowerCase().includes(q))
          .map(tag => `<span class="highlight">${tag}</span>`)
          .join(', ');
        return {
          ...article,
          highlightedTitle: article.title,
          matchedTags
        };
      }
      return null;
    })
    .filter(Boolean)
    .slice(0, 5);
}

// Инициализация поиска
document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const tabs = document.querySelectorAll('.search-tab');
  let searchMode = 'text'; // режим по умолчанию

  const articles = await loadArticles();

  // Переключение режимов
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      searchMode = tab.getAttribute('data-mode');
      // Очищаем результаты при смене режима
      results.classList.remove('active');
      input.value = '';
      input.focus();
    });
  });

  // Логика поиска при вводе
  input.addEventListener('input', () => {
    const query = input.value;

    if (!query) {
      results.classList.remove('active');
      return;
    }

    let matches = [];
    if (searchMode === 'text') {
      matches = searchByText(articles, query);
    } else if (searchMode === 'tags') {
      matches = searchByTags(articles, query);
    }

    if (matches.length > 0) {
      results.innerHTML = matches
        .map(article => {
          if (searchMode === 'tags' && article.matchedTags) {
            return `
              <a href="${article.url}" class="search-result-item">
                <div>${article.highlightedTitle}</div>
                <small>Теги: ${article.matchedTags}</small>
              </a>
            `;
          } else {
            return `
              <a href="${article.url}" class="search-result-item">
                <div>${article.highlightedTitle}</div>
                <small>${article.url}</small>
              </a>
            `;
          }
        })
        .join('');
      results.classList.add('active');
    } else {
      results.classList.remove('active');
    }
  });

  // Закрываем результаты при клике мимо
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      results.classList.remove('active');
    }
  });
});
