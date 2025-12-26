/**
 * Функция транслитерации русского текста в латиницу
 * Используется для создания URL-friendly строк из заголовков
 */

const transliterationMap: { [key: string]: string } = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
  'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
  'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
  'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo',
  'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
  'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
  'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
  'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
};

/**
 * Транслитерирует текст из кириллицы в латиницу
 * @param text - Текст для транслитерации
 * @returns Транслитерированный текст
 */
function transliterate(text: string): string {
  return text
    .split('')
    .map((char) => transliterationMap[char] || char)
    .join('');
}

/**
 * Создает URL-friendly строку из заголовка
 * - Транслитерирует кириллицу в латиницу
 * - Приводит к нижнему регистру
 * - Заменяет пробелы и специальные символы на дефисы
 * - Удаляет множественные дефисы
 * - Удаляет дефисы в начале и конце
 * 
 * @param title - Заголовок для преобразования
 * @returns URL-friendly строка
 */
export function generateRouteFromTitle(title: string): string {
  if (!title || typeof title !== 'string') {
    return '';
  }

  // Транслитерируем
  let route = transliterate(title.trim());

  // Приводим к нижнему регистру
  route = route.toLowerCase();

  // Заменяем пробелы и специальные символы на дефисы
  route = route.replace(/[^\w\s-а-яё]/gi, ''); // Удаляем все кроме букв, цифр, пробелов и дефисов
  route = route.replace(/\s+/g, '-'); // Пробелы в дефисы
  route = route.replace(/-+/g, '-'); // Множественные дефисы в один
  route = route.replace(/^-+|-+$/g, ''); // Удаляем дефисы в начале и конце

  return route;
}

/**
 * Проверяет, является ли строка валидным route
 * @param route - Строка для проверки
 * @returns true, если route валиден
 */
export function isValidRoute(route: string): boolean {
  if (!route || typeof route !== 'string') {
    return false;
  }

  // Route должен содержать только латинские буквы, цифры и дефисы
  // Не должен начинаться или заканчиваться дефисом
  // Длина от 1 до 100 символов
  const routeRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return routeRegex.test(route) && route.length >= 1 && route.length <= 100;
}

