import {
  isDebugMode,
  encodeToBase64,
  encodeToHex,
  decodeFromBase64,
  decodeFromHex,
  safeDecodeFromBase64,
  safeDecodeFromHex,
} from './main.js';

isDebugMode();

const base64Encoded = encodeToBase64('john@email.com', '123', 'extraData');
console.log('Base64 Encoded:', base64Encoded);

const hexEncoded = encodeToHex('john@email.com', '123', 'extraData');
console.log('Hex Encoded:', hexEncoded);

console.log('Base64 Decoded:', decodeFromBase64(base64Encoded));
console.log('Hex Decoded:', decodeFromHex(hexEncoded));

console.log('Safe Base64 Decoded:', safeDecodeFromBase64(base64Encoded));
console.log('Safe Hex Decoded:', safeDecodeFromHex(hexEncoded));

for (const [fn, value] of [[safeDecodeFromBase64, 'not base64!'], [safeDecodeFromHex, 'xyz']]) {
  try {
    fn(value);
  } catch (error) {
    console.log('Очікувана помилка:', error.message);
  }
}
