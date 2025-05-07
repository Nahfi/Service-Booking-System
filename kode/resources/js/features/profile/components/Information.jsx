
import Field from "../../../components/common/from/Field";

const Information = () => {
  return (
    <div>
      <form action="">
        <div className="info-block">
          <div className="row g-3">
            <div className="col-xl-2 col-lg-3">
              <h6 className="title--sm">Profile photo</h6>
            </div>
            <div className="col-xl-10 col-lg-9">
              
            </div>
          </div>
        </div>

        <div className="info-block">
          <div className="row g-3">
            <div className="col-xl-2 col-lg-3">
              <h6 className="title--sm">Personal Information</h6>
            </div>

            <div className="col-xl-10 col-lg-9">
              <div className="row g-4">
                <div className="col-md-6">
                  <Field label="First Name" required>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      placeholder="Enter First Name"
                    />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Last Name" required>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      placeholder="Enter Last Name"
                    />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Email" required>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Phone" required>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="+1 252 252 2522 "
                    />
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field label="Country" required>
                    <select
                      className="form-select"
                      id="country"
                      aria-label="country"
                    >
                      <option selected>Choose your Country</option>
                      <option value="1">bangladesh</option>
                      <option value="2">Russia</option>
                      <option value="3">China</option>
                    </select>
                  </Field>
                </div>

                <div className="col-md-6">
                  <Field label="City" required>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      placeholder="city"
                    />
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-block border-0">
          <div className="row g-3">
            <div className="col-xl-2 col-lg-3">
              <h6 className="title--sm">Advanced Settings</h6>
            </div>
            <div className="col-xl-10 col-lg-9">
              <div className="row g-4 mb-40">
                <div className="col-md-6">
                  <Field label="Turn on all chat notification">
                    <input type="checkbox" id="all-notification" />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Turn on all requested friend">
                    <input type="checkbox" id="all-reqs" />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Turn on all tagged message">
                    <input type="checkbox" id="all-tags" />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Pop up notification on desktop">
                    <input type="checkbox" id="popup-notification" />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Turn on all channel notification">
                    <input type="checkbox" id="channel-notification" />
                  </Field>
                </div>
                <div className="col-md-6">
                  <Field label="Turn on new update notification">
                    <input type="checkbox" id="update-notification" />
                  </Field>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <button className="i-btn btn--primary btn--lg">
                    Update my profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Information;
