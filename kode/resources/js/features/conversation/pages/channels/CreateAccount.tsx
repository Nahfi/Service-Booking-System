import { LuCloudCog } from 'react-icons/lu'
import Button from '../../../../components/common/button/Button'
import Card from '../../../../components/common/card/Card'
import CardBody from '../../../../components/common/card/CardBody'
import CardHeader from '../../../../components/common/card/CardHeader'
import Field from '../../../../components/common/from/Field'
import PageHeader from '../../../../components/common/Page-header/PageHeader'

const CreateAccount = () => {
    return (
        <>
            <div className="conversation-content-body">
                <div className="channel-page">
                    <PageHeader
                        title="Create whatsapp account"
                        breadcrumbs={[
                            {
                                title: "Whatsapp account",
                            },
                            {
                                title: "Create whatsapp account",
                            },
                        ]}
                    />

                    <div className="row g-4">
                        <div className="col-lg-8">
                            <Card>
                                <CardHeader cardTitle="WhatsApp Cloud APIs" icon={LuCloudCog} />
                                <CardBody>
                                    <form>
                                        <div className="row g-4 gy-3">
                                            <div className="col-md-6">
                                                <Field label="App ID" required>
                                                    <input
                                                        type="text"
                                                        id="app_id"
                                                        name="app_id"
                                                        placeholder="Enter app id"
                                                        className="form-control"
                                                        required
                                                    />
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                                <Field label="App secret key" required>
                                                    <input
                                                        type="text"
                                                        id="secret_key"
                                                        name="secret_key"
                                                        placeholder="Enter app secret key"
                                                        className="form-control"
                                                        required
                                                    />
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
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
                                                <Field label="WhatsApp Phone Number ID" required>
                                                    <input
                                                        type="text"
                                                        id="sender"
                                                        placeholder="Enter phone number id"
                                                        className="form-control"
                                                        required
                                                    />
                                                </Field>
                                            </div>

                                            <div className="col-md-6">
                                                <Field label="WhatsApp Business Account ID" required>
                                                    <input
                                                        type="text"
                                                        id="sender"
                                                        placeholder="Enter business account id"
                                                        className="form-control"
                                                        required
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
                                                        required
                                                    />
                                                </Field>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-end mt-4">
                                            <Button
                                                type="submit"
                                                className="i-btn btn--primary btn--lg rounded-3"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default CreateAccount