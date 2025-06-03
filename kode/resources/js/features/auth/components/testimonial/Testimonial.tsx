import testiImage from "@/assets/images/bg/testi-1.jpg";
import type React from "react";
import Rating from "../../../../components/common/rating/Rating";
import "./testimonial.scss";

const Testimonial: React.FC = () => {
    return(
        <div className="tesimonial-item">
            <img src={testiImage} className="testi-bg" alt="testi-image" />
            <div className="content">
                <div>
                    <h3>It simplifies collaboration and keeps everyone on the same page, allowing us to focus more on creativity and less on logistics.</h3>
                    <div className="meta">
                        <p>Robert Howard - Project Manager</p>
                        <Rating rateCount={5} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;