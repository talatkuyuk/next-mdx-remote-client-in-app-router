import React from "react";

const Bar = ({ status }) => {
  return React.createElement(
    "div",
    {
      className: "bar-content",
      style: { color: "red", marginTop: "1rem" },
    },
    status
      ? "Imports shouldn't work, you should not see the message from imported <Bar /> component."
      : "Imports work, so I am able to say HELLO from imported <Bar /> component."
  );
};

export default Bar;
