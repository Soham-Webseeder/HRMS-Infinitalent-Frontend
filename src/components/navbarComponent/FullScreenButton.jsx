import { MdCloseFullscreen } from "react-icons/md";
import React, { useState } from "react";
import { BiExpandAlt } from "react-icons/bi";

const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!isFullScreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };
  return (
    <button
      onClick={toggleFullScreen}
      className="p-[6px] border  bg-gray-800 text-white rounded-[4.5px] hover:bg-gray-200 hover:text-slate-500"
    >
      {isFullScreen ? <MdCloseFullscreen /> : <BiExpandAlt />}
    </button>
  );
};
export default FullScreenButton;
