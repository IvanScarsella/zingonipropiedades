"use client";

import styles from "./marker.module.css";
import { useState } from "react";

const MyMarker = ({ text, tooltip, $hover }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className={styles.markerContainer} onClick={handleClick}>
      <div className={styles.circle}>
        <span className={styles.circleText}>{text}</span>
      </div>
      {showTooltip && <div className={styles.tooltip}>{tooltip}</div>}
    </div>
  );
};

export default MyMarker;
