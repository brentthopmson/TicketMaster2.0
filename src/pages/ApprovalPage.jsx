import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import Promotions from '../components/Promotions';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaClock } from 'react-icons/fa';

const hardcodedTicketDetails = {
  coverImage: 'https://snworksceo.imgix.net/cav/5b854ca2-7f1d-4130-bc36-2456bbfac741.sized-1000x1000.jpg?w=1000',
  eventName: 'BILLIE EILISH: HIT ME HARD AND SOFT: THE TOUR',
  date: 'Sun, Dec 15',
  time: '7:00 PM',
  venue: 'Kia Forum',
  location: 'Inglewood, CA',
  section: '126',
  row: '7',
  seat: '1',
};

const ApprovalPage = () => {
  const { token, email } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(hardcodedTicketDetails);

  const onSubmit = (keyword) => {
    navigate(`/search?keyword=${keyword}`);
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxcoCDXcWlKPDbttlFf2eR_EeuMkfupy5dfgIOklM1ShEZ30gfD3wzZZOxkKV4xIWEl/exec',
          {
            method: 'GET',
            headers: { 'Content-Type': 'text/plain' },
          }
        );
        const data = await response.json();
        const ticket = data.find(item => item.token === token && item.stamp === '');

        if (ticket) {
          setIsApproved(true);
          setTicketDetails({ ...hardcodedTicketDetails, ...ticket });
        } else {
          setIsApproved(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsApproved(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token]);

  useEffect(() => {
    if (isApproved) {
      const updateStamp = async () => {
        try {
          const plainTextData = `token=${token}&email=${email}&stamp=${new Date().toISOString()}`;
          const response = await fetch(
            'https://script.google.com/macros/s/AKfycbxcoCDXcWlKPDbttlFf2eR_EeuMkfupy5dfgIOklM1ShEZ30gfD3wzZZOxkKV4xIWEl/exec',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: plainTextData,
            }
          );

          if (!response.ok) {
            throw new Error('Failed to update stamp');
          }
        } catch (error) {
          console.error('Error updating stamp:', error);
        }
      };

      updateStamp();
    }
  }, [isApproved, token, email]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Ticket request has been cancelled or token is invalid.</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Hero onSubmit={onSubmit} />
      <Promotions />
      <div className="p-6 bg-white max-w-3xl mx-auto">
        <div className="relative shadow-xl rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-black bg-opacity-75 text-white text-center p-4 z-10">
            <p>
              This ticket is being transferred to <strong>{email}</strong>. The ownership transfer can take up to 10 minutes to complete unless retracted by the initial owner.
            </p>
          </div>
          {/* Reduced Image Size */}
          <div className="w-full h-48 md:h-64 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={ticketDetails.coverImage} 
              alt={ticketDetails.eventName} 
            />
          </div>
          <div className="p-6">
            {/* Event Information Section with Icons */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{ticketDetails.eventName}</h2>
              <div className="flex items-center text-lg text-gray-600 mb-2">
                <FaCalendarAlt className="mr-2" /> {ticketDetails.date} 
                <FaClock className="ml-4 mr-2" /> {ticketDetails.time}
              </div>
              <div className="flex items-center text-lg text-gray-600 mb-4">
                <FaMapMarkerAlt className="mr-2" /> {ticketDetails.venue}, {ticketDetails.location}
              </div>
            </div>
            {/* Seating Information with Icon */}
            <div className="flex items-center text-lg text-gray-800">
              <FaChair className="mr-2" /> Section {ticketDetails.section}, Row {ticketDetails.row}, Seat {ticketDetails.seat}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ApprovalPage;
