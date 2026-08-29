require('dotenv').config({ path: '.env.prod_new' });
async function run() {
  const sepayRes = await fetch("https://my.sepay.vn/userapi/transactions/list?limit=5", {
    headers: { Authorization: `Bearer ${process.env.SEPAY_API_KEY}` },
  });
  const data = await sepayRes.json();
  console.log(JSON.stringify(data.transactions, null, 2));
}
run();
