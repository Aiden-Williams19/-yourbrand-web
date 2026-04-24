import Head from 'next/head'
import { useState } from 'react'
import PaymentModal from '../components/PaymentModal'

const SERVICES = [
  {
    id: 'starter',
    name: 'Starter Site',
    tagline: 'Get online with a clean, fast website',
    price: 5,
    features: [
      'Single-page website',
      'Custom design to your brand',
      'Mobile responsive layout',
      'Contact form included',
      'Deployed & live on the web',
    ],
    accent: '#c8f73a',
  },
  {
    id: 'business',
    name: 'Business Website',
    tagline: 'A full site that converts visitors',
    price: 8,
    features: [
      'Up to 5 pages',
      'Custom UI/UX design',
      'SEO optimized structure',
      'Contact & inquiry forms',
      'Social media links',
      'Fast CDN hosting',
    ],
    accent: '#e8451a',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro Web Design',
    tagline: 'Premium design with all the extras',
    price: 9,
    features: [
      'Unlimited pages',
      'Premium custom design',
      'Advanced animations',
      'Blog or portfolio section',
      'Analytics dashboard',
      'Priority 24h delivery',
    ],
    accent: '#c8f73a',
  },
]

const STACK = ['Web Design', 'UI/UX', 'Next.js', 'React', 'Tailwind CSS', 'Figma', 'SEO', 'Responsive Design', 'Web Design', 'UI/UX', 'Next.js', 'React', 'Tailwind CSS', 'Figma', 'SEO', 'Responsive Design']

export default function Home() {
  const [selectedService, setSelectedService] = useState(null)

  return (
    <>
      <Head>
        <title>YourBrand — Web Design from R5</title>
        <meta name="description" content="Professional web design & development services starting from R5. Beautiful, custom-built websites delivered fast." />
        <meta property="og:title" content="YourBrand — Web Design from R5" />
        <meta property="og:description" content="Professional web design & development services starting from R5." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>

        {/* NAV */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          borderBottom: '1px solid rgba(245,240,232,0.08)',
          backdropFilter: 'blur(12px)',
          background: 'rgba(10,10,10,0.85)',
          padding: '1rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
            Your<span style={{ color: 'var(--acid)' }}>Brand</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#services" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = 'var(--paper)'}
               onMouseLeave={e => e.target.style.color = 'var(--muted)'}>Services</a>
            <a href="#how" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = 'var(--paper)'}
               onMouseLeave={e => e.target.style.color = 'var(--muted)'}>How it works</a>
            <a href="#services" style={{
              background: 'var(--acid)', color: 'var(--ink)',
              padding: '0.5rem 1.25rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem',
              fontFamily: 'Syne, sans-serif',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
              Get Started
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '8rem 2rem 4rem',
          maxWidth: '1100px', margin: '0 auto',
          position: 'relative',
        }}>
          {/* Background orb */}
          <div style={{
            position: 'absolute', top: '20%', right: '-10%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,247,58,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(200,247,58,0.1)', border: '1px solid rgba(200,247,58,0.3)',
            borderRadius: '2rem', padding: '0.375rem 1rem', marginBottom: '2rem',
            width: 'fit-content',
          }} className="animate-fade-up">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acid)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--acid)', fontWeight: 500 }}>Starting from R5 — no joke</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: '1.0',
            marginBottom: '1.5rem',
            opacity: 0,
          }} className="animate-fade-up delay-100">
            Websites that<br />
            <span style={{ color: 'var(--acid)' }}>actually work.</span><br />
            <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '0.7em' }}>For almost nothing.</span>
          </h1>

          <p style={{
            fontSize: '1.125rem', color: 'var(--muted)', maxWidth: '520px',
            marginBottom: '2.5rem', lineHeight: 1.7, opacity: 0,
          }} className="animate-fade-up delay-200">
            Custom web design & development — from single landing pages to full multi-page business sites. Built from scratch, designed to impress, deployed live. Starting at R5.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', opacity: 0 }} className="animate-fade-up delay-300">
            <a href="#services" style={{
              background: 'var(--paper)', color: 'var(--ink)',
              padding: '0.875rem 2rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
              fontFamily: 'Syne, sans-serif',
              transition: 'transform 0.2s, background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = 'var(--acid)'}
              onMouseLeave={e => e.target.style.background = 'var(--paper)'}>
              View Packages →
            </a>
            <a href="#how" style={{
              border: '1px solid rgba(245,240,232,0.2)', color: 'var(--paper)',
              padding: '0.875rem 2rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 500, fontSize: '1rem',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.target.style.borderColor = 'var(--paper)'}
              onMouseLeave={e => e.target.style.borderColor = 'rgba(245,240,232,0.2)'}>
              How it works
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '3rem', marginTop: '5rem',
            borderTop: '1px solid rgba(245,240,232,0.08)', paddingTop: '2rem',
            opacity: 0,
          }} className="animate-fade-up delay-500">
            {[['R5', 'Starting price'], ['48h', 'Delivery time'], ['100%', 'Live deployed'], ['∞', 'Revisions*']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: 'var(--acid)' }}>{val}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          borderBottom: '1px solid rgba(245,240,232,0.08)',
          padding: '1rem 0',
          background: 'rgba(245,240,232,0.02)',
        }}>
          <div style={{ display: 'flex', gap: '3rem', width: 'max-content' }} className="animate-marquee">
            {STACK.map((tech, i) => (
              <span key={i} style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 600,
                fontSize: '0.875rem', color: i % 3 === 0 ? 'var(--acid)' : 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap',
              }}>
                {tech} <span style={{ color: 'rgba(245,240,232,0.15)', marginLeft: '1.5rem' }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <section id="services" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <p style={{ color: 'var(--acid)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              Pricing
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}>
              Pick your package
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} onSelect={() => setSelectedService(service)} />
            ))}
          </div>

          <p style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.8rem', textAlign: 'center' }}>
            *Unlimited revisions within 7 days of delivery. Payment secured by Paystack.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" style={{
          padding: '6rem 2rem',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          background: 'rgba(245,240,232,0.02)',
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ color: 'var(--acid)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              Process
            </p>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              How it works
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
              {[
                { step: '01', title: 'Choose a package', desc: 'Pick the plan that fits your needs and budget above.' },
                { step: '02', title: 'Pay securely', desc: 'Instant payment via Paystack — card, EFT, or mobile.' },
                { step: '03', title: 'We build it', desc: 'Your site is designed and developed within 48 hours.' },
                { step: '04', title: 'Go live', desc: 'We deploy to a fast CDN and hand over the keys to your domain.' },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{
                  background: 'rgba(245,240,232,0.04)',
                  border: '1px solid rgba(245,240,232,0.08)',
                  borderRadius: '1rem', padding: '2rem',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,247,58,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)'}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '3rem', color: 'rgba(200,247,58,0.15)', marginBottom: '1rem' }}>{step}</div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', marginBottom: '1.5rem',
            }}>
              Ready to get<br /><span style={{ color: 'var(--acid)' }}>online today?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
              Your competitors already have websites. Don&apos;t let the price be the reason you don&apos;t.
            </p>
            <a href="#services" style={{
              background: 'var(--acid)', color: 'var(--ink)',
              padding: '1rem 2.5rem', borderRadius: '2rem',
              textDecoration: 'none', fontWeight: 700, fontSize: '1rem',
              fontFamily: 'Syne, sans-serif',
              display: 'inline-block',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
              Start Now — From R5 →
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: '1px solid rgba(245,240,232,0.08)',
          padding: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
          maxWidth: '1100px', margin: '0 auto',
        }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            Your<span style={{ color: 'var(--acid)' }}>Brand</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} DevCraft. All rights reserved.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            Payments secured by Paystack 🔒
          </p>
        </footer>
      </div>

      {selectedService && (
        <PaymentModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  )
}

