import { LuCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import Card from "../../../components/common/card";
import Progress from "../../../components/common/progressbar/Progress";


const Subscription = () => {
  return (
    <div className="info-block">
      <h6 className="title--sm mb-3">Current Plan Summary</h6>
      <div className="mb-4">
        <Card>
          <div className="row g-4">
            <div className="col-lg-8 col-md-7">
              <div className="row g-3">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                  <span className="fs-12 mb-2 d-inline-block fw-600">
                    PLAN NAME
                  </span>
                  <h6>Growth Plan</h6>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                  <span className="fs-12 mb-2 d-inline-block fw-600">
                    BILLING CYCLE
                  </span>
                  <h6>Monthly</h6>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6">
                  <span className="fs-12 mb-2 d-inline-block fw-600">
                    PLAN COST
                  </span>
                  <h6>$5698</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <button className="i-btn btn--danger btn--lg">Cancel</button>
                <Link to="/PricingPlan" className="i-btn btn--primary btn--lg">
                  Update plan
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="row g-4">
        <div className="col-lg-9">
          <Card>
            <div className="mb-4">
              <h6 className="title--sm mb-3">SMS Credits</h6>
              <Progress
                percentage={100}
                colorClass="bg-primary"
                height="progress--md"
                type="linear"
              />
              <div className="mt-3">
                <p className="fs-14 mb-2">$0.00 of $155.00 SMS credits used</p>
                <p className="fs-14 mb-0">Balance: $200.00</p>
              </div>
            </div>

            <div>
              <h6 className="title--sm mb-3">Whatsapp Credits</h6>
              <Progress
                percentage={50}
                colorClass="bg-success"
                height="progress--md"
                type="linear"
              />
              <div className="mt-2">
                <p className="fs-14 mb-2">$0.00 of $1.00 SMS credits used</p>
                <p className="fs-14 mb-0">Balance: $1.00</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-lg-3">
          <Card cardTitle="Plan benefits:">
            <ul className="common-list">
              <li>
                <span>
                  <LuCheck />
                </span>
                24/7 live chat support
              </li>
              <li>
                <span>
                  <LuCheck />
                </span>
                5,000 sending credits
              </li>
              <li>
                <span>
                  <LuCheck />
                </span>
                1,000 contacts
              </li>
              <li>
                <span>
                  <LuCheck />
                </span>
                Advance Reports
              </li>
              <li>
                <span>
                  <LuCheck />
                </span>
                1,000 contacts
              </li>
              <li>
                <span>
                  <LuCheck />
                </span>
                Advance Reports
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
