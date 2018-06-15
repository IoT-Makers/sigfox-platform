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

export function computeSessionKey(pek: string, ctr: string) {
  if (pek && ctr) {
    try {
      const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from(pek, 'hex'), '');
      cipher.setAutoPadding(false);
      let sessionKey = cipher.update(Buffer.from(ctr, 'hex')).toString('hex');
      sessionKey += cipher.final().toString('hex');
      return sessionKey;
    } catch (e) {
      console.error(e);
      return '';
    }
  } else {
    return '';
  }
}

export function computeCtr(deviceId: string, isUplink: boolean, seqNumber: string): string {
  if (deviceId && seqNumber) {
    deviceId = parseInt(deviceId, 16).toString(2);
    while (deviceId.length < 32) {
      deviceId = '0' + deviceId;
    }
    let uplinkOrDownlink = '0';
    if (!isUplink) {
      uplinkOrDownlink = '1';
    }
    seqNumber = parseInt(seqNumber, 10).toString(2);
    while (seqNumber.length < 12) {
      seqNumber = '0' + seqNumber;
    }
    let padding = '';
    while (padding.length < 83) {
      padding = '0' + padding;
    }

    let ctr = deviceId + uplinkOrDownlink + seqNumber + padding;
    ctr = parseInt(ctr, 2).toString(16);
    while (ctr.length < 32) {
      ctr = '0' + ctr;
    }
    return ctr;
  }
  return '';
}

export function encryptPayload(payload: string, pek: string, ctr: string): string {
  if (payload && pek && ctr) {
    const sessionKey = computeSessionKey(pek, ctr).substr(0, payload.length);
    return xor(Buffer.from(payload, 'hex'), Buffer.from(sessionKey, 'hex')).toString('hex');
  } else {
    return '';
  }
}

export function decryptPayload(encryptedPayload: string, pek: string, ctr: string) {
  if (encryptedPayload && pek && ctr) {
    const sessionKey = computeSessionKey(pek, ctr).substr(0, encryptedPayload.length);
    return xor(Buffer.from(encryptedPayload, 'hex'), Buffer.from(sessionKey, 'hex')).toString('hex');
  } else {
    return '';
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(64).toString('hex');
}

export function xor(a: Buffer, b: Buffer) {
  if (!Buffer.isBuffer(a)) a = Buffer.from(a);
  if (!Buffer.isBuffer(b)) b = Buffer.from(b);
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
  return Buffer.from(res);
}

