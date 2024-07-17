import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';
import { downloadCanvasToImage } from '../config/helpers';

const DownloadButton = ({ icon }) => {
  const snap = useSnapshot(state);

  const handleClick = () => {
    downloadCanvasToImage(); // This function should handle the download logic
  };

  return (
    <div
      className="tab-btn rounded-full glassmorphism"
      onClick={handleClick}
      style={{ backgroundColor: snap.color, opacity: 0.5 }}
      title="Download"
    >
      <img 
        src={icon}
        alt="download"
        className="w-2/3 h-2/3"
      />
    </div>
  );
};

export default DownloadButton;
