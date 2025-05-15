
import BaseLayout from "@/components/layouts/BaseLayout";
import PageHeader from "../../components/common/Page-header/PageHeader";
import PlanItem from "./components/PlanItem";

const PricingPlan = () => {
  return (
      <BaseLayout>
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
      </BaseLayout>
  );
};

export default PricingPlan;
