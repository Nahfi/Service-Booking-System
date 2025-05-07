import Button from "../../components/common/button/Button";
import PageHeader from "../../components/common/Page-header/PageHeader";
import BaseLayout from "../../components/layouts/BaseLayout";
import CampaignSetup from "./components/campaign/CampaignSetup";
import CampaignSidebar from "./components/campaign/CampaignSidebar";
import Review from "./components/campaign/Review";
import WhatsappCompose from "./components/campaign/WhatsappCompose";
import "./create-campaign.scss";

import { useState } from "react";

const steps = [
  {
    title: "Campaign Setup",
    description: "Write the essential details for your campaign",
  },
  {
    title: "Compose Message",
    description: "Write the essential details for your campaign.",
  },
  {
    title: "Review",
    description: "Write the essential details for your campaign.",
  },
];
const CreateWhatsappCampaign = () => {
    const [activeStep, setActiveStep] = useState(1);

    const renderStepContent = () => {
      switch (activeStep) {
        case 1:
          return <CampaignSetup />;
        case 2:
          return <WhatsappCompose />;
        case 3:
          return <Review />;
        default:
          return <CampaignSetup />;
      }
    };
    const nextStep = () => {
      if (activeStep < steps?.length + 1) {
        setActiveStep(activeStep + 1);
      }
    };

    const prevStep = () => {
      if (activeStep > 1) {
        setActiveStep(activeStep - 1);
      }
    };

    const handleOnSubmit = (e) => {
      e.preventDefault();
    };


      return (
        <BaseLayout className="p-0">
          <div className="row g-0 create-campaign">
            <CampaignSidebar activeStep={activeStep} steps={steps} />

            <div className="col campaign-body-wrapper">
              <form onSubmit={handleOnSubmit}>
                <div className="campaign-body">
                  <PageHeader title={"Create Whatsapp Campaign"} />
                  <div className="campaign-form-wrapper ms-0 me-auto">
                    {renderStepContent()}
                  </div>
                </div>

                <div className="campaign-body-bottom d-flex align-items-center justify-content-between text-end">
                  <Button 
                    type="button"
                    onClick={prevStep}
                    className={`btn--dark btn--md rounded-3 ${
                      activeStep === 1 ? "opacity-0" : ""
                    }`}
                  >
                    Previous step
                  </Button>
                  {activeStep < steps?.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="btn--primary btn--md rounded-3"
                    >
                      Next step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="btn--primary btn--md rounded-3"
                    >
                      Submit Campaign
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </BaseLayout>
      );

//   return (
//     <main>
//       <div className="container-fluid">
//         <div className="row g-0">
//           <div className="col-xl-2 col-lg-3">
//             <CampaignSidebar activeStep={1} />
//           </div>
//           <div className="col-xl-10 col-lg-9">
//             <div className="main-content-body py-0">
//               <div className="row">
//                 <div className="col-xxl-8 col-xl-7 col-lg-6 py-30 border-lg-end pe-lg-30">
//                   <PageTitle title="Create Whatsapp Campaign" />
//                   <div className="form-wrapper-width ms-0 me-auto">
//                     <form action="">
//                       <div className="row g-4">
//                         <div className="col-12">
//                           <Field label="Choose template">
//                             <select
//                               className="form-select"
//                               id="country"
//                               aria-label="State"
//                             >
//                               <option selected>Choose your state</option>
//                               <option value="1">Spain</option>
//                               <option value="2">England</option>
//                               <option value="3">Bangladesh</option>
//                               <option value="3">Dhaka</option>
//                             </select>
//                           </Field>
//                         </div>
//                         <div className="col-12">
//                           <Tabs
//                             defaultActiveKey="header"
//                             id="fill-tab-example"
//                             className="mb-4 style-1 style--dark"
//                           >
//                             <Tab
//                               eventKey="header"
//                               title={
//                                 <>
//                                   <BsList style={{ marginRight: "8px" }} />{" "}
//                                   Header
//                                 </>
//                               }
//                             >
//                               <div className="row g-3">
//                                 <div className="col-xl-6 col-lg-12">
//                                   <Field label="Variable">
//                                     <input
//                                       type="text"
//                                       placeholder="Hello"
//                                       className="form-control"
//                                       value={headerText}
//                                       onChange={handleHeaderChange}
//                                     />
//                                   </Field>
//                                 </div>
//                                 <div className="col-xl-6 col-lg-12">
//                                   <Field label="Contact field">
//                                     <select
//                                       className="form-select"
//                                       id="contact-field"
//                                       aria-label="State"
//                                       value={headerSelectValue} // Controlled select
//                                       onChange={handleHeaderSelectChange} // Update state
//                                     >
//                                       <option value="">Select Value</option>
//                                       <option value="03">03</option>
//                                       <option value="54">54</option>
//                                       <option value="756">756</option>
//                                       <option value="678">678</option>
//                                     </select>
//                                   </Field>
//                                 </div>
//                               </div>
//                             </Tab>

//                             <Tab
//                               eventKey="body"
//                               title={
//                                 <>
//                                   <BsList style={{ marginRight: "8px" }} /> Body
//                                 </>
//                               }
//                             >
//                               <div className="row g-3">
//                                 <div className="col-xl-6 col-lg-12">
//                                   <Field label="Variable">
//                                     <input
//                                       type="text"
//                                       placeholder="Hello"
//                                       className="form-control"
//                                       value={bodyText}
//                                       onChange={handleBodyChange}
//                                     />
//                                   </Field>
//                                 </div>
//                                 <div className="col-xl-6 col-lg-12">
//                                   <Field label="Contact field">
//                                     <select
//                                       className="form-select"
//                                       id="contact-field"
//                                       aria-label="State"
//                                       value={bodySelectValue} // Controlled select
//                                       onChange={handleBodySelectChange} // Update state
//                                     >
//                                       <option value="">Select Value</option>
//                                       <option value="03">03</option>
//                                       <option value="54">54</option>
//                                       <option value="756">756</option>
//                                       <option value="678">678</option>
//                                     </select>
//                                   </Field>
//                                 </div>
//                               </div>
//                             </Tab>

//                             <Tab
//                               eventKey="button"
//                               title={
//                                 <>
//                                   <BsList style={{ marginRight: "8px" }} />{" "}
//                                   Button
//                                 </>
//                               }
//                             >
//                               <div className="row g-3">
//                                 <div className="col-12">
//                                   <Field label="Copy code">
//                                     <input
//                                       type="text"
//                                       placeholder="Hello"
//                                       className="form-control"
//                                       value={buttonText}
//                                       onChange={handleButtonChange}
//                                     />
//                                   </Field>
//                                 </div>
//                                 <div className="col-12">
//                                   <Field label="Contact field">
//                                     <select
//                                       className="form-select"
//                                       id="contact-field"
//                                       aria-label="State"
//                                       value={buttonSelectValue} // Controlled select
//                                       onChange={handleButtonSelectChange} // Update state
//                                     >
//                                       <option value="">Select Value</option>
//                                       <option value="03">03</option>
//                                       <option value="54">54</option>
//                                       <option value="756">756</option>
//                                       <option value="678">678</option>
//                                     </select>
//                                   </Field>
//                                 </div>
//                                 <div className="col-12">
//                                   <Field label="URL">
//                                     <input
//                                       type="text"
//                                       placeholder="www.url.com"
//                                       className="form-control"
//                                       value={urlText}
//                                       onChange={handleUrlChange}
//                                     />
//                                   </Field>
//                                 </div>
//                               </div>
//                             </Tab>
//                           </Tabs>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-xxl-4 col-xl-5 col-lg-6 py-30 position-relative">
//                   <MessagePreview
//                     headerText={headerText}
//                     headerSelectValue={headerSelectValue}
//                     bodySelectValue={bodySelectValue}
//                     bodyText={bodyText}
//                     buttonText={buttonText}
//                     buttonSelectValue={buttonSelectValue}
//                     urlText={urlText}
//                     whatsapp
//                   />
//                 </div>
//               </div>

//               <div className="position-fixed bottom-0 end-0 p-3 border-top w-100 text-end">
//                 <Link to="/compose" className="i-btn btn--primary btn--lg">
//                   Next step
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
};

export default CreateWhatsappCampaign;