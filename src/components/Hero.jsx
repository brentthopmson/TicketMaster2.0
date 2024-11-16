import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [keyword, setKeyword] = React.useState('');
  const navigate = useNavigate();

  const onInput = (e) => {
    setKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        height: '50vh', // Reduced height
        backgroundImage: "url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=40')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* Hero Content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '90%',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', // Responsive font size
            marginBottom: '1rem',
            width: '100%',
          }}
        >
          Discover Your Next Adventure
        </h1>
        <p
          style={{
            marginBottom: '1.5rem',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', // Responsive font size
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          Explore concerts, events, and experiences tailored to you.
        </p>
        <form
          onSubmit={onSubmit}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <input
            value={keyword}
            onChange={onInput}
            style={{
              padding: '1rem',
              borderRadius: '4px 0 0 4px',
              border: 'none',
              flex: '1',
              fontSize: '1rem',
              outline: 'none',
              width: '100%',
            }}
            placeholder="Search for events or artists"
            type="text"
            aria-label="Search for events or artists"
          />
          <button
            type="submit"
            style={{
              padding: '1rem',
              border: 'none',
              backgroundColor: '#0073e6',
              color: 'white',
              fontSize: '1rem',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
