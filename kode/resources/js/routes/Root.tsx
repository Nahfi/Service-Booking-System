import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Preloader from "../components/common/preloader/Preloader";

const Root: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve("Data loaded!");
          }, 2000);
        });
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };
    fetchApiData();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Preloader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Root;
