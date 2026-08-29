import type { VercelRequest, VercelResponse } from '@vercel/node';

declare const process: any;
const SEPAY_API_KEY = process.env.SEPAY_API_KEY ?? "";
const COURSE_AMOUNT = parseInt(process.env.COURSE_AMOUNT || "0", 10);

interface SePayTransaction {
  id: string;
  bank_brand_name: string;
  account_number: string;
  transaction_date: string;
  amount_in: string;
  amount_out: string;
  transaction_content: string;
  reference_number: string;
}

interface SePayResponse {
  status: number;
  transactions?: SePayTransaction[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(455).json({ error: 'Method not allowed' });
  }

  try {
    const since = req.query.since as string;
    const phone = req.query.phone as string;

    if (!since || !phone) {
      return res.status(200).json({ found: false });
    }

    // Allow 15 minutes of clock drift in case the client clock is fast
    const sinceMs = parseInt(since, 10) - 15 * 60 * 1000;

    if (!SEPAY_API_KEY) {
      console.warn("SEPAY_API_KEY environment variable is not configured.");
      return res.status(200).json({ found: false });
    }

    const sepayRes = await fetch("https://my.sepay.vn/userapi/transactions/list?limit=20", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${SEPAY_API_KEY}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!sepayRes.ok) {
      console.error(`SePay list API failed with status ${sepayRes.status}`);
      return res.status(200).json({ found: false });
    }

    const data = await sepayRes.json() as SePayResponse;

    if (!data.transactions) {
      return res.status(200).json({ found: false });
    }
    console.log(`[SePay Debug] Fetched ${data.transactions.length} transactions.`);
    if (data.transactions.length > 0) {
      console.log(`[SePay Debug] Latest tx: amount=${data.transactions[0].amount_in}, content=${data.transactions[0].transaction_content}`);
    }

    // Strip leading zeros and all spaces/dashes for robust comparison
    const searchPhone = phone.replace(/^0+/, '').replace(/[\s\-]/g, '');

    const match = data.transactions.find((tx) => {
      const amountIn = parseFloat(tx.amount_in);
      
      // Parse SePay timezone: "YYYY-MM-DD HH:mm:ss" in GMT+7. We append +07:00
      const txTimeString = tx.transaction_date.trim() + "+07:00";
      const txTime = new Date(txTimeString).getTime();
      
      const content = (tx.transaction_content || "").toLowerCase().replace(/[\s\-]/g, '');
      const hasPhone = content.includes(searchPhone);
      
      console.log(`[SePay Debug Match] txId=${tx.id} amount=${amountIn}===${COURSE_AMOUNT} time=${txTime}>=${sinceMs} content=${content} includes=${searchPhone}?${hasPhone}`);
      
      return amountIn === COURSE_AMOUNT && txTime >= sinceMs && hasPhone;
    });

    if (match) {
      console.log(`Payment match found! ID: ${match.id}, Amount: ${match.amount_in}`);
      return res.status(200).json({ found: true, transaction: match });
    }

    return res.status(200).json({ found: false });
  } catch (err: any) {
    console.error("Error checking SePay transactions:", err);
    return res.status(500).json({ error: "Failed to check payment", details: err.message });
  }
}
