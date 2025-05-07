
import PageHeader from "../../components/common/Page-header/PageHeader";
import PlanItem from "./components/PlanItem";

const PricingPlan = () => {
  return (
    <div className="p-30">
      <div className="container-fluid container-wrapper">
        <PageHeader
          title={"Pricing Plans"}
          shortTitle={"Manage your profile"}
        />
        <div className="row">
          {Array.from({ length: 4 }).map((plan, index) => (
            <div className="col-xl-3 col-lg-3" key={index}>
              <PlanItem />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
