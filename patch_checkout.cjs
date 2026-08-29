const fs = require('fs');
let content = fs.readFileSync('src/Checkout.tsx', 'utf-8');

content = `import { siteConfig } from './site.config';\n` + content;

content = content.replace(/const LANTAN_FAQS = \[/g, "export const LANTAN_FAQS = [");

content = content.replace(/const prefix = \(c as any\)\.transferPrefix \|\| "AICREATOR";/g, "const prefix = (c as any).transferPrefix || siteConfig.product.transferPrefix;");

content = content.replace(/const BANK: BankInfo = \{ name: "TPBank", account: "88804101986", holder: "NGUYEN DUC VIET", amount: c.price, content: transferContent \};/g, "const BANK: BankInfo = { name: siteConfig.payment.bankName, account: siteConfig.payment.accountNumber, holder: siteConfig.payment.accountName, amount: c.price, content: transferContent };");

content = content.replace(/const QR_URL = `https:\/\/img.vietqr.io\/image\/TPB-\$\{BANK.account\}-compact2.png\?amount=\$\{c.price.replace\(\/\\.\/g, ""\)\}&addInfo=\$\{encodeURIComponent\(transferContent\)\}&accountName=\$\{encodeURIComponent\(BANK.holder\)\}`;/g, "const QR_URL = `https://img.vietqr.io/image/${siteConfig.payment.bankCode}-${BANK.account}-compact2.png?amount=${c.price.replace(/\\./g, '')}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK.holder)}`;");

content = content.replace(/value: priceVal \|\| 499000,/g, "value: priceVal || parseInt(siteConfig.product.price.replace(/\\./g, ''), 10),");

content = content.replace(/content_name: 'AI Creator System'/g, "content_name: siteConfig.product.name");

fs.writeFileSync('src/Checkout.tsx', content);
console.log("Patched Checkout.tsx");
