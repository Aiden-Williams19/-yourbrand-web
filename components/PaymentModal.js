import { useState, useEffect } from 'react'
import Script from 'next/script'

export default function PaymentModal({ service, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [paystackReady, setPaystackReady] = useState(false)

  // Close on ESC
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.'
    if (!form.phone.trim()) return 'Please enter your phone number.'
    return null
  }

  const initializePayment = async () => {
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError('')

    try {
      // Initialize transaction on the backend
      const res = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          amount: service.price * 100, // kobo/cents
          name: form.name,
          phone: form.phone,
          service: service.name,
          metadata: {
            custom_fields: [
              { display_name: 'Service', variable_name: 'service', value: service.name },
              { display_name: 'Customer Name', variable_name: 'customer_name', value: form.name },
              { display_name: 'Phone', variable_name: 'phone', value: form.phone },
            ]
          }
        })
      })

      const data = await res.json()
      if (!res.ok || !data.authorization_url) {
        throw new Error(data.message || 'Payment initialization failed')
      }

      // Redirect to Paystack checkout
      window.location.href = data.authorization_url

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        background: '#111', border: '1px solid rgba(245,240,232,0.12)',
        borderRadius: '1.5rem', padding: '2.5rem',
        width: '100%', maxWidth: '460px',
        animation: 'fadeUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
          <div>
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Ordering</p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem' }}>{service.name}</h2>
            <p style={{ color: 'var(--acid)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.25rem', marginTop: '0.25rem' }}>
              R{service.price}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(245,240,232,0.08)', border: 'none', color: 'var(--paper)',
            width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'rgba(245,240,232,0.15)'}
            onMouseLeave={e => e.target.style.background = 'rgba(245,240,232,0.08)'}>
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Field label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
          <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
          <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+27 82 000 0000" />
        </div>

        {error && (
          <p style={{
            color: '#ff6b6b', fontSize: '0.85rem', marginTop: '1rem',
            background: 'rgba(255,107,107,0.1)', padding: '0.75rem 1rem', borderRadius: '0.5rem',
          }}>
            {error}
          </p>
        )}

        <button
          onClick={initializePayment}
          disabled={loading}
          style={{
            width: '100%', marginTop: '1.5rem',
            background: loading ? 'rgba(200,247,58,0.5)' : 'var(--acid)',
            color: 'var(--ink)',
            border: 'none', padding: '1rem',
            borderRadius: '2rem', fontWeight: 700, fontSize: '1rem',
            fontFamily: 'Syne, sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => !loading && (e.target.style.transform = 'scale(1.02)')}
          onMouseLeave={e => (e.target.style.transform = 'scale(1)')}>
          {loading ? 'Redirecting to Paystack...' : `Pay R${service.price} Securely →`}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.75rem', marginTop: '1rem' }}>
          🔒 Secured by Paystack · Your info is safe
        </p>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.375rem', fontWeight: 500 }}>
        {label}
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', background: 'rgba(245,240,232,0.05)',
          border: '1px solid rgba(245,240,232,0.12)',
          borderRadius: '0.625rem', padding: '0.75rem 1rem',
          color: 'var(--paper)', fontSize: '0.9rem',
          outline: 'none', transition: 'border-color 0.2s',
          fontFamily: 'DM Sans, sans-serif',
        }}
        onFocus={e => e.target.style.borderColor = 'rgba(200,247,58,0.5)'}
        onBlur={e => e.target.style.borderColor = 'rgba(245,240,232,0.12)'}
      />
    </div>
  )
}
