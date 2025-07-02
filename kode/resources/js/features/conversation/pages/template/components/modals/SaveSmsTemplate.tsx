import Field from "@/components/common/from/Field";
import type React from "react";
import Button from "../../../../../../components/common/button/Button";

const SaveSmsTemplate: React.FC = ({onHide}) => {
  return (
      <form action="">
          <div className="row g-3">
              <div className="col-12">
                  <Field label="Template Name">
                      <input
                          type="text"
                          className="form-control"
                          id="template"
                          name="template"
                          placeholder="Enter template name"
                      />
                  </Field>
              </div>

              <div className="col-12">
                  <Field label="Body">
                      <textarea
                          name="body"
                          id=""
                          className="form-control"
                          placeholder="Write massage body here"
                          rows={6}
                      ></textarea>
                  </Field>
              </div>
          </div>

          <div className="modal-custom-footer mt-4">
              <Button
                  className="i-btn btn--dark outline btn--lg rounded-3"
                  type="button"
                  onClick={onHide}
              >
                  Cancel
              </Button>

              <Button
                  type="submit"
                  className="i-btn btn--primary btn--lg rounded-3"
              >
                  Save
              </Button>
          </div>
      </form>
  );
}

export default SaveSmsTemplate