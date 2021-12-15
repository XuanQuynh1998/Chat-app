import React from "react";

export default function SwitchComponents({ active, children }) {
  return React.Children.toArray(children).filter((child) => child.props.name === active);
}
