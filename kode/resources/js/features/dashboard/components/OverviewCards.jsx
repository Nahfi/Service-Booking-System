import { RiArrowUpDoubleFill } from "react-icons/ri";
import Card from "../../../components/common/card";
import Progress from "../../../components/common/progressbar/Progress";


const OverviewCards = () => {
  return (
    <div className="row row-cols-xl-4 row-cols-lg-2 row-cols-md-2 row-cols-1 g-4">
      {Array.from({ length: 4 }).map((card, id) => (
        <div className="col" key={id}>
          <Card>
            <div className="overview-card">
              <div className="content">
                <span>Total Sent</span>
                <h4>14.5k</h4>
                <p className="text-muted fs-12 mt-2">
                  <RiArrowUpDoubleFill className="text-success fs-16" /> Up from
                  past weeks
                </p>
              </div>

              <div className="progress-wrapper">
                <Progress
                  percentage={70}
                  type="circle"
                  color={`text-success`}
                />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
