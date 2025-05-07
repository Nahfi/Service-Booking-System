import mobileImage from "@/assets/images/bg/mobile-image.png";
import mobileImageWhatsapp from "@/assets/images/bg/moble-image-w.png";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const MessagePreview = (props) => {
  const {
    message,
    images = [],
    headerText,
    headerSelectValue,
    bodyText,
    bodySelectValue,
    whatsapp,
    buttonText,
    buttonSelectValue,
    urlText,
  } = props;

  const displayImages = images.slice(0, 4);
  const extraImagesCount = images.length > 4 ? images.length - 4 : 0;


  return (
    <div className="message-preview">
      <img
        src={whatsapp ? mobileImageWhatsapp : mobileImage}
        alt={whatsapp ? "WhatsApp mobile preview" : "Mobile preview"}
      />

      <div className="mobile-preview">
        {!whatsapp && <div className="message-box">{message}</div>}

        {Array.isArray(images) && displayImages.length > 0 && (
          <div className="preview-images">
            {displayImages.map((image, index) => (
              <div className="image w-100" key={index}>
                <img src={image} alt={`preview-${index}`} />
              </div>
            ))}
            {extraImagesCount > 0 && (
              <div className="extra-images">
                + {extraImagesCount} More Images
              </div>
            )}
          </div>
        )}

        {whatsapp && (
          <div className={`message-box mt-2 ${whatsapp ? "w-message" : ""}`}>
            <div className="mb-2">
              <span className="fw-bold me-1">Hello</span> {headerText}
              {headerSelectValue}
            </div>
            <div>
              <span className="fw-bold me-1">
                I don't know why people like pizza
              </span>{" "}
              {bodyText}
              {bodySelectValue}
            </div>
          </div>
        )}

        {buttonText && (
          <div className={`message-box mt-2 ${whatsapp ? "w-message" : ""}`}>
            {buttonText}
            {buttonSelectValue ? buttonSelectValue : null}
          </div>
        )}

        {urlText && (
          <div className={`message-box mt-2 ${whatsapp ? "w-message" : ""}`}>
            <Link>
              <BsBoxArrowUpRight className="me-2" />
              {urlText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePreview;
