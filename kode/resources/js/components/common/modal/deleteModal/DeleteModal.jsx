
// import ButtonLoader from "@/components/button-loader/ButtonLoader";
import Button from "../../button/Button";
import SpinnerLoader from "../../loader/SpinnerLoader";

const DeleteModal = ({ ...props }) => {
  const {isLoading , onDelete , onHide, message="", description="", type="" } = props;

  return (
    <div className="text-center">
      <h3 className="fs-22 mb-2 fw-700">{message || `Delete this record`}</h3>
      <p>{description || `Do You Want To Delete this Records?`}</p>
      <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
        <Button
          className="i-btn btn--dark btn--lg outline rounded-3"
          disabled={isLoading}
          onClick={() => {
            onHide();
          }}
        >
          Cancel
        </Button>

        <Button
          className={`i-btn btn--${
            type === "Confirm" ? "info" : "danger"
          } btn--lg rounded-3`}
          disabled={isLoading}
          onClick={onDelete}
        >
          <span>{type || `Delete`}</span>

          {isLoading && <SpinnerLoader />}
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
