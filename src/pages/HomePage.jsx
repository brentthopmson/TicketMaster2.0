import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Categories from '../components/Categories';
import Guides from '../components/Guides';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  const onSubmit = (keyword) => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <React.Fragment>
      <Hero onSubmit={onSubmit} />
      <Promotions />
      <Categories onClick={onSubmit} />
      <Guides />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
