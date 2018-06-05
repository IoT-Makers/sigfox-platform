// Nodejs Encryption
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = process.env.SECRET || 'sgx/Platform2018.!';

export function encrypt(text: string) {
  if (text) {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  } else {
    return '';
  }
}

export function decrypt(text: string) {
  if (text) {
    try {
      const decipher = crypto.createDecipher(algorithm, password);
      let dec = decipher.update(text, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    } catch (e) {
      console.error(e);
      return '';
    }
  } else {
    return '';
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(64).toString('hex');
}

