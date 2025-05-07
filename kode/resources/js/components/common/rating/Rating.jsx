import { RiStarSFill } from "react-icons/ri";

import "../rating/rating.scss";

const Rating = ({ rateCount = 0, allRate = null, ...props }) => {
  const attributes = {
    ...props,
    className: `rating-wrapper ${props.className || ""}`,
  };
  return (
    <div {...attributes}>
      <div className={`rating rating-${rateCount}`}>
        {Array.from({ length: 5 }).map((rate, ind) => (
          <RiStarSFill key={ind} className="rate-icon" />
        ))}
      </div>

      {allRate && <span className="rating-count">({allRate})</span>}
    </div>
  );
};

export default Rating;
