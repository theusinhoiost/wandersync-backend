export abstract class Aes256GCMEncryption {
    abstract encrypt(data: string, password: string): Promise<string>;
    abstract decrypt(encryptedHex: string, password: string): Promise<string>;
}
