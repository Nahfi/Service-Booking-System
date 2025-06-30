import Button from '../../../../../../components/common/button/Button'
import Field from '../../../../../../components/common/from/Field'

const SaveGroup = ({ onHide }) => {
  return (
      <form action="#">
          <div>
                <Field label={"Group Name"}>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter group name"
                        className="form-control"
                    />
                </Field>
                <p className="mt-2">Enter the name to create a group.</p>
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
  )
}

export default SaveGroup