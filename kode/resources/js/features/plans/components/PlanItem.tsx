import React from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { LuCheck } from "react-icons/lu";
import Field from "../../../components/common/from/Field";
import "./pricing.scss";

const PlanItem: React.FC = () => {
    return(
        <div className="pricing-item">
            <div className="header">
                <div className="d-flex justify-content-start align-items-center gap-2 mb-4">
                    <div className="icon"><IoDiamondOutline /></div>
                    <h6 className="text-uppercase mb-0">BASIC Package</h6>
                </div>
                <p>Basic features for up to 5 users.</p>
            </div>
            <div className="body">
                <h6 className="title--sm mb-3">Choose this plan</h6>
                <div className="d-flex justify-content-between align-items-center mb-10">
                    <Field label="Pay monthly" radio>
                        <input 
                            type="radio" 
                            id="p-monthly"
                            name="payment"
                        />
                    </Field>
                    <div>
                        <p className="fs-18 fw-600">$20/<span className="fs-14  ">month</span></p>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Field label="Pay yearly" radio>
                        <input 
                            type="radio" 
                            id="p-yearly"
                            name="payment"
                        />
                    </Field>
                    <div>
                        <p className="fs-18 fw-600">$40.30/<span className="fs-14  ">month</span></p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="i-btn btn--xl btn--primary w-100">Choose this plan</button>
                <ul className="common-list mt-30">
                    <li><span><LuCheck /></span>24/7 live chat support</li>
                    <li><span><LuCheck /></span>5,000 sending credits</li>
                    <li><span><LuCheck /></span>1,000 contacts</li>
                    <li><span><LuCheck /></span>Advance Reports</li>
                </ul>
            </div>
        </div>
    )
}

export default PlanItem;