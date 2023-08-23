import * as crypto from 'crypto';

const ALGORITHM = {
  BLOCK_CIPHER: 'aes-256-gcm',
  AUTH_TAG_BYTE_LEN: 16,
  IV_BYTE_LEN: 12,
  KEY_BYTE_LEN: 32,
};

const getIV = (): Buffer => crypto.randomBytes(ALGORITHM.IV_BYTE_LEN);

export function getRandomKey(): Buffer {
  return crypto.randomBytes(ALGORITHM.KEY_BYTE_LEN);
}

/**
 * Generate a key based on a PIN.
 * @param pin The PIN to be used for generating the key.
 */
export function getKeyFromPin(pin: Buffer): Buffer {
  const salt = (parseInt(pin.toString('utf8')) ** 8).toString();
  return crypto.scryptSync(pin, salt, ALGORITHM.KEY_BYTE_LEN);
}

/**
 * Encrypt the data using the provided key.
 * @param dataText The data to be encrypted.
 * @param key The key to be used for encryption.
 */
export function encrypt(dataText: string, key: Buffer): Buffer {
  const iv = getIV();
  const cipher = crypto.createCipheriv(ALGORITHM.BLOCK_CIPHER, key, iv) as crypto.CipherGCM;
  let encryptedData = cipher.update(dataText);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);
  return Buffer.concat([iv, encryptedData, cipher.getAuthTag()]);
}

/**
 * Decrypt the ciphertext using the provided key.
 * @param ciphertext The ciphertext to be decrypted.
 * @param key The key to be used for decryption.
 */
export function decrypt(ciphertext: Buffer, key: Buffer): Buffer {
  const authTag = ciphertext.subarray(-16);
  const iv = ciphertext.subarray(0, 12);
  const encryptedMessage = ciphertext.subarray(12, -16);
  const decipher = crypto.createDecipheriv(ALGORITHM.BLOCK_CIPHER, key, iv) as crypto.DecipherGCM;
  decipher.setAuthTag(authTag);
  let messageText = decipher.update(encryptedMessage);
  messageText = Buffer.concat([messageText, decipher.final()]);
  return messageText;
}

export function encryptData(pin:string, data: string){
  const key = getKeyFromPin(Buffer.from(pin, 'utf8'));
  const encrypted = encrypt(data, key);
  return encrypted.toString('base64');
}

export function decryptData(pin: string, data: string): string | Error {
  try {
    const key = getKeyFromPin(Buffer.from(pin, 'utf8'));
    const decrypted = decrypt(Buffer.from(data, 'base64'), key);
    return decrypted.toString('utf8');
  } catch (error: any) {
    return new Error('DECRYPTION_FAILED');
  }
}
