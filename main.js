console.log('#53. JavaScript homework example file');

const SEPARATOR = ':';
const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
const HEX_PATTERN = /^(?:[0-9a-fA-F]{2})*$/;

/**
 * Виконує операцію з логуванням отриманих даних, результату та помилок.
 * Помилка після логування передається далі.
 *
 * @template T
 * @param {string} name Назва функції для повідомлень у консолі.
 * @param {unknown} input Вхідні дані для логування.
 * @param {() => T} operation Операція, яку потрібно виконати.
 * @returns {T} Результат операції.
 */
function runLogged(name, input, operation) {
  console.log(`${name}: отримані дані:`, input);
  try {
    const result = operation();
    console.log(`${name}: результат:`, result);
    return result;
  } catch (error) {
    console.error(`${name}: помилка:`, error.message);
    throw error;
  }
}

/**
 * Перевіряє, що всі аргументи є рядками.
 * @param {unknown[]} args Аргументи.
 * @throws {TypeError} Якщо хоча б один аргумент не є рядком.
 */
function assertAllStrings(args) {
  const invalidIndex = args.findIndex((arg) => typeof arg !== 'string');
  if (invalidIndex !== -1) {
    throw new TypeError(`Аргумент №${invalidIndex + 1} має бути рядком`);
  }
}

/**
 * Перевіряє, що значення є рядком.
 * @param {unknown} value Значення.
 * @param {string} name Назва параметра.
 * @throws {TypeError} Якщо значення не є рядком.
 */
function assertString(value, name) {
  if (typeof value !== 'string') {
    throw new TypeError(`${name} має бути рядком`);
  }
}

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "isDebugMode"
 *
 * Задача:
 * Розробити функцію, яка визначає чи знаходиться додаток у режимі відладки, виходячи зі значення змінної середовища `NODE_ENV`.
 * Функція повинна аналізувати стан середовища і відповідно повертати булеве значення, яке індикує режим відладки.
 * Додатково функція забезпечує логування процесу перевірки для допомоги у розумінні поточного стану виконання та середовища.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - Не потребує вхідних параметрів.
 *
 * 2. Визначення режиму відладки:
 *  - Функція `isDebugMode()` перевіряє значення змінної середовища `NODE_ENV`.
 *  - Повертає `true`, якщо `NODE_ENV` дорівнює 'development'.
 *  - Повертає `false`, якщо `NODE_ENV` має будь-яке інше значення або не встановлено.
 *
 * 3. Логування:
 *  - Логування поверненого значення у консоль перед завершенням функції.
 *  - Опційно, логування поточного значення `NODE_ENV` для кращого розуміння стану середовища.
 *
 * Технічні вимоги:
 * - Строга перевірка рівності використовуючи оператор `===`.
 * - Запис функції має бути виконаний з використанням стрілкової функції для підтримки сучасних стандартів ES6+.
 * - Код має бути написаний чисто і чітко, з урахуванням потенційних розширень для додаткових перевірок середовища.
 *
 */

/**
 * Визначає, чи працює додаток у режимі відладки.
 * Значення NODE_ENV читається під час кожного виклику.
 *
 * @returns {boolean} true, лише якщо NODE_ENV === 'development'.
 */
const isDebugMode = () => {
  const { NODE_ENV } = process.env;
  const result = NODE_ENV === 'development';
  console.log(`isDebugMode: NODE_ENV = ${NODE_ENV === undefined ? '(не встановлено)' : `"${NODE_ENV}"`}`);
  console.log(`isDebugMode: результат: ${result}`);
  return result;
};

