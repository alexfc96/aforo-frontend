import React from "react";
import { Route, Redirect } from "react-router-dom";

import { withAuth } from "../context/authContext";

function AnonRoute({ component: Comp, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/protected",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default withAuth(AnonRoute);
