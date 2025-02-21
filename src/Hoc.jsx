import React, { useEffect } from "react";

const withExtraInfo = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} extraInfo="this is HOC-enhanced" />;
  };
};

const withLogger = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log("Current Property:", props);
    }, [props]);

    return <WrappedComponent {...props} />;
  };
};

export { withExtraInfo, withLogger }; // Exporting both HOCs
