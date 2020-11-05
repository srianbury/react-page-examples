import React from "react";

const withLoading = Component => ({ loading, loadingFallback, ...rest }) => {
  return loading ? <>{loadingFallback}</> : <Component {...rest} />;
};

export default withLoading;
