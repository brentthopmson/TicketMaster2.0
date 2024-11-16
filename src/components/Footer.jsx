import React from 'react';

function Footer(props) {
  return (
    <footer
      style={{
        backgroundColor: '#f0f0f0', // Light gray background for entire footer
        padding: '2rem 1rem', // Padding for spacing
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for elegance
        }}
      >

        {/* Links Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.9rem',
            color: '#555',
          }}
        >
          <a
            href="https://www.ticketmaster.com/h/privacy.html"
            style={{
              color: '#0073e6',
              textDecoration: 'none',
            }}
          >
            Privacy Policy
          </a>
          <span style={{ color: '#555' }}>
            © 1999-2024 Ticketmaster. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
