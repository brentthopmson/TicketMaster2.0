import React from 'react';
import promos from '../data/promos';

function Promotions(props) {
  return (
    <section
      style={{
        display: 'flex',
        overflowX: 'auto',
        padding: '1rem',
        gap: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        margin: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {promos.map((guide) => (
        <a
          href={guide.url}
          key={guide.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            border: '1px solid #0073e6',
            borderRadius: '5px',
            color: '#0073e6',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: '#ffffff',
            transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0073e6';
            e.target.style.color = '#ffffff';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffffff';
            e.target.style.color = '#0073e6';
            e.target.style.boxShadow = 'none';
          }}
        >
          {guide.name}
        </a>
      ))}
    </section>
  );
}

export default Promotions;
