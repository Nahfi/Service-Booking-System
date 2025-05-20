import Button from '@/components/common/button/Button';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { LuSquarePen, LuTrash2 } from 'react-icons/lu';

const NotificationTable = ({ openModal }) => {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        <span className="d-flex align-items-center gap-2">
                            <b>#</b> Name
                        </span>
                    </th>
                    <th>Type</th>
                    <th>Subject</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 7 }).map((_, ind) => (
                    <tr key={ind}>
                        <td>
                            <span className="d-flex align-items-center gap-2">
                                <b>{ind + 1}.</b> SHIFT REQUEST STATUS
                            </span>
                        </td>

                        <td>
                            <span className="i-badge pill success-soft py-1">
                                <BsFillCheckCircleFill className="me-1" />{" "}
                                Outgoing
                            </span>
                        </td>

                        <td>
                            <span>Upcoming shift reminder</span>
                        </td>

                        <td>
                            <div className="d-flex align-items-center justify-content-end gap-2">
                                <Button
                                    iconBtn={true}
                                    tooltipText="Update gateway"
                                    icon={LuSquarePen}
                                    className="info-soft btn-ghost hover btn-sm rounded-circle fs-18"
                                    href="/setting/notification-templates/create"
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

export default NotificationTable