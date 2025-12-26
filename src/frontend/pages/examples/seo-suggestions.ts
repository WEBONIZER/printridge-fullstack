/**
 * Утилиты для генерации SEO предложений на основе контента
 */

/**
 * Удаляет HTML теги из текста
 */
function stripHtml(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Обрезает текст до указанной длины, добавляя многоточие
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

/**
 * Список стоп-слов для русского языка (исключаем из ключевых слов)
 */
const STOP_WORDS = new Set([
  "это", "как", "так", "для", "что", "или", "когда", "где", "кто", "чем",
  "быть", "был", "была", "было", "были", "есть", "быть", "стать", "стал",
  "все", "всего", "всех", "всё", "всегда", "всегда", "всегда",
  "очень", "можно", "нужно", "должен", "должна", "должно", "должны",
  "будет", "будет", "будет", "будет", "будет",
  "при", "про", "под", "над", "от", "до", "из", "на", "в", "с", "по", "о",
  "и", "а", "но", "да", "же", "ли", "бы", "то", "же", "ли", "бы",
  "мой", "моя", "мое", "мои", "твой", "твоя", "твое", "твои",
  "наш", "наша", "наше", "наши", "ваш", "ваша", "ваше", "ваши",
  "он", "она", "оно", "они", "его", "её", "их", "ему", "ей", "им",
  "который", "которая", "которое", "которые", "которого", "которой", "которым",
]);

/**
 * Извлекает ключевые слова из текста
 */
function extractKeywords(text: string, title: string): string {
  // Объединяем title и text
  const combined = `${title} ${text}`.toLowerCase();
  
  // Удаляем HTML
  const cleanText = stripHtml(combined);
  
  // Удаляем знаки препинания и разбиваем на слова
  const words = cleanText
    .replace(/[^\w\sа-яё]/gi, " ")
    .split(/\s+/)
    .filter((word) => {
      // Только слова длиннее 3 символов и не стоп-слова
      return word.length > 3 && !STOP_WORDS.has(word);
    });
  
  // Подсчитываем частоту слов
  const wordCount: { [key: string]: number } = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Сортируем по частоте и берем топ-10
  const sortedWords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  return sortedWords.join(", ");
}

export interface SeoSuggestions {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
}

/**
 * Генерирует SEO предложения на основе title и text
 */
export function generateSeoSuggestions(title: string, text: string): SeoSuggestions {
  const cleanTitle = stripHtml(title).trim();
  const cleanText = stripHtml(text).trim();
  
  // Meta Title: используем title, обрезаем до 60 символов
  const metaTitle = truncate(cleanTitle, 60);
  
  // Meta Description: генерируем из text, обрезаем до 160 символов
  let metaDescription = cleanText;
  if (metaDescription.length > 160) {
    // Пытаемся обрезать по предложению
    const sentences = metaDescription.split(/[.!?]\s+/);
    metaDescription = sentences[0] || cleanText.substring(0, 157) + "...";
    if (metaDescription.length > 160) {
      metaDescription = truncate(metaDescription, 160);
    }
  }
  
  // Keywords: извлекаем из title и text
  const metaKeywords = extractKeywords(text, title);
  
  // Open Graph использует те же данные
  const ogTitle = truncate(cleanTitle, 60);
  const ogDescription = truncate(metaDescription, 200);
  
  return {
    metaTitle,
    metaDescription,
    metaKeywords,
    ogTitle,
    ogDescription,
  };
}

/**
 * Проверяет, можно ли сгенерировать предложения
 */
export function canGenerateSuggestions(title: string, text: string): boolean {
  return (title && title.trim().length > 0) || (text && text.trim().length > 0);
}

