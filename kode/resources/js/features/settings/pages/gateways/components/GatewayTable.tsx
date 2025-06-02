import Button from "@/components/common/button/Button";
import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { LuSquarePen, LuTrash2 } from "react-icons/lu";

interface GatewayTableProps {
    type: "sms" | "mail" | null;
    openModal: OpenModalFn;
}

const GatewayTable: React.FC<GatewayTableProps> = ({
    type = null,
    openModal,
}) => {
    return (
        <>
            <thead>
                <tr>
                    <th># Name</th>
                    <th>Default</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <span className="d-flex align-items-center gap-2">
                                <b>{ind + 1}.</b> Gateway 1
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill success-soft py-1">
                                <BsFillCheckCircleFill className="me-1" />{" "}
                                Default
                            </span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-2">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Update gateway"
                                    icon={LuSquarePen}
                                    className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    onClick={() =>
                                        type === "sms"
                                            ? openModal(
                                                  "EDIT_SMS",
                                                  "Update SMS Gateway",
                                                  "md"
                                              )
                                            : openModal(
                                                  "EDIT_MAIL",
                                                  "Update mail Gateway",
                                                  "lg"
                                              )
                                    }
                                />

                                <Button
                                    iconBtn={true}
                                    tooltipText="Delete"
                                    icon={LuTrash2}
                                    className="danger-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    onClick={() => openModal("DELETE")}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    );
};

export default GatewayTable