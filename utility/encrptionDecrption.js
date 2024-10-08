const crypto = require('crypto');

// AES-256 key and IV
const keyString = 'my32lengthsupersecretnooneknows1'; // 32 characters key for AES-256
const iv = Buffer.alloc(16, 0); // Initialization Vector (16 bytes of zeros)

function decryptMyVideo(encryptedString) {
  // Convert URL-safe Base64 to standard Base64
  const base64String = encryptedString.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - base64String.length % 4) % 4); // Add padding if necessary
  const paddedBase64String = base64String + padding;

  const key = Buffer.from(keyString, 'utf8'); // AES key
  const encryptedData = Buffer.from(paddedBase64String, 'base64'); // Parse Base64 string

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted; // Return the decrypted string
}


function simplesimpleEncryptFun(videoId) {
  // Reverse the text
  let reversedText = videoId.split('').reverse().join('');

  // Prepare the encrypted text
  let encryptedText = '';

  // Add characters from the key to the reversed text
  const keyLength = keyString.length;
  for (let i = 0; i < reversedText.length; i++) {
    encryptedText += reversedText[i];

    // Add a character from the key every keyLength characters
    if ((i + 1) % keyLength === 0) {
      encryptedText += keyString[i % keyLength];
    }
  }

  return encryptedText;
}

function simpleDecryptFun(encryptedString) {
  let cleanedText = '';
  const keyLength = keyString.length;
  let counter = 0;
  for (let i = 0; i < encryptedString.length; i++) {
    // Skip the key characters that were injected
    if ((counter + 1) % keyLength === 0 && i + 1 !== encryptedString.length) {
      counter++;
      continue;
    }
    cleanedText += encryptedString[i];
    counter++;
  }
  return cleanedText.split('').reverse().join('');

  /*
  // Remove the key characters from the encrypted text
  let reversedText = '';
  for (let i = 0; i < encryptedString.length; i++) {
    if ((i + 1) % (keyString.length + 1) !== 0) {
      reversedText += encryptedString[i];
    }
  }

  // Reverse the text
  let decryptedText = reversedText.split('').reverse().join('');

  return decryptedText;*/
}


module.exports = simpleDecryptFun;