/*
 *
 * #2
 *
 * Технічне завдання для розробки функцій "encodeToBase64", "encodeToHex", "decodeFromBase64", і "decodeFromHex"
 *
 * Задача:
 * Розробити набір функцій, які забезпечують кодування та декодування рядків.
 * Функції повинні дозволяти об'єднувати вхідні параметри у рядок з роздільником та кодувати або декодувати його у формати Base64 і Hex.
 * Ці функції мають бути гнучкими для обробки довільної кількості рядків та забезпечувати чітке логування процесів кодування та декодування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - Довільна кількість рядків як параметри функцій.
 *
 * 2. Операції кодування:
 *  - Використання функції `encodeToBase64(...args)`: об'єднання всіх аргументів у рядок з роздільником `:` і кодування його в формат base64.
 *  - Використання функції `encodeToHex(...args)`: об'єднання всіх аргументів у рядок з роздільником `:` і кодування його в шістнадцятковий формат.
 *
 * 3. Операції декодування:
 *  - Використання функції `decodeFromBase64(base64String)`: декодування рядка з формату base64 у звичайний рядок.
 *  - Використання функції `decodeFromHex(hexString)`: декодування рядка з шістнадцяткового формату у звичайний рядок.
 *
 * 4. Логування:
 *  - Логування отриманих даних у консоль при виклику кожної з функцій.
 *  - Логування можливих помилок в процесі кодування/декодування.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема rest-параметрів для збору аргументів.
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
 */

// Функції для кодування даних з довільною кількістю аргументів
/**
 * Об'єднує рядки через ":" і кодує результат у Base64 (вхід трактується як UTF-8).
 *
 * @param {...string} args Довільна кількість рядків.
 * @returns {string} Рядок у форматі Base64.
 * @throws {TypeError} Якщо хоча б один аргумент не є рядком.
 *
 * @example
 * encodeToBase64('john@email.com', '123'); // 'am9obkBlbWFpbC5jb206MTIz'
 */
function encodeToBase64(...args) {
  return runLogged('encodeToBase64', args, () => {
    assertAllStrings(args);
    return Buffer.from(args.join(SEPARATOR), 'utf8').toString('base64');
  });
}

/**
 * Об'єднує рядки через ":" і кодує результат у шістнадцятковий формат
 * (вхід трактується як UTF-8).
 *
 * @param {...string} args Довільна кількість рядків.
 * @returns {string} Рядок у шістнадцятковому форматі.
 * @throws {TypeError} Якщо хоча б один аргумент не є рядком.
 *
 * @example
 * encodeToHex('a', 'b'); // '613a62'
 */
function encodeToHex(...args) {
  return runLogged('encodeToHex', args, () => {
    assertAllStrings(args);
    return Buffer.from(args.join(SEPARATOR), 'utf8').toString('hex');
  });
}

// Функції для декодування даних
/**
 * Декодує рядок з Base64 у звичайний рядок (UTF-8).
 * Не перевіряє формат вхідного рядка: некоректні символи Node.js ігнорує.
 * Для суворої перевірки використовуйте safeDecodeFromBase64.
 *
 * @param {string} base64String Рядок у форматі Base64.
 * @returns {string} Декодований рядок.
 * @throws {TypeError} Якщо base64String не є рядком.
 */
function decodeFromBase64(base64String) {
  return runLogged('decodeFromBase64', base64String, () => {
    assertString(base64String, 'base64String');
    return Buffer.from(base64String, 'base64').toString('utf8');
  });
}

/**
 * Декодує рядок із шістнадцяткового формату у звичайний рядок (UTF-8).
 * Не перевіряє формат вхідного рядка: Node.js обриває декодування на першому
 * некоректному символі. Для суворої перевірки використовуйте safeDecodeFromHex.
 *
 * @param {string} hexString Рядок у шістнадцятковому форматі.
 * @returns {string} Декодований рядок.
 * @throws {TypeError} Якщо hexString не є рядком.
 */
function decodeFromHex(hexString) {
  return runLogged('decodeFromHex', hexString, () => {
    assertString(hexString, 'hexString');
    return Buffer.from(hexString, 'hex').toString('utf8');
  });
}

