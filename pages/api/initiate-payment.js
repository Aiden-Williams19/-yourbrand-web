export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, amount, name, phone, service, metadata } = req.body

  if (!email || !amount || !name) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY

  if (!secretKey) {
    return res.status(500).json({ message: 'Payment configuration missing' })
  }

  try {
    const reference = `devcraft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount, // in kobo (100 = R1)
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?ref=${reference}&service=${encodeURIComponent(service)}&name=${encodeURIComponent(name)}`,
        metadata: {
          ...metadata,
          customer_name: name,
          phone,
          service,
        },
        currency: 'ZAR',
        channels: ['card', 'bank', 'ussd', 'mobile_money', 'eft'],
      }),
    })

    const data = await paystackRes.json()

    if (!data.status) {
      return res.status(400).json({ message: data.message || 'Paystack error' })
    }

    return res.status(200).json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    })
  } catch (err) {
    console.error('Payment init error:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
