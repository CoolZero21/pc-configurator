import { FaArrowAltCircleLeft } from "react-icons/fa";
import { BsFillMotherboardFill, BsCpuFill, BsMemory, BsGpuCard } from "react-icons/bs";
import { ImPowerCord } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { useEffect, useState } from "react";
import MenuSection from "./menuSection";
import { useCompContext } from "../contexts/CompContext";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { menuId, setMenuId, setSelectedComps, showFullMenu, setShowFullMenu } = useCompContext();

  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleSectionClick = (id) => {
    setMenuId(menuId === id ? 0 : id);
  };

  const iconStyling = {
    width: "37px",
    height: "37px",
    minWidth: "37px",
  };

  useEffect(() => {
    let timer;
    let timerFade;
    if (isOpen) {
      setShowFullMenu(true);
      timer = setTimeout(() => {
        setShowFullMenu(true);
        timerFade = setTimeout(() => setIsContentVisible(true), 50);
      }, 200);
    } else {
      setIsContentVisible(false);
      timer = setTimeout(() => {
        setShowFullMenu(false);
        timerFade = setTimeout(() => setIsContentVisible(true), 50);
      }, 200);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(timerFade);
    };
  }, [isOpen]);

  return (
    <div
      className="menu-wrapper"
      style={isOpen ? { flex: 2 } : { flex: 0.1 }}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      <div id="hide-menu">
        <FaArrowAltCircleLeft
          style={{
            width: "100%",
            height: "100%",
            transform: isOpen ? "scaleX(-1)" : "scaleX(1)",
          }}
          color="black"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
      </div>

      <div className="menu">
        <div
          style={{
            opacity: isContentVisible ? 1 : 0,
            transition: "opacity 200ms ease",
            alignItems: showFullMenu ? "stretch" : "center",
          }}
        >
          {showFullMenu ? (
            <>
              <div className="reset">
                <GrPowerReset
                  style={{ width: "25px", height: "25px" }}
                  onClick={() =>
                    setSelectedComps({
                      mobo: null,
                      cpu: null,
                      ram: null,
                      gpu: null,
                      psu: null,
                    })
                  }
                />
              </div>
              <MenuSection
                name="Motherboard"
                id={"mobo"}
                isPicked={menuId === "mobo"}
                onToggle={handleSectionClick}
              />
              <MenuSection
                name="Processor"
                id={"cpu"}
                isPicked={menuId === "cpu"}
                onToggle={handleSectionClick}
              />
              <MenuSection
                name="Memory"
                id={"ram"}
                isPicked={menuId === "ram"}
                onToggle={handleSectionClick}
              />
              <MenuSection
                name="Graphic Card"
                id={"gpu"}
                isPicked={menuId === "gpu"}
                onToggle={handleSectionClick}
              />
              <MenuSection
                name="Power Supply"
                id={"psu"}
                isPicked={menuId === "psu"}
                onToggle={handleSectionClick}
              />
            </>
          ) : (
            <div className="side-menu-collapsed" style={{ opacity: !isOpen ? 1 : 0 }}>
              <BsFillMotherboardFill style={iconStyling} />
              <BsCpuFill style={iconStyling} />
              <BsMemory style={iconStyling} />
              <BsGpuCard style={iconStyling} />
              <ImPowerCord style={iconStyling} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Menu;
