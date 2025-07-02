import React, { useState } from "react";
import { Dropdown, ProgressBar } from "react-bootstrap";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { LuEllipsisVertical, LuSquarePen, LuTrash2 } from "react-icons/lu";

const CampaignTable: React.FC = ({ actions }) => {

  const initialCampaignStates = Array.from({ length: 7 }, () => true);
  const [stopCampaign, setStopCampaign] = useState(initialCampaignStates);

  const handleStopCampaign = (index) => {
    setStopCampaign((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <>
      <thead>
        <tr>
          <th>
            <div className="d-flex justify-content-start align-items-center gap-2 lh-1">
              <b>#</b>
              <span>Campaign Name</span>
            </div>
          </th>
          <th>Campaign</th>
          <th>Status</th>
          <th>Sent</th>
          <th>Created At</th>
          <th>Actions </th>
        </tr>
      </thead>

      <tbody>
        {Array.from({ length: 7 }).map((_, ind) => (
          <tr key={ind}>
            <td>
              <div className="d-flex justify-content-start align-items-start gap-2">
                <b>{ind + 1}.</b>
                <h6 className="fs-14 mb-1">
                  This Week New Big Sale Offer
                </h6>
              </div>
            </td>

            <td>
              <div>
                <p className="fs-14">
                  Summer Sale Campaign 2024
                </p>
                <div className="d-flex align-items-center gap-2 mt-1 lh-1">
                  <button
                    aria-label={
                      stopCampaign
                        ? "Start campaign"
                        : "Stop campaign"
                    }
                    className="bg--transparent text-primary flex-shrink-0"
                    onClick={() =>
                      handleStopCampaign(ind)
                    }
                  >
                    {stopCampaign[ind] ? (
                      <BsFillPlayFill className="fs-24" />
                    ) : (
                      <BsFillPauseFill className="fs-24 text-ternary" />
                    )}
                  </button>

                  <div className="campaign-progress flex-grow-1">
                    <ProgressBar
                      now={60}
                      animated={stopCampaign[ind]}
                    />
                  </div>
                </div>
              </div>
            </td>
            <td>
              <span className="i-badge pill success-soft">Pending</span>
            </td>
            <td>
              <span className="text--primary mb-2">150</span>
            </td>
            <td>
              <span className="fs-13 text--secondary ">
                Dec 1, 2024, 2:52PM
              </span>
            </td>
            <td>
              <div className="d-flex align-items-center justify-content-end gap-1">
                <Dropdown className="icon-dropdown">
                  <Dropdown.Toggle
                    id="dropdown-5"
                    className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                  >
                    <LuEllipsisVertical />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align={`end`}>
                    <div className="dropdown-content">
                      <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                        actions.modal.modalUid,
                        "EDIT",
                        "Update attribute",
                        "md"
                      )
                      }
                      >
                        <LuSquarePen />
                        Edit
                      </Dropdown.Item>

                      <Dropdown.Item as="button" onClick={() => actions.modal.fn(
                        actions.modal.modalUid,
                        "DELETE",
                        "",
                        ""
                      )
                      }>
                        <LuTrash2 />
                        Delete
                      </Dropdown.Item>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default CampaignTable;