// ! Приклад використання:
// const base64Encoded = encodeToBase64('john@email.com', '123', 'extraData')
// console.log('Base64 Encoded:', base64Encoded)
//
// const hexEncoded = encodeToHex('john@email.com', '123', 'extraData')
// console.log('Hex Encoded:', hexEncoded)
//
// const base64Decoded = decodeFromBase64(base64Encoded)
// console.log('Base64 Decoded:', base64Decoded)
//
// const hexDecoded = decodeFromHex(hexEncoded)
// console.log('Hex Decoded:', hexDecoded)

/*
 *
 * #3
 *
 * Технічне завдання для розробки функцій "safeDecodeFromBase64" та "safeDecodeFromHex"
 *
 * Задача:
 * Розробити функції для безпечного декодування даних з форматів base64 та hex.
 * Функції повинні перевіряти валідність вхідних рядків і забезпечувати відповідні повідомлення про помилки та логування успішного виконання.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `base64String` та `hexString`: рядки, які мають бути декодовані відповідно з форматів base64 та hex.
 *
 * 2. Операції декодування з перевіркою:
 *  - Використання функції `safeDecodeFromBase64(base64String)`: перевірка на валідність рядка у форматі base64 перед декодуванням, повернення декодованого рядка або помилки при невалідних даних.
 *  - Використання функції `safeDecodeFromHex(hexString)`: перевірка на валідність рядка у шістнадцятковому форматі перед декодуванням, повернення декодованого рядка або помилки при невалідних даних.
 *
 * 3. Обробка помилок:
 *  - Якщо декодування не вдається через невалідність вхідних даних, функції викидають помилку з інформативним повідомленням (`Invalid base64 string` або `Invalid hex string`).
 *  - Забезпечення прозорого інформування користувача про помилку при її виникненні.
 *
 * 4. Логування:
 *  - Логування декодованих даних у консоль при успішному декодуванні.
 *  - Логування помилок у консоль при їх виникненні.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема регулярних виразів для перевірки формату вхідних даних.
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
 */

/**
 * Безпечно декодує рядок з Base64: спочатку перевіряє формат регулярним виразом
 * (алфавіт A-Z a-z 0-9 + /, довжина кратна 4, коректне доповнення "="),
 * і лише потім декодує. URL-safe Base64 (символи - та _) не підтримується.
 *
 * @param {string} base64String Рядок у форматі Base64.
 * @returns {string} Декодований рядок (UTF-8).
 * @throws {Error} 'Invalid base64 string', якщо вхід не є коректним Base64.
 */
function safeDecodeFromBase64(base64String) {
  return runLogged('safeDecodeFromBase64', base64String, () => {
    if (typeof base64String !== 'string' || !BASE64_PATTERN.test(base64String)) {
      throw new Error('Invalid base64 string');
    }
    return Buffer.from(base64String, 'base64').toString('utf8');
  });
}

/**
 * Безпечно декодує рядок із шістнадцяткового формату: спочатку перевіряє,
 * що він складається лише з символів 0-9 a-f A-F і має парну довжину,
 * і лише потім декодує.
 *
 * @param {string} hexString Рядок у шістнадцятковому форматі.
 * @returns {string} Декодований рядок (UTF-8).
 * @throws {Error} 'Invalid hex string', якщо вхід не є коректним hex.
 */
function safeDecodeFromHex(hexString) {
  return runLogged('safeDecodeFromHex', hexString, () => {
    if (typeof hexString !== 'string' || !HEX_PATTERN.test(hexString)) {
      throw new Error('Invalid hex string');
    }
    return Buffer.from(hexString, 'hex').toString('utf8');
  });
}

// ! Приклад використання:
// const safeBase64Decoded = safeDecodeFromBase64(base64Encoded)
// console.log('Safe Base64 Decoded:', safeBase64Decoded)
//
// const safeHexDecoded = safeDecodeFromHex(hexEncoded)
// console.log('Safe Hex Decoded:', safeHexDecoded)

export {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
};