function ServiceCard({ service, onSelect }) {
  return (
    <div style={{
      background: service.featured ? 'rgba(200,247,58,0.06)' : 'rgba(245,240,232,0.03)',
      border: `1px solid ${service.featured ? 'rgba(200,247,58,0.4)' : 'rgba(245,240,232,0.08)'}`,
      borderRadius: '1.25rem',
      padding: '2rem',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
      transition: 'transform 0.2s, border-color 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        if (!service.featured) e.currentTarget.style.borderColor = 'rgba(245,240,232,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        if (!service.featured) e.currentTarget.style.borderColor = 'rgba(245,240,232,0.08)'
      }}>

      {service.featured && (
        <div style={{
          position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--acid)', color: 'var(--ink)',
          padding: '0.25rem 1rem', borderRadius: '2rem',
          fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Syne, sans-serif',
          whiteSpace: 'nowrap',
        }}>
          MOST POPULAR
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.375rem', marginBottom: '0.375rem' }}>
          {service.name}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{service.tagline}</p>
      </div>

      <div style={{ marginBottom: '1.75rem' }}>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '3.5rem', color: service.accent, lineHeight: 1 }}>
          R{service.price}
        </span>
        <span style={{ color: 'var(--muted)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>once-off</span>
      </div>

      <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1 }}>
        {service.features.map((feat) => (
          <li key={feat} style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            fontSize: '0.9rem', color: 'var(--paper)', marginBottom: '0.625rem',
          }}>
            <span style={{ color: service.accent, fontSize: '1rem', lineHeight: 1 }}>✓</span>
            {feat}
          </li>
        ))}
      </ul>

      <button onClick={onSelect} style={{
        background: service.featured ? 'var(--acid)' : 'transparent',
        color: service.featured ? 'var(--ink)' : 'var(--paper)',
        border: service.featured ? 'none' : '1px solid rgba(245,240,232,0.3)',
        padding: '0.875rem 1.5rem',
        borderRadius: '2rem',
        fontWeight: 700, fontSize: '0.9rem',
        fontFamily: 'Syne, sans-serif',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s, transform 0.15s',
        width: '100%',
      }}
        onMouseEnter={e => {
          e.target.style.background = service.featured ? '#d4f54f' : 'var(--acid)'
          e.target.style.color = 'var(--ink)'
          e.target.style.border = 'none'
          e.target.style.transform = 'scale(1.02)'
        }}
        onMouseLeave={e => {
          e.target.style.background = service.featured ? 'var(--acid)' : 'transparent'
          e.target.style.color = service.featured ? 'var(--ink)' : 'var(--paper)'
          e.target.style.border = service.featured ? 'none' : '1px solid rgba(245,240,232,0.3)'
          e.target.style.transform = 'scale(1)'
        }}>
        Get {service.name} — R{service.price}
      </button>
    </div>
  )
}
