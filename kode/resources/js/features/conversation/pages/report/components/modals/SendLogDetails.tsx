import Button from "../../../../../../components/common/button/Button"

const SendLogDetails = ({ onHide }) => {
  return (
      <div>
           
          <div className="modal-custom-footer mt-4">
              <Button
                  className="i-btn btn--dark outline btn--lg rounded-3"
                  type="button"
                  onClick={onHide}
              >
                  Cancel
              </Button>

              <Button
                  className="i-btn btn--primary btn--lg rounded-3"
              >
                  Save
              </Button>
          </div>
    </div>
  )
}

export default SendLogDetails