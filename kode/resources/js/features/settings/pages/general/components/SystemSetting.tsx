import React from 'react'
import Button from '../../../../../components/common/button/Button'
import Card from '../../../../../components/common/card/Card'
import CardBody from '../../../../../components/common/card/CardBody'
import CardHeader from '../../../../../components/common/card/CardHeader'
import Field from '../../../../../components/common/from/Field'

const SystemSetting: React.FC = () => {
    return (
        <Card>
            <CardHeader cardTitle='System Configure'/>
            <CardBody>
                <form>
                    <div className="row g-4 gy-3">
                        <div className="col-md-6">
                            <Field label="Site name" required>
                                <input
                                    type="text"
                                    id="campaignName"
                                    placeholder="Enter your site name"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Phone Number" required>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name='phone_number'
                                    placeholder="Enter your phone number"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Email Address" required>
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Address">
                                <input
                                    type="text"
                                    id="address"
                                    name='address'
                                    placeholder="Enter your address"
                                    className="form-control"
                                    required
                                />
                            </Field>
                        </div>

                        <div className="col-md-6">
                            <Field label="Country">
                                <select
                                    className="form-select"
                                    id="country"
                                    aria-label="State"
                                >
                                    <option selected>Choose your country</option>
                                    <option value="1">Spain</option>
                                    <option value="2">England</option>
                                    <option value="3">Bangladesh</option>
                                    <option value="3">Dhaka</option>
                                </select>
                            </Field>
                        </div>

                    </div>

                    <div className="d-flex align-items-center justify-content-end mt-4">
                        <Button
                            type="submit"
                            className="btn--primary btn--lg rounded-3"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </CardBody>
       </Card>
    )
}

export default SystemSetting