const fs = require('fs');

function patchCheck() {
  let content = fs.readFileSync('api/payment/check.ts', 'utf-8');
  content = content.replace(/const COURSE_AMOUNT = 499000;/g, 'const COURSE_AMOUNT = parseInt(process.env.COURSE_AMOUNT || "0", 10);');
  if (!content.includes('if (COURSE_AMOUNT === 0)')) {
    content = content.replace(/export async function GET\(req: Request\) \{/g, `export async function GET(req: Request) {\n  if (COURSE_AMOUNT === 0) {\n    console.error("COURSE_AMOUNT is not set");\n    return new Response(JSON.stringify({ found: false }), { status: 200, headers: { "Content-Type": "application/json" } });\n  }`);
  }
  fs.writeFileSync('api/payment/check.ts', content);
}

function patchConfirm() {
  let content = fs.readFileSync('api/payment/confirm.ts', 'utf-8');
  content = content.replace(/const GOOGLE_SCRIPT_URL = ".*";/g, 'const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";');
  content = content.replace(/const MAKE_WEBHOOK_URL = ".*";/g, 'const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";');
  content = content.replace(/const TELEGRAM_BOT_TOKEN = ".*";/g, 'const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";');
  content = content.replace(/const TELEGRAM_CHAT_ID = ".*";/g, 'const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";');
  fs.writeFileSync('api/payment/confirm.ts', content);
}

function patchWebhook() {
  let content = fs.readFileSync('api/payment/webhook.ts', 'utf-8');
  content = content.replace(/const COURSE_AMOUNT = 499000;/g, 'const COURSE_AMOUNT = parseInt(process.env.COURSE_AMOUNT || "0", 10);');
  content = content.replace(/const GOOGLE_SCRIPT_URL = ".*";/g, 'const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";');
  content = content.replace(/const MAKE_WEBHOOK_URL = ".*";/g, 'const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "";');
  content = content.replace(/const TELEGRAM_BOT_TOKEN = ".*";/g, 'const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";');
  content = content.replace(/const TELEGRAM_CHAT_ID = ".*";/g, 'const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";');
  fs.writeFileSync('api/payment/webhook.ts', content);
}

function patchLead() {
  let content = fs.readFileSync('api/lead/register.ts', 'utf-8');
  content = content.replace(/const GOOGLE_SCRIPT_URL = ".*";/g, 'const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";');
  fs.writeFileSync('api/lead/register.ts', content);
}

patchCheck();
patchConfirm();
patchWebhook();
patchLead();
console.log("Patched API files");
