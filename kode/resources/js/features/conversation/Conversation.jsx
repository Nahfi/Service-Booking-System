// import ModalWrapper from "../../common/modal/ModalWrapper";

import "./conversation-root.scss";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "../../components/layouts/BaseLayout";
import Sidebar from "./components/sidebar/Sidebar";


const Conversation = () => {
  return (
    <BaseLayout className="p-0">
      <section className="conversation">
        <div className="row g-0">
          <Sidebar />

          <div className="col main-content">
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
