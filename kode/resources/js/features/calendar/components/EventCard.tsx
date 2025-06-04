import type React from "react";


const EventCard: React.FC = () => {
  return (
    <div className="event-card">
      <div>
        <h6 className="event-title">{`Event title`}</h6>
        <p className="event-time mt-1">{`10:00AM - 12:00AM`}</p>
      </div>
    </div>
  );
};

export default EventCard;
