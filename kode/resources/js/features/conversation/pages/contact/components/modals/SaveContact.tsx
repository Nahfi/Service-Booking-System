import type React from 'react'
import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'
import ImageUpload from '../../../../../../components/common/from/ImageUpload'
import SelectBox from '../../../../../../components/common/from/SelectBox'

const SaveContact: React.FC = ({ onHide }) => {
  return (
      <form action="#">
          <div className="row g-3">
              <Field label={"Choose Group"} required>
                  <>
                      <SelectBox />

                      <p className="mt-1 fs-14 text-muted">
                          Select the members of your group where you
                          want to send this campaign.
                      </p>
                  </>
              </Field>

              <div>
                  <div className="mb-20">
                      <h6 className="fs-18">Upload your file</h6>
                      <p className="fs-14">
                          Add your documents here, and you can upload up
                          to 5 files max
                      </p>
                  </div>

                  <ImageUpload
                      uploadText="Drag your file(s) or Browse"
                      maxFile="Max 20 MB files are allowed"
                  />

                  <p className="fs-14 mt-1">
                      Only support extension of{" "}
                      <span className="text-info">.csv</span>,
                      <span className="text-info">.dsv</span>,
                      <span className="text-info">.txt</span> or
                      <span className="text-info">.xlsx.</span>
                  </p>
              </div>
          </div>

          <div className="modal-custom-footer mt-4">
              <Button
                  className="btn--dark outline btn--lg rounded-3"
                  type="button"
                  onClick={onHide}
              >
                  Cancel
              </Button>

              <Button
                  type="submit"
                  className="btn--primary btn--lg rounded-3"
              >
                  Save
              </Button>
          </div>
      </form>
  )
}

export default SaveContact