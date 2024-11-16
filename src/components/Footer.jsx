import React from 'react';

function Footer(props) {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 py-10 px-6 text-white">
      <div className="max-w-screen-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <p className="text-lg font-medium text-gray-800">
            By continuing past this page, you agree to our{' '}
            <a
              href="https://www.ticketmaster.com/h/terms.html"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Terms of Use
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center text-sm text-gray-600 space-y-4 sm:space-y-0 sm:space-x-8">
          <a
            href="https://www.ticketmaster.com/h/privacy.html"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Privacy Policy
          </a>
          <span>© 1999-2019 Ticketmaster. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
