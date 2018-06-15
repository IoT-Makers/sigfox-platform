// Nodejs Encryption
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const password = process.env.SECRET || 'sgx/Platform2018.!';

export function encrypt(text: string) {
  if (text) {
    try {
      const cipher = crypto.createCipher(algorithm, password);
      let crypted = cipher.update(text, 'utf8', 'hex');
      crypted += cipher.final('hex');
      return crypted;
    } catch (e) {
      console.error(e);
      return '';
    }
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

export function encryptPayload(payload: string, pek: string, ctr: string) {
  if (payload && pek && ctr) {
    try {
      const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(pek, 'hex'), '');
      //cipher.setAutoPadding(false);
      let sessionKey: any = cipher.update(Buffer.from(ctr, 'hex')).toString('hex');
      sessionKey += cipher.final().toString('hex');
      sessionKey = sessionKey.substr(0, payload.length);
      return xor(Buffer.from(payload, 'hex'), Buffer.from(sessionKey, 'hex')).toString('hex');
    } catch (e) {
      console.error(e);
      return '';
    }
  } else {
    return '';
  }
}

export function decryptPayload(payload: string, pek: string, ctr: string) {
  if (payload && pek && ctr) {
    try {
      const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from(pek, 'hex'), '');
      //decipher.setAutoPadding(false);
      let sessionKey = decipher.update(Buffer.from(ctr, 'hex')).toString('hex');
      sessionKey += decipher.final().toString('hex');
      sessionKey = sessionKey.substr(0, payload.length);
      return xor(Buffer.from(payload, 'hex'), Buffer.from(sessionKey, 'hex')).toString('hex');
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

export function xor(a: Buffer, b: Buffer) {
  if (!Buffer.isBuffer(a)) a = new Buffer(a);
  if (!Buffer.isBuffer(b)) b = new Buffer(b);
  const res = [];
  if (a.length > b.length) {
    for (let i = 0; i < b.length; i++) {
      res.push(a[i] ^ b[i]);
    }
  } else {
    for (let i = 0; i < a.length; i++) {
      res.push(a[i] ^ b[i]);
    }
  }
  return new Buffer(res);
}

