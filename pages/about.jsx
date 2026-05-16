import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About – Gut Check</title>
        <meta name="description" content="Gut Check is a free decision-helper tool that asks you the right questions so your own answer becomes obvious. No advice. No algorithms. Just clarity." />
      </Head>

      <main style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        <p style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', margin: '0 0 1rem' }}>About</p>

        <h1 style={{ fontSize: '2rem', fontWeight: '500', lineHeight: '1.2', margin: '0 0 1.5rem' }}>
          Your gut already knows.<br />Sometimes it just needs the right questions.
        </h1>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0 0 1.2rem' }}>
            Gut Check is a simple decision-helper tool built for the moments when you're going in circles — texting someone you shouldn't, quitting a job you might love, or buying something you definitely don't need.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0 0 1.2rem' }}>
            We don't tell you what to do. We ask you questions until your own answer becomes obvious. No accounts, no data collection, no algorithm nudging you anywhere.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0' }}>
            Just clarity.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', margin: '2rem 0' }}>
          <div style={{ background: '#f7f7f7', borderRadius: '12px', padding: '1.25rem' }}>
            <p style={{ fontSize: '13px', color: '#999', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Decisions covered</p>
            <p style={{ fontSize: '28px', fontWeight: '500', margin: '0' }}>15+</p>
          </div>
          <div style={{ background: '#f7f7f7', borderRadius: '12px', padding: '1.25rem' }}>
            <p style={{ fontSize: '13px', color: '#999', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Data we collect</p>
            <p style={{ fontSize: '28px', fontWeight: '500', margin: '0' }}>None.</p>
          </div>
          <div style={{ background: '#f7f7f7', borderRadius: '12px', padding: '1.25rem' }}>
            <p style={{ fontSize: '13px', color: '#999', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Advice given</p>
            <p style={{ fontSize: '28px', fontWeight: '500', margin: '0' }}>Zero.</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 1rem' }}>How it works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { n: 1, title: 'Pick your situation', body: 'Choose from scenarios like "Should I text them?" or "Should I quit my job?"' },
              { n: 2, title: 'Answer honestly', body: 'A short series of yes/no questions — the kind you already know the answers to, deep down.' },
              { n: 3, title: 'Get a gut check', body: 'A plain-language verdict based on your answers. Not a command. Just a reflection.' },
            ].map(({ n, title, body }) => (
              <div key={n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '500', color: '#888' }}>{n}</div>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '500', margin: '0 0 2px' }}>{title}</p>
                  <p style={{ fontSize: '14px', color: '#666', margin: '0', lineHeight: '1.6' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '500', margin: '0 0 0.75rem' }}>Who made this</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0 0 1rem' }}>
            Gut Check is an independent project built by a solo creator who got tired of going in circles about small decisions and decided to build a tool that short-circuits the spiral.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0 0 1rem' }}>
            It's one of a growing collection of small, useful web tools — built lean, kept honest, and free to use.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '0' }}>
            Questions or feedback? Reach us at{' '}
            <a href="mailto:hello@gutcheck.fyi" style={{ color: '#333', fontWeight: '500' }}>hello@gutcheck.fyi</a>
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}>← Back to Gut Check</Link>
          <Link href="/privacy" style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}>Privacy Policy</Link>
        </div>

      </main>
    </>
  );
}
