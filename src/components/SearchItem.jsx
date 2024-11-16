import React from 'react';

function getDate(dates) {
  if (!dates || !dates.start) return ''; // Ensure dates.start exists before accessing its properties
  let dateString = dates.start.localDate;
  if (dates.start.localTime) {
    dateString = `${dates.start.localDate}T${dates.start.localTime}Z`;
  }
  return new Date(dateString).toGMTString().replace(':00 GMT', '');
}

function SearchItem({ data }) {
  // Check if necessary properties exist before rendering
  const image = data.images ? data.images.find(image => image.ratio === "16_9" && image.width === 640) : null;
  const venue = data._embedded && data._embedded.venues && data._embedded.venues[0] ? data._embedded.venues[0].name : 'Venue not available';
  const date = data.dates ? getDate(data.dates) : 'Date not available';

  return (
    <div className="md:ml-4 rounded bg-white shadow overflow-hidden">
      {image ? (
        <img
          className="w-full"
          src={image.url}
          alt={data.name || 'Event Image'}
        />
      ) : (
        <div className="w-full h-64 bg-gray-200"></div> // Placeholder for missing image
      )}
      <div className="p-4 leading-tight">
        <p className="font-bold mb-2 md:h-10 overflow-hidden">{data.name || 'Event name not available'}</p>
        <p className="text-sm mb-2">{venue}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
}

export default SearchItem;
