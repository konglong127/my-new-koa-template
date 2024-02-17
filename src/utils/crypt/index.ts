import CryptoJS from "crypto-js";
const SecretKey = "secret key 123";
var data = [{ id: 1 }, { id: 2 }];

export function Encrypt(value: any) {
  return CryptoJS.AES.encrypt(JSON.stringify(value), SecretKey).toString();
}

export function Decrypt(value: string) {
  var bytes = CryptoJS.AES.decrypt(value, SecretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

console.log(Encrypt(data));

console.log(Decrypt(Encrypt(data)));
