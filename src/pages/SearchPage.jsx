import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchItem from '../components/SearchItem';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import api from '../api';

const SearchPage = () => {
  const { keyword } = useParams(); // Get the keyword directly from the URL
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (keyword) {
      fetchEvents(keyword);
    }
  }, [keyword]);

  const fetchEvents = async (keyword) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/discovery/v2/events.json`, { params: { keyword } });
      const eventsData = response.data?._embedded?.events || [];
      setEvents(eventsData);
    } catch (err) {
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newKeyword) => {
    navigate(`/search/${newKeyword}`);
  };

  const handleEventClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Search Bar */}
      <SearchBar value={keyword} onSubmit={handleSearch} />

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-500 text-center py-10">
          {error}
        </div>
      )}

      {/* Events List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="cursor-pointer"
              onClick={() => handleEventClick(event.id)}
            >
              <SearchItem data={event} />
            </div>
          ))}
          {events.length === 0 && (
            <div className="text-center text-gray-600">
              No events found for "{keyword}".
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchPage;
