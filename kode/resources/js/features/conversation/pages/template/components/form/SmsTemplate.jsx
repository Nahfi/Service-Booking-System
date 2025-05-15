import Field from "@/components/common/from/Field";

const SmsTemplate = () => {
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
                          readonly
                      ></textarea>
                  </Field>
              </div>
          </div>
      </form>
  );
}

export default SmsTemplate