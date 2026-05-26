import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';

function BSAccordion() {

  const [activeKeys, setActiveKeys] = useState([]);

  const handleSelect = (eventKey) => {
    if (Array.isArray(eventKey)) {
      setActiveKeys(eventKey);
    } else {
      setActiveKeys((prev) =>
        prev.includes(eventKey)
          ? prev.filter((k) => k !== eventKey)
          : [...prev, eventKey]
      );
    }
  };

  const expandAll = () => {
    setActiveKeys(["0", "1"]);
  };

  const collapseAll = () => {
    setActiveKeys([]);
  };

 

  return (
    <>
        <div className="content" role="main">
		
            <h1>Accordions</h1>

            <div class="tab-wrapper">        
                <ul class="ds-tabs">
                  <li class="active"><a href="">Overview</a></li>
                  <li><a href="">React Code</a></li>
                  <li><a href="">Angular</a></li>
                </ul>
            </div>

            <p>Accordions are a UX pattern used to organize content into expandable and collapsible sections, helping reduce visual clutter and make interfaces easier to scan. They are especially useful when users only need to view a small amount of information at a time, such as FAQs, settings panels, or mobile navigation menus. Accordions should be used when content can be grouped into clear categories, but they should be avoided for critical information that users need to see immediately without extra interaction.</p>

            <p>Accordions have been created in the example below using React, click the link below to view the working data in Angular. By default accordions will appear collapsed or closed to start. Accordions should be used when a page contains a large quantity of text and the user should be able to pick and choose which of that text they would like to read.</p>

            <p>This accordion is ready to implement and is already AODA compatible. This is built on Bootstrap React to prevent issues when upgrapding.</p>
            <Accordion
              activeKey={activeKeys}
              onSelect={handleSelect}
              alwaysOpen>
              <div className="accordion-button-wrapper">
                <Link onClick={expandAll} className={`expand ${activeKeys.length === 2 ? "On" : ""}`}>
                  Expand All
                </Link>|
                <Link onClick={collapseAll} className={`expand ${activeKeys.length === 0 ? "On" : ""}`}>
                  Collapse All
                </Link>
              </div>
              <Accordion.Item eventKey={0} key={0}>
                <Accordion.Header>Yoda Quotes <span className="visually-hidden">accordion button</span></Accordion.Header>
                <Accordion.Body><dl><dt>“Wars not make one great.”</dt><dd>--Yoda (Star Wars: Episode V — The Empire Strikes Back)</dd></dl></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey={1} key={1}>
                <Accordion.Header>Darth Vader Quotes <span className="visually-hidden">accordion button</span></Accordion.Header>
                <Accordion.Body><dl><dt>“The ability to destroy a planet is insignificant next to the power of the Force.”</dt><dd>--Darth Vader (Star Wars: Episode V — The Empire Strikes Back)</dd></dl></Accordion.Body>
              </Accordion.Item>          
            </Accordion>

            <p className="tcs-small-font mt-5">Last Modified: May 26, 2026</p>		
	    </div>
    </>
  )
}

export default BSAccordion