import Field from "@/components/common/from/Field";
import PageHeader from "@/components/common/Page-header/PageHeader";

const WhatsappSetting = () => {
  return (
      <>
          <PageHeader
              title={"Whatsapp Setup"}
              shortTitle={"You can setup your whatsapp settings here."}
          />

          <div>
                <div className="row g-4">
                    <div className="col-12">
                        <Field label="Business portfolio name" required>
                            <input
                                type="text"
                                id="campaignName"
                                placeholder="Enter your business portfolio name"
                                className="form-control"
                                required
                            />
                        </Field>
                    </div>

                    <div className="col-md-6">
                        <Field label="WhatsApp Phone Number ID">
                            <input
                                type="text"
                                id="sender"
                                placeholder="Enter phone number id"
                                className="form-control"
                            />
                        </Field>
                    </div>

                    <div className="col-md-6">
                        <Field label="WhatsApp Business Account ID">
                            <input
                                type="text"
                                id="sender"
                                placeholder="Enter business account id"
                                className="form-control"
                            />
                        </Field>
                    </div>
                  
                    <div className="col-md-6">
                        <Field label="Permanent access token" required>
                            <input
                                type="text"
                                id="sender"
                                placeholder="Enter permanent access token"
                                className="form-control"
                            />
                        </Field>
                    </div>

                </div>
          </div>
      </>
  );
}

export default WhatsappSetting