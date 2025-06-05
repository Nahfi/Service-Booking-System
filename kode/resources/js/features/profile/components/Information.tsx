
import type React from "react";
import { useState } from "react";
import { CardBody } from "react-bootstrap";
import Button from "../../../components/common/button/Button";
import Card from "../../../components/common/card/Card";
import Field from "../../../components/common/from/Field";
import ImageUpload from "../../../components/common/from/ImageUpload";

const Information: React.FC = ({ user }) => {

  const [images, setImages] = useState<UploadedFile[]>([]);

  const handleImagesUpload = (uploadedImages) => {
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  return (
    <Card>
      <CardBody>
        <form>
            <div className="info-block">
                <div className="row g-3">
                    <div className="col-xl-2 col-lg-3">
                        <h6 className="title--sm">Profile photo</h6>
                    </div>
                    <div className="col-xl-10 col-lg-9">
                        <ImageUpload
                            defaultFiles={user?.img_url ? [user.img_url] : []}
                            uploadText="Select a file or drag and drop here"
                            maxFile="JPG, PNG or PDF, file size no more than 10MB"
                            onUpload={handleImagesUpload}
                            accept="image/*"
                            multiple={false}
                        />
                    </div>
                </div>
            </div>

            <div className="info-block">
                <div className="row g-3">
                    <div className="col-xl-2 col-lg-3">
                        <h6 className="title--sm">Personal Information</h6>
                    </div>

                    <div className="col-xl-10 col-lg-9">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Field label="Name" required>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        defaultValue={user?.name}
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Email" required>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        defaultValue={user?.email}
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Phone" required>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter your phone"
                                        defaultValue={user?.phone}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-block">
                <div className="row g-3">
                    <div className="col-xl-2 col-lg-3">
                        <h6 className="title--sm">Address Information</h6>
                    </div>

                    <div className="col-xl-10 col-lg-9">
                        <div className="row g-4">
                            <div className="col-md-6">
                                <Field label="Country" required>
                                    <input
                                        type="text"
                                        id="country"
                                        name="address[country]"
                                        className="form-control"
                                        placeholder="Enter your country"
                                        defaultValue={user?.address?.country}
                                    />

                                    {/* <SelectBox
                                          options={countries}
                                          name="country"
                                          id="country"
                                          className="w-full"
                                          defaultValue={
                                              user?.address?.country
                                                  ? {
                                                        value:
                                                            user?.address
                                                                ?.country || "",
                                                        label:
                                                            user?.address
                                                                ?.country || "",
                                                    }
                                                  : null
                                          }
                                          required
                                      /> */}
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="City" required>
                                    <input
                                        type="text"
                                        id="city"
                                        name="address[city]"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        defaultValue={user?.address?.city}
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Full Address" required>
                                    <input
                                        type="text"
                                        id="full_address"
                                        name="address[full_address]"
                                        className="form-control"
                                        placeholder="Enter your phone"
                                        defaultValue={user?.address?.full_address}
                                    />
                                </Field>
                            </div>

                            <div className="col-md-6">
                                <Field label="Postal Code" required>
                                    <input
                                        type="text"
                                        id="postal_code"
                                        name="address[postal_code]"
                                        className="form-control"
                                        placeholder="Enter your phone"
                                        defaultValue={user?.address?.postal_code}
                                    />
                                </Field>
                            </div>

                            {/* <div className="col-md-6">
                                  <Field label="Country" required>
                                      <select
                                          className="form-select"
                                          id="country"
                                          aria-label="country"
                                      >
                                          <option selected>
                                              Choose your Country
                                          </option>
                                          <option value="1">bangladesh</option>
                                          <option value="2">Russia</option>
                                          <option value="3">China</option>
                                      </select>
                                  </Field>
                              </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-end mt-4">
                <Button className="btn--primary btn--lg">Update profile</Button>
            </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Information;
