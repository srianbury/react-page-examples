import React from "react";

const withEmptyList = Component => ({ length, emptyFallback, ...rest }) => {
  return length < 1 ? <>{emptyFallback}</> : <Component {...rest} />;
};

export default withEmptyList;
