const fs = require('fs'); 
const path = require('path'); 

/**
 * 读取密钥和公内容
 */
const privateKey = fs.readFileSync(path.join('private.key'));
const publicKey = fs.readFileSync(path.join('public.key')); 

/**
 * 转换为Base64 
 */
const privateKeyBase64 = Buffer.from(privateKey).toString('base64'); 
const pulicKeyBase64 = Buffer.from(publicKey).toString('base64'); 


/**
 * 输出转换结果
 */
console.log('\nPrivate Key'); 
console.log(privateKeyBase64); 

console.log('\nPublic Key'); 
console.log(pulicKeyBase64); 

