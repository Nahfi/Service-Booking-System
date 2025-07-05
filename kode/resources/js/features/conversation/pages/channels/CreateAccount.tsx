import { Alert } from 'react-bootstrap'
import { BsMeta, BsWhatsapp } from 'react-icons/bs'
import { LuBadgeCheck, LuBadgeInfo, LuCircleCheck, LuCloudCog, LuExternalLink, LuListChecks, LuPhone, LuUserRoundCog } from 'react-icons/lu'
import { Link } from 'react-router'
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
                        <div className="col-xxl-9 col-lg-7">
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

                                        <div className="d-flex align-items-center justify-content-end gap-3 mt-4">
                                            <Button
                                                type="button"
                                                className="i-btn btn--success btn--lg rounded-3"
                                            >
                                                Configure
                                            </Button>

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
                        <div className="col-xxl-3 col-lg-5">
                            <Card>
                                <CardHeader cardTitle="Connection Requirements" icon={LuListChecks} iconClassName="text-info" />
                                <CardBody>
                                    <p className='fs-14'>You will require the following information to activate your WhatsApp Business Cloud API:</p> 

                                    <ul className='d-flex flex-column gap-2 my-4'>
                                        <li className='border p-3 rounded-3 d-flex align-items-start justify-content-between gap-3'>
                                            <span className='icon-btn dark-soft btn-md rounded-circle cursor-none flex-shrink-0'><LuPhone className='fs-16'/></span>

                                            <div className='flex-grow-1'>
                                                <h6 className='fs-14 mb-1'>Valid Mobile Number</h6>
                                                <p className='fs-13 text-muted'>A phone number that will be registered on Meta.</p>
                                            </div>

                                            <span className='flex-shrink-0 text-muted opacity-50'><LuCircleCheck /></span>
                                        </li>

                                        <li className='border p-3 rounded-3 d-flex align-items-start justify-content-between gap-3'>
                                            <span className='icon-btn dark-soft btn-md rounded-circle cursor-none flex-shrink-0'><BsMeta className='fs-16' /></span>

                                            <div className='flex-grow-1'>
                                                <h6 className='fs-14 mb-1'>Facebook Developer Account</h6>
                                                <p className='fs-13 text-muted'>Register on Facebook for Developers, create a Business App, and add the WhatsApp product.</p>
                                            </div>

                                            <span className='flex-shrink-0 text-muted opacity-50'><LuCircleCheck /></span>
                                        </li>

                                        <li className='border p-3 rounded-3 d-flex align-items-start justify-content-between gap-3'>
                                            <span className='icon-btn dark-soft btn-md rounded-circle cursor-none flex-shrink-0'><BsWhatsapp className='fs-16' /></span>

                                            <div className='flex-grow-1'>
                                                <h6 className='fs-14 mb-1'>WhatsApp Business Profile</h6>
                                                <p className='fs-13 text-muted'>Add a phone number, verify it, and enable live mode.</p>
                                            </div>

                                            <span className='flex-shrink-0 text-muted opacity-50'><LuCircleCheck /></span>
                                        </li>

                                        <li className='border p-3 rounded-3 d-flex align-items-start justify-content-between gap-3'>
                                            <span className='icon-btn dark-soft btn-md rounded-circle cursor-none flex-shrink-0'><LuUserRoundCog className='fs-16' /></span>

                                            <div className='flex-grow-1'>
                                                <h6 className='fs-14 mb-1'>System User & Access Token</h6>
                                                <p className='fs-13 text-muted'>Create a system user,assign permissions, and generate a permanent access token.</p>
                                            </div>

                                            <span className='flex-shrink-0 text-muted opacity-50'><LuCircleCheck /></span>
                                        </li>
                                        <li className='border p-3 rounded-3 d-flex align-items-start justify-content-between gap-3'>
                                            <span className='icon-btn dark-soft btn-md rounded-circle cursor-none flex-shrink-0'><LuBadgeCheck className='fs-16' /></span>

                                            <div className='flex-grow-1'>
                                                <h6 className='fs-14 mb-1'>Verify Your Setup</h6>
                                                <p className='fs-13 text-muted'>Use our WhatsApp Cloud API debug tool to check if everything is configured correctly.</p>
                                            </div>

                                            <span className='flex-shrink-0 text-muted opacity-50'><LuCircleCheck /></span>
                                        </li>
                                    </ul>

                                    <Alert variant="info" className="mb-0">
                                        <Alert.Heading as={"h6"} className='fs-14'>
                                            <LuBadgeInfo className='fs-18 me-2'/> Need Help?
                                        </Alert.Heading>
                                        <p className="mt-2 fs-13">
                                            For detailed instructions, visit the <br />
                                            <Link className='lh-1' to={`https://developers.facebook.com/docs/whatsapp/cloud-api/get-started`}
                                                target="_blank" rel="noopener noreferrer" >WhatsApp Cloud API Documentation <LuExternalLink className='fs-16 ms-1'/> </Link>
                                        </p>
                                    </Alert>
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