import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? ' rounded-full glassmorphism' : ' rounded-4 '}`}
      onClick={handleClick}
      style={activeStyles}
      title={tab.name}
    >
      <div className={`${isFilterTab ? 'w-2/3 h-2/3' : 'flex justify-center p-2 bg-yellow-500 rounded-full'}`}>
        <img 
          src={tab.icon}
          alt={tab.name}
          className={`${isFilterTab ? 'w-auto h-auto' : 'w-11/12 h-11/12 object-contain'}`}
        />         
      </div>
    </div>
  )
}

export default Tab
