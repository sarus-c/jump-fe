import React, { useCallback, useEffect, useState } from "react";
import List from "../list";
import Search from "../search";
import Info from "../info";
import "./section.css";

const Section = () => {
  const [info, showInfo] = useState(false);
  const [reload, setReload] = useState(false);

  const handleInfo = useCallback(() => {
    showInfo(true);
    setReload(true);
  }, []);

  useEffect(() => {
    if (info) {
      setTimeout(() => {
        showInfo(false);
        setReload(false);
      }, 2000);
    }
  }, [info]);

  return (
    <section className="position-relative d-flex flex-column h-100">
      <div className="info-panel">
        <h3>Have fun!</h3>
        <div className={`info-holder ${info ? '': 'invisible'}`}>
          <Info />
        </div>
      </div>
      <Search handleInfo={handleInfo} />
      <div className="overflow-auto flex-grow-1 mb-3">
        <List handleInfo={handleInfo} reload={reload} />
      </div>
    </section>
  );
};

export default Section;
