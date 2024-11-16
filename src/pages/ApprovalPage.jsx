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
        <h2 className="text-xl font-bold">The ticket transfer has been cancelled or token is invalid.</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Hero onSubmit={onSubmit} />
      <Promotions />
      <div style={{ padding: '1.5rem', backgroundColor: '#f7fafc', maxWidth: '960px', margin: '0 auto', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>

      <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.75)', color: 'white', textAlign: 'center', padding: '1rem', borderRadius: '0.375rem 0.375rem 0 0', zIndex: 10 }}>
            <p>
              This ticket is being transferred to <strong>{email}</strong>. The ownership transfer can take up to 15 minutes to complete unless retracted. The protected ticket information will be delivered to your email shortly.
            </p>
          </div>
          {/* Flex container for image and event details */}
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem', 
            padding: '1.5rem', 
            marginTop: '2rem', 
            marginBottom: '2rem', 
            backgroundColor: 'white', 
            borderRadius: '0.375rem', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
          }}>
            {/* Image */}
            <div style={{ 
              flex: 1, 
              minWidth: '300px', 
              maxWidth: '50%', 
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '240px', overflow: 'hidden', borderRadius: '0.375rem' }}>
                <img 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  src={ticketDetails.coverImage} 
                  alt={ticketDetails.eventName} 
                />
              </div>
            </div>
            {/* Event Details */}
            <div style={{ 
              flex: 1, 
              minWidth: '300px', 
              maxWidth: '50%', 
              display: 'flex', 
              flexDirection: 'column' 
            }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1.5rem' }}>{ticketDetails.eventName}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '1.125rem', color: '#4a5568', display: 'flex', alignItems: 'center' }}>
                  <FaCalendarAlt style={{ marginRight: '0.5rem', color: '#3182ce' }} /> {ticketDetails.date}
                </p>
                <p style={{ fontSize: '1.125rem', color: '#4a5568', display: 'flex', alignItems: 'center' }}>
                  <FaClock style={{ marginRight: '0.5rem', color: '#3182ce' }} /> {ticketDetails.time}
                </p>
                <p style={{ fontSize: '1.125rem', color: '#4a5568', display: 'flex', alignItems: 'center' }}>
                  <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: '#3182ce' }} /> {ticketDetails.venue}, {ticketDetails.location}
                </p>
                <p style={{ fontSize: '1.125rem', color: '#2d3748', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                  <FaChair style={{ marginRight: '0.5rem', color: '#3182ce' }} /> Section {ticketDetails.section}, Row {ticketDetails.row}, Seat {ticketDetails.seat}
                </p>
              </div>
            </div>
          </div>
        </div>
              
        {/* Terms and Conditions Section */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '1rem' }}>Ticket Transfer Terms and Conditions</h3>
          <p style={{ fontSize: '1rem', color: '#4a5568' }}>
            The ownership transfer of your ticket for {ticketDetails.eventName} on {ticketDetails.date} at {ticketDetails.time}, taking place at {ticketDetails.venue}, {ticketDetails.location}, is currently being processed. This ticket has been resold, and its price may differ from the original face value. The transfer is final, and no refunds or exchanges will be offered. The ticket is valid only for the specific event, date, and time listed. You will be seated in Section {ticketDetails.section}, Row {ticketDetails.row}, Seat {ticketDetails.seat}. It is your responsibility to verify all event details, including any schedule changes or venue adjustments. Our platform is not liable for cancellations or changes made by the event organizer. Thank you for choosing our platform for your ticket resale needs. We hope you enjoy the event and have an unforgettable experience!
          </p>

        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ApprovalPage;
