export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { reference } = req.query

  if (!reference) {
    return res.status(400).json({ message: 'Reference required' })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY

  try {
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    })

    const data = await paystackRes.json()

    if (!data.status || data.data.status !== 'success') {
      return res.status(400).json({ verified: false, message: 'Payment not verified' })
    }

    return res.status(200).json({
      verified: true,
      amount: data.data.amount / 100,
      email: data.data.customer.email,
      reference: data.data.reference,
      metadata: data.data.metadata,
    })
  } catch (err) {
    console.error('Verify error:', err)
    return res.status(500).json({ message: 'Verification failed' })
  }
}
