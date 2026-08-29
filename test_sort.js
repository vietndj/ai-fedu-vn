const SEPAY_API_KEY = process.env.SEPAY_API_KEY;
async function run() {
    const sepayRes = await fetch("https://my.sepay.vn/userapi/transactions/list?limit=20&sort_by=transaction_date&sort_dir=desc", {
      headers: {
        Authorization: `Bearer ${SEPAY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const text = await sepayRes.text();
    console.log("Status:", sepayRes.status);
    console.log("Response:", text);
}
run();
