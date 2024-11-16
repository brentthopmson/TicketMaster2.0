import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Loading from '../components/Loading';

const DetailPage = () => {
  const { id } = useParams(); // Assuming the ID is in the URL like `/detail/:id`
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/discovery/v2/events/${id}.json`);
        setEventDetails(response.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const getImage = (images) => {
    return images?.find(image => image.ratio === '16_9' && image.width === 640)?.url;
  };

  const getVenue = (venues) => {
    const { name, city, state, country, address } = venues[0];
    const query = state
      ? `${name} ${city.name} ${state.stateCode}`
      : `${name} ${city.name} ${country.name}`;
    const completeAddress = state
      ? `${address.line1} - ${city.name}, ${state.stateCode}`
      : `${address.line1} - ${city.name}, ${country.name}`;
    return (
      <>
        <a
          className="text-blue-700 focus:text-blue-800"
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noopener noreferrer">
          {name}
        </a>
        <div>{completeAddress}</div>
      </>
    );
  };

  const getDate = (dates) => {
    let dateString = dates.start.localDate;
    if (dates.start.localTime) {
      dateString = `${dates.start.localDate}T${dates.start.localTime}Z`;
    }
    return new Date(dateString).toGMTString().replace(':00 GMT', '');
  };

  const getCategory = (categories) => categories[0]?.segment?.name;

  const getPrice = (ranges) => {
    const { currency, min, max } = ranges[0];
    return `${currency} ${min} - ${max}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No event details found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <div className="absolute top-0 left-0 flex items-center w-full p-4 overlay-header">
        <button
          className="flex-none text-white"
          type="button"
          aria-label="Go to previous page"
          onClick={() => navigate(-1)}>
          <svg
            className="fill-current"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 18 18">
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"></path>
          </svg>
        </button>
      </div>
      <img
        className="mb-4"
        alt={eventDetails.name}
        src={getImage(eventDetails.images)}
      />
      <span className="text-sm uppercase block text-gray-600 px-4 mb-1">
        {getCategory(eventDetails.classifications)}
      </span>
      <div className="mb-4">
        <h1 className="font-bold px-4 mb-2">{eventDetails.name}</h1>
        {eventDetails.priceRanges && (
          <div className="font-bold px-4 text-lg text-blue-700">
            {getPrice(eventDetails.priceRanges)}
          </div>
        )}
      </div>
      <div className="px-4 mb-2 flex items-start text-sm">
        {getVenue(eventDetails._embedded.venues)}
      </div>
      <div className="px-4 mb-2 flex items-center text-sm">
        {getDate(eventDetails.dates)}
      </div>
      <div className="fixed max-w-md bottom-0 mx-auto w-full p-4 bg-white">
        <a
          className="block text-center bg-blue-600 font-bold rounded w-full text-white px-4 py-2 focus:bg-blue-700"
          href={eventDetails.url}
          target="_blank"
          rel="noopener noreferrer">
          Buy Ticket
        </a>
      </div>
    </div>
  );
};

export default DetailPage;
