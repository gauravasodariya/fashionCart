async function getKey(req, res) {
  return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy' });
}

async function processPayment(req, res) {
  const { amount } = req.body || {};
  const orderId = 'order_' + Date.now();
  return res.status(200).json({ order: { id: orderId, amount: amount || 0 } });
}

async function verifyPayment(req, res) {
  const reference = 'ref_' + Date.now();
  return res.status(200).json({ success: true, reference });
}

module.exports = { getKey, processPayment, verifyPayment };

