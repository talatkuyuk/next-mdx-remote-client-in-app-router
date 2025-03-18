import * as ReactModule from "react";

// react server component
const Bar = ({ runtimeProps, status }) => {
  const { React = ReactModule } = runtimeProps;

  // for escaping pre-rendering error
  if (!React) {
    return "<Bar /> server component doesn't work due to missing React instance";
  }

  React.useId(); // for testing

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
