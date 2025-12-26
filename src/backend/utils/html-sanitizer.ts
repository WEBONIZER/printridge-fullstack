import DOMPurify from 'isomorphic-dompurify';

/**
 * Конфигурация для санитизации HTML
 * Разрешаем безопасные HTML теги для форматирования текста
 */
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'b', 'i',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'img',
    'div', 'span',
    'blockquote', 'pre', 'code',
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', // для ссылок
    'src', 'alt', 'title', 'width', 'height', 'style', // для изображений
    'class', 'id', // для стилизации
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  ALLOW_DATA_ATTR: false,
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
};

/**
 * Санитизирует HTML строку, удаляя потенциально опасные элементы
 * @param html - HTML строка для санитизации
 * @returns Санитизированная HTML строка
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  try {
    // Санитизируем HTML
    const sanitized = DOMPurify.sanitize(html, sanitizeConfig);
    return sanitized;
  } catch (error) {
    console.error('Ошибка санитизации HTML:', error);
    // В случае ошибки возвращаем экранированный текст
    return escapeHtml(html);
  }
}

/**
 * Экранирует HTML символы (fallback на случай ошибки санитизации)
 * @param text - Текст для экранирования
 * @returns Экранированный текст
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Экранирует HTML в простом тексте (для title и других полей, которые не должны содержать HTML)
 * @param text - Текст для экранирования
 * @returns Экранированный текст
 */
export function escapeHtmlText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  return escapeHtml(text);
}

/**
 * Проверяет, содержит ли HTML потенциально опасные элементы
 * @param html - HTML строка для проверки
 * @returns true, если HTML безопасен
 */
export function isHtmlSafe(html: string): boolean {
  if (!html || typeof html !== 'string') {
    return true;
  }

  try {
    const sanitized = DOMPurify.sanitize(html, sanitizeConfig);
    // Если после санитизации остались script, iframe, object, embed - HTML небезопасен
    const dangerousTags = /<(script|iframe|object|embed|form|input|button|select|textarea|meta|link|style|base)[\s>]/gi;
    return !dangerousTags.test(sanitized);
  } catch (error) {
    console.error('Ошибка проверки безопасности HTML:', error);
    return false;
  }
}

