import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { Aes256GCMEncryption } from './aes-256-encryption.service';

const scryptAsync = promisify(scrypt);


export abstract class Encryption extends Aes256GCMEncryption {
    private readonly algorithm = 'aes-256-gcm';
    private readonly keyLength = 32;
    private readonly ivLength = 12;
    private readonly saltLength = 16;
    private readonly authTagLength = 16;

    private async deriveKey(password: string, salt: Buffer): Promise<Buffer> {
        return (await scryptAsync(password, salt, this.keyLength)) as Buffer;
    }

    async encrypt(data: string, password: string): Promise<string> {
        const salt = randomBytes(this.saltLength);
        const iv = randomBytes(this.ivLength);
        const key = await this.deriveKey(password, salt);

        const cipher = createCipheriv(this.algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();

        return Buffer.concat([salt, iv, authTag, encrypted]).toString('hex');
    }

    async decrypt(encryptedHex: string, password: string): Promise<string> {
        const data = Buffer.from(encryptedHex, 'hex');

        const salt = data.subarray(0, this.saltLength);
        const iv = data.subarray(this.saltLength, this.saltLength + this.ivLength);
        const authTag = data.subarray(this.saltLength + this.ivLength, this.saltLength + this.ivLength + this.authTagLength);
        const encrypted = data.subarray(this.saltLength + this.ivLength + this.authTagLength);

        const key = await this.deriveKey(password, salt);

        const decipher = createDecipheriv(this.algorithm, key, iv);
        decipher.setAuthTag(authTag);

        try {
            const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
            return decrypted.toString('utf8');
        } catch (error) {
            throw new Error('Descriptografia falhou: senha incorreta ou dados corrompidos');
        }
    }
}