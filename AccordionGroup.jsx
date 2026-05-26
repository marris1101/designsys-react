import { useState, Children, cloneElement } from "react";

function AccordionGroup({ children, title, titleLevel, description }) {
  const [openItems, setOpenItems] = useState(() => {
    return Children.toArray(children)
      .filter(child => child.props.expanded)
      .map(child => child.props.id);
  });

  const totalItems = Children.count(children);

  const allOpen = openItems.length === totalItems && totalItems > 0;
  const allClosed = openItems.length === 0;

  const expandAll = () => {
    const allIds = Children.map(children, child => child.props.id);
    setOpenItems(allIds);
  };

  const collapseAll = () => {
    setOpenItems([]);
  };

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>

        {(() => {
            switch (titleLevel) {
            case 'h1':
                return <h1 className="mb-0">{title}</h1>;
            case 'h2':
                return <h2 className="mb-0">{title}</h2>;
            case 'h3':
                return <h3 className="mb-0">{title}</h3>;
            case 'h4':
                return <h4 className="mb-0">{title}</h4>;
            case 'h5':
                return <h5 className="mb-0">{title}</h5>;                    
            default:
                return <h3 className="mb-0">{title}</h3>;
            }
        })()}   
      <p>{description}</p>
      <div className="expandWrapper">
        <button onClick={expandAll} aria-pressed={allOpen} className={allOpen ? "On" : ""}>
          Expand All
          <span className="visually-hidden">{title} accordion panels</span>
        </button>{" "}|{" "}
        <button onClick={collapseAll} aria-pressed={allClosed} className={allClosed ? "On" : ""}>
          Collapse All
          <span className="visually-hidden">{title} accordion panels</span>
        </button>
      </div>

      {Children.map(children, child =>
        cloneElement(child, {
          isOpen: openItems.includes(child.props.id),
          onToggle: () => toggleItem(child.props.id),
        })
      )}
    </>
  );
}

AccordionGroup.Item = function AccordionItem({
  children,
  title,
  id,
  expanded = false, // used only for initial load
  isOpen,
  onToggle,
}) {
  return (
    <div>
      <button
        className={`tcs-accordion ${isOpen ? "expanded" : ""}`}
        id={id}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-text`}
      >
        {title}
      </button>

      {isOpen && (
        <div
          className="tcs-accordionText"
          id={`${id}-text`}
          aria-labelledby={id}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default AccordionGroup;