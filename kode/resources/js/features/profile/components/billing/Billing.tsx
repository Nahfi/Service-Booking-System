import MasterCard from "@/assets/images/payment-logo/mastercard.svg";
import { useRef } from "react";
import { BsCloudDownload, BsFiletypePdf } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from "../../../../components/common/card/Card";
import ModalWrapper from "../../../../components/common/modal/ModalWrapper";
import Table from "../../../../components/common/table/Table";



const Billing = () => {
  const modalRef = useRef();
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.hide();
    }
  };

  const handleModalShow = () => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  };
  return (
    <>
      <section>
        <div className="row row-cols-xl-2 row-cols-1 g-4 mb-4">
          <div className="col h-100">
            <div className="h-100">
              <h5 className="18px mb-3">Billing Information</h5>
              <Card>
                <div className="d-flex align-items-start justify-content-between gap-4 flex-md-nowrap flex-wrap">
                  <div className="d-flex flex-column">
                    <h6 className="mb-3">Mirpur - 1, Dhaka Banagladesh</h6>
                    <Link
                      to={`mailto:kimnoah@gmail.com`}
                      className="text-ternary"
                    >
                      kimnoah@gmail.com
                    </Link>

                    <Link to={`tel:+1 255 255 2555`} className="text-ternary">
                      +1 255 255 2555
                    </Link>
                  </div>

                  <div>
                    <button className="i-btn btn--primary btn--lg rounded-3">
                      Edit information
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="col h-100">
            <div className="h-100">
              <h5 className="18px mb-3">Payment Method</h5>
              <Card>
                <div className="d-flex align-items-start justify-content-between gap-4 flex-md-nowrap flex-wrap">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center gap-1 mb-4">
                      {Array.from({ length: 3 }).map((_, ind) => (
                        <div
                          key={ind}
                          className="avatar avatar-md border rounded-3 flex-shrink-0"
                        >
                          <img src={MasterCard} alt="" />
                        </div>
                      ))}
                    </div>

                    <h6 className="mb-1">Credit or Debit Card</h6>
                    <p className="text-ternary">
                      Offers payment processing software for e-commerce websites
                      and mobile applications.
                    </p>
                  </div>

                  <div>
                    <button
                      className="i-btn btn--primary btn--lg rounded-3"
                      onClick={handleModalShow}
                    >
                      Edit payment
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div>
          <h5 className="mb-3">Billing History</h5>
          <Table>
            <tbody>
              {Array.from({ length: 5 }).map((_, ind) => (
                <tr key={ind}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div className="flex-shrink-0">
                        <BsFiletypePdf className="fs-30" />
                      </div>
                      <span className="text-dark fw-600">Invoice 001</span>
                    </div>
                  </td>
                  <td>
                    <span>12 Jul 2024</span>
                  </td>
                  <td>
                    <span>Basic Plan</span>
                  </td>

                  <td>
                    <span>USD $15.00</span>
                  </td>
                  <td>
                    <button className="bg--transparent fs-20">
                      <BsCloudDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>

      <ModalWrapper
        ref={modalRef}
        title={"Choose Payment Method"}
        onHide={handleModalClose}
        size="lg"
        scrollable
        centered
      >
        <ul className="ul-list">
          {Array.from({ length: 6 }).map((item, ind) => (
            <li
              key={ind}
              className="d-flex align-items-center justify-content-between gap-4"
            >
              <div className="d-flex align-items-center gap-4">
                <span className="avatar avatar-lg flex-shrink-0">
                  <img src={MasterCard} alt="" className="w-100" />
                </span>
                <div>
                  <h6>Mastercard</h6>
                  <p className="text-trinary">
                    A single payments platform to accept payments anywhere, on
                    any device.
                  </p>
                </div>
              </div>

              <div>
                <button className="i-btn btn--primary btn--md outline rounded-3">
                  Connect
                </button>
              </div>
            </li>
          ))}
        </ul>
      </ModalWrapper>
    </>
  );
};

export default Billing;
