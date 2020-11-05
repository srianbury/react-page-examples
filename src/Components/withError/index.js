import React from "react";

const withError = Component => ({ error, errorFallback, ...rest }) => {
  return error ? <>{errorFallback}</> : <Component {...rest} />;
};

export default withError;
