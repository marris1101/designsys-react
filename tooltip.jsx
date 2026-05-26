import React, { useState, useEffect, useRef } from "react";

const AccessibleToolTip = ({ tooltipText, mobile, tooltipid }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [placementStyle, setPlacementStyle] = useState("tcs-tooltip-top");
  const containerRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine tooltip placement whenever tooltip opens or window size changes
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { left, top } = rect;
    const right = windowSize.width - left;
    const bottom = windowSize.height - top;

    let newPlacement = "tcs-tooltip-top";
    if (top < 120 && left > 120 && right > 120) newPlacement = "tcs-tooltip-bottom";
    else if (top > 120 && bottom > 120 && right < 120) newPlacement = "tcs-tooltip-left";
    else if (top > 120 && bottom > 120 && left < 120) newPlacement = "tcs-tooltip-right";

    setPlacementStyle(newPlacement);
  }, [isTooltipOpen, windowSize]);

  // ESC key closes tooltip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsTooltipOpen(false);
        setIsPinned(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside closes pinned tooltip
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isTooltipOpen && isPinned && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsTooltipOpen(false);
        setIsPinned(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTooltipOpen, isPinned]);

  const handleMouseEnter = () => {
    if (!isTooltipOpen && !isPinned) setIsTooltipOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) setIsTooltipOpen(false);
  };

  const handleClick = () => {
    if (isPinned) {
      setIsPinned(false);
      setIsTooltipOpen(false);
    } else {
      setIsPinned(true);
      setIsTooltipOpen(true);
    }
  };

  return (
    <div
      ref={containerRef} className={`tcs-tooltip-wrapper`}
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleMouseLeave}
    >
      <button onClick={handleClick} className={`tcs-more-info ${mobile ? 'tcs-tooltip-mobile' : ''}`} aria-describedby={`${tooltipid}`} ></button>

        <div id={`${tooltipid}`} aria-label="Tooltip" role="tooltip" className={`${placementStyle} ${!isTooltipOpen ? 'visually-hidden' : ''}`}>
          {tooltipText}
        </div>

    </div>
  );
};

export default AccessibleToolTip;
