import userOne from "@/assets/images/user/user-1.png";
import { LuArrowLeft, LuSearch } from 'react-icons/lu';
import Button from "../../../../../../components/common/button/Button";

const contactsData = Array.from({ length: 6 }).map((_, ind) => ({
    id: ind,
    name: `Jane Doe ${ind + 1}`,
    message: "Hi, I want to make enquiries",
    time: "12:55 am",
    isOnline: ind % 2 === 0,
    type: ind % 3 === 0 ? "SMS" : "CHAT",
    isUnread: ind % 2 === 1,
    isFavorite: ind % 3 === 0,
    isGroup: ind % 4 === 0,
}));

const NewChat: React.FC = ({ onHide, modal }) => {
    const { openModal, modalUid } = modal;

    return (
        <div className="choose-contact-wrapper fade-in">
            <div className="px-3 py-2">
                <div className="d-flex align-items-center justify-content-start gap-3 mb-2">
                    <Button
                        iconBtn={true}
                        icon={LuArrowLeft}
                        tooltipText="Close"
                        className="dark-soft btn-ghost btn-sm fs-18 circle"
                        onClick={onHide}
                    />

                    <h6 className="fs-15">New chat</h6>
                </div>

                <div className="contact-search">
                    <div className="px-2 flex-shrink-0">
                        <LuSearch className="fs-18" />
                    </div>
                    <input
                        type="text"
                        className="flex-grow-1"
                        placeholder="Search contacts..."
                    />

                    {/* <Button
                        iconBtn={true}
                        icon={LuX}
                        className="fs-16 text-danger"
                    /> */}
                </div>
            </div>

            <div className="choose-contact-list scroll scroll-3">
                {contactsData.map((contact, ind) => (
                    <div key={ind} className="contact-item" onClick={() =>
                        openModal(modal.modalUid,
                            "CHOOSE_TEMPLATE",
                            "Choose Template",
                            "xl",
                            contact
                        )}
                    >
                        <div className="contact-info">
                            <div className="contact-avatar">
                                <img src={userOne} alt="" />
                            </div>
                            <div>
                                <h6>{contact.name}</h6>
                                <p>+880 1334-697825</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewChat;