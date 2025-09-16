
import React from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import PropTypes from "prop-types";

function ArrowNav({ selectedItem, setSelectedItem }) {
  // navigationOrder except for group, which can be group-1, group-2, ... or group-A, group-B, ...
  const baseOrder = ["outcome", "results", "policy"];
  const navigationMap = {"outcome": "Development Outcome", "results": "Public Sector Results", "policy": "Delivery Capability and Feasible Policy", "group": "Evidence"};
  const bottleneckKeys =  Array.from({ length: 9 }, (_, i) => 'bottleneck_' + (i+ 1).toString());
  for (let i = 1; i <= 9; i++) {
    navigationMap['bottleneck_' + i.toString()] =   ' Bottleneck Group - ' + i.toString() ;
  }

  const roleKeys =  Array.from({ length: 4 }, (_, i) => "role_" + String.fromCharCode(65 + i));
  for (let i = 0; i < 4; i++) {
    navigationMap['role_' + String.fromCharCode(65 + i)] =  "Role - " + String.fromCharCode(65 + i);
  }
  let navigationOrder = [...baseOrder, ...bottleneckKeys, ...roleKeys];


  const selectedIndex = navigationOrder.indexOf(selectedItem);
  const previousItem = navigationOrder.length > 0
    ? navigationOrder[(selectedIndex - 1 + navigationOrder.length) % navigationOrder.length]
    : null;
  const nextItem = navigationOrder.length > 0
    ? navigationOrder[(selectedIndex + 1) % navigationOrder.length]
    : null;

  return (
    <div className="d-flex justify-content-between my-2"
      style={{ width: "100%",  position: "relative" }}
    >
      {previousItem && (
        <div
          style={{ padding: "10px", color: "blue", textDecoration: "underline", cursor: "pointer", textAlign: 'left' }}
          onClick={() => setSelectedItem(previousItem)}
        >
          <BiSolidLeftArrow size={15} /> {navigationMap[previousItem]}
        </div>
      )}
      {nextItem && (
        <div
          style={{ padding: "10px", color: "blue", textDecoration: "underline", cursor: "pointer", textAlign: 'right' }}
          onClick={() => setSelectedItem(nextItem)}
        >
          {navigationMap[nextItem]} <BiSolidRightArrow size={15} />
        </div>
      )}
    </div>
  );
}

ArrowNav.propTypes = {
  selectedItem: PropTypes.string.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default ArrowNav;