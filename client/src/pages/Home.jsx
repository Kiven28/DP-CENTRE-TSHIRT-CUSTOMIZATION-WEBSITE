import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import Canvas from '../canvas';
import Customizer from './Customizer';
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const snap = useSnapshot(state);
  const [showCanvas, setShowCanvas] = useState(false); // State to control showing Canvas

  const handleCustomizeButtonClick = () => {
    state.intro = false; // Update intro state
    setShowCanvas(true); // Show Canvas on Customize It button click
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="home"
          style={{ backgroundColor: '#1a202c', overflow: 'hidden' }} // Dark background color
          {...slideAnimation('left')}
          key="home-section"
        >
          <motion.header {...slideAnimation('down')} className="home-header">
            <div className="flex gap-4 absolute top-5 right-5"> {/* Move buttons to top-right corner */}
              <Link to="/catalogue" key="home-catalogue-link">
                <CustomButton
                  type="filled"
                  title="CATALOGUE"
                  customStyles="shadow-lg shadow-yellow-500/50 hover:shadow-none w-fit px-3 py-2 font-bold text-xs transition duration-300 ease-in-out"
                  key="home-catalogue-button"
                />
              </Link>
             
              <Link to="/tutorial" key="home-tutorial-link">
                <CustomButton
                  type="filled"
                  title="TUTORIAL"
                  customStyles="shadow-lg shadow-yellow-500/50 hover:shadow-none w-fit px-3 py-2 font-bold text-xs transition duration-300 ease-in-out"
                  key="home-tutorial-button"
                />
              </Link>
              <Link to="/admin" key="home-admin-link">
                <CustomButton
                  type="filled"
                  title="ADMIN"
                  customStyles="shadow-lg shadow-yellow-500/50 hover:shadow-none w-fit px-3 py-2 font-bold text-xs transition duration-300 ease-in-out"
                  key="home-admin-button"
                />
              </Link>
            </div>
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation} key="home-content">
            <motion.div {...headTextAnimation} key="home-head-text">
             
              <h1 className="head-text2 border-b pb-5">T-Shirt Customization Web</h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-3 items-center"
              key="home-head-content"
            >
              <CustomButton
                type="filled"
                title="CUSTOMIZE IT"
                handleClick={handleCustomizeButtonClick} // Handle click to show Canvas
                customStyles="shadow-lg shadow-yellow-500/50 hover:shadow-none  w-fit px-4 py-2 font-bold text-xs customize-button"
                key="home-customize-button"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
      {showCanvas && <Canvas key="home-canvas" />} {/* Render Canvas only when showCanvas is true */}
      {!snap.intro && <Customizer key="home-customizer" />} {/* Render Customizer when intro is false */}
    </AnimatePresence>
  );
};

export default Home;
