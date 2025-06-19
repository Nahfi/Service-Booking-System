import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const CampaignTable: React.FC = () => {
  return (
    <>
      <thead>
        <tr>
          <th>
            <input type="checkbox" className="me-3" /> MY CAMPAIGNS
          </th>
          <th>Sent</th>
          <th>Delivered</th>
          <th>Opens</th>
          <th>Clicks</th>
          <th>Actions </th>
        </tr>
      </thead>
      
      <tbody>
        {Array.from({ length: 5 }).map((_, ind) => (
          <tr key={ind}>
            <td>
              <div className="d-flex justify-content-start align-items-start gap-3">
                <input type="checkbox" />
                <div>
                  <h6 className="fs-15 mb-2">
                    This Week New Big Sale Offer Campaign 2024
                  </h6>
                  <p className="fs-13 text--secondary mb-2">
                    Dec 1, 2024, 2:52PM
                  </p>
                  <span className="text--success">
                    <GoDotFill /> Published
                  </span>
                </div>
              </div>
            </td>
            <td>
              <p className="text--primary mb-2">80</p>
              <span className="fs-14">(80.25%)</span>
            </td>
            <td>
              <p className="text--primary mb-2">150</p>
              <span className="fs-14">(95.52%)</span>
            </td>
            <td>
              <p className="text--primary mb-2">45</p>
              <span className="fs-14">(85.02%)</span>
            </td>
            <td>
              <p className="text--primary mb-2">40</p>
              <span className="fs-14">(70.22%)</span>
            </td>
            <td>
              <BsThreeDotsVertical className="fs-20" />
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default CampaignTable;
