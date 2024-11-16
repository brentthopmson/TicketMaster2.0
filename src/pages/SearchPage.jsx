import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchItem from '../components/SearchItem';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import api from '../api';

const SearchPage = () => {
  const { keyword } = useParams();
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
      console.log(response)
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
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Search Results for "{keyword}"
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
                onClick={() => handleEventClick(event.id)}
              >
                <SearchItem data={event} />
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-span-full text-center text-gray-600">
                No events found for "{keyword}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SearchPage;
