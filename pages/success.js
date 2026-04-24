import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const { ref, service, name } = router.query
  const [status, setStatus] = useState('verifying') // verifying | success | failed

  useEffect(() => {
    if (!ref) return

    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-payment?reference=${ref}`)
        const data = await res.json()
        setStatus(data.verified ? 'success' : 'failed')
      } catch {
        setStatus('failed')
      }
    }

    verify()
  }, [ref])

  return (
    <>
      <Head>
        <title>Payment {status === 'success' ? 'Successful' : 'Processing'} — YourBrand</title>
      </Head>

      <div style={{
        minHeight: '100vh', background: 'var(--ink)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center',
      }}>

        {/* Background glow */}
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: status === 'success'
            ? 'radial-gradient(circle, rgba(200,247,58,0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(232,69,26,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {status === 'verifying' && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              border: '3px solid rgba(200,247,58,0.2)',
              borderTop: '3px solid var(--acid)',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1.5rem',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '0.75rem' }}>
              Verifying payment...
            </h1>
            <p style={{ color: 'var(--muted)' }}>Please wait while we confirm your order.</p>
          </div>
        )}

        {status === 'success' && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(200,247,58,0.15)',
              border: '2px solid var(--acid)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem',
            }}>
              ✓
            </div>
            <p style={{ color: 'var(--acid)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
              Payment confirmed
            </p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
              You&apos;re all set{name ? `, ${decodeURIComponent(name)}` : ''}! 🎉
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '0.5rem', maxWidth: '480px' }}>
              We&apos;ve received your order for <strong style={{ color: 'var(--paper)' }}>{service ? decodeURIComponent(service) : 'your website'}</strong>.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2.5rem', maxWidth: '480px' }}>
              Check your inbox — we&apos;ll reach out within <strong style={{ color: 'var(--acid)' }}>24 hours</strong> to get the details we need to build your site.
            </p>
            {ref && (
              <p style={{
                color: 'var(--muted)', fontSize: '0.75rem',
                background: 'rgba(245,240,232,0.04)',
                border: '1px solid rgba(245,240,232,0.08)',
                borderRadius: '0.5rem', padding: '0.5rem 1rem',
                fontFamily: 'monospace', marginBottom: '2rem',
                display: 'inline-block',
              }}>
                Ref: {ref}
              </p>
            )}
            <div>
              <a href="/" style={{
                background: 'var(--acid)', color: 'var(--ink)',
                padding: '0.875rem 2rem', borderRadius: '2rem',
                textDecoration: 'none', fontWeight: 700,
                fontFamily: 'Syne, sans-serif', fontSize: '0.9rem',
              }}>
                ← Back to YourBrand
              </a>
            </div>
          </div>
        )}

        {status === 'failed' && (
          <div style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(232,69,26,0.1)',
              border: '2px solid var(--rust)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2rem', color: 'var(--rust)',
            }}>
              ✕
            </div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>
              Payment could not be verified
            </h1>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '420px' }}>
              Something went wrong. If money was deducted from your account, please contact us with your reference number.
            </p>
            {ref && (
              <p style={{ color: 'var(--muted)', fontSize: '0.75rem', fontFamily: 'monospace', marginBottom: '1.5rem' }}>
                Ref: {ref}
              </p>
            )}
            <a href="/" style={{
              border: '1px solid rgba(245,240,232,0.2)', color: 'var(--paper)',
              padding: '0.875rem 2rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 600,
              fontFamily: 'Syne, sans-serif', fontSize: '0.9rem',
            }}>
              ← Try Again
            </a>
          </div>
        )}
      </div>
    </>
  )
}
