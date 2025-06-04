
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";
import ConversationSidebar from "./components/sidebar/ConversationSidebar";

import "./conversation-root.scss";

const Conversation: React.FC = () => {
    return (
        <BaseLayout className="p-0">
            <section className="conversation">
                <div className="row g-0">
                    <ConversationSidebar />

                    <div className="col conversation-content">
                        <Suspense fallback={"Loading..."}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default Conversation;
