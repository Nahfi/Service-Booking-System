import { useState } from "react";
import { Dropdown, ProgressBar } from "react-bootstrap";
import { BsBan, BsFillCheckCircleFill, BsFillPauseFill, BsFillPlayFill, BsPencilSquare, BsThreeDotsVertical, BsTrash3, BsVolumeMute } from "react-icons/bs";
import Button from "../../../../../components/common/button/Button";
import Filter from "../../../../../components/common/filter/Filter";
import PaginationWrapper from "../../../../../components/common/pagination/PaginationWrapper";
import TableWrapper from "../../../../../components/common/table/TableWrapper";


const SendLog: React.FC = () => {
  const initialCampaignStates = Array.from({ length: 7 }, () => true);
  const [stopCampaign, setStopCampaign] = useState(initialCampaignStates);

  const handleStopCampaign = (index) => {
    setStopCampaign((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
      <>
          <Filter />

          <TableWrapper>
              <thead>
                  <tr>
                      <th>Receipt</th>
                      <th>Sender</th>
                      <th>Campaign </th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Sent Date</th>
                      <th>Actions</th>
                  </tr>
              </thead>

              <tbody>
                  {Array.from({ length: 7 }).map((_, ind) => (
                      <tr key={ind}>
                          <td>
                              <span className="fw-bold">1 255 255 2555</span>
                          </td>

                          <td>
                              <span className="text--primary">SIM1</span>
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
                              <span className="i-badge pill success-soft lh-1 py-2">
                                  <BsFillCheckCircleFill className="me-1" />{" "}
                                  Sent
                              </span>
                          </td>

                          <td>
                              <span>25/06/2024</span>
                          </td>
                          <td>
                              <span>25/06/2024</span>
                          </td>

                          <td>
                              <div className="d-flex align-items-center justify-content-end gap-2">
                                  <Button className="dark-soft hover btn-md fs-16 rounded-3">
                                      <BsPencilSquare />
                                  </Button>

                                  <Dropdown className="icon-dropdown">
                                      <Dropdown.Toggle
                                          id="dropdown-5"
                                          className="icon-btn dark-soft btn-ghost hover btn-md fs-18 rounded-3 p-0"
                                      >
                                          <BsThreeDotsVertical />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu align={`end`}>
                                          <ul className="dropdown-content">
                                              <li>
                                                  <Dropdown.Item>
                                                      <BsVolumeMute />
                                                      Mute
                                                  </Dropdown.Item>
                                              </li>

                                              <li>
                                                  <Dropdown.Item>
                                                      <BsBan />
                                                      Blocked
                                                  </Dropdown.Item>
                                              </li>

                                              <li>
                                                  <Dropdown.Item>
                                                      <BsTrash3 />
                                                      Delete Chat
                                                  </Dropdown.Item>
                                              </li>
                                          </ul>
                                      </Dropdown.Menu>
                                  </Dropdown>
                              </div>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </TableWrapper>

          <div className="mt-4">
              <PaginationWrapper />
          </div>
      </>
  );
};

export default SendLog;
