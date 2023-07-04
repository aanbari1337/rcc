import React from "react";

export const IDLE = "IDLE";
export const PENDING = "PENDING";
export const RESOLVED = "RESOLVED";
export const REJECTED = "REJECTED";

const asyncReducer = (state, action) => {
  switch (action.type) {
    case PENDING: {
      return { status: PENDING, data: null, error: null, loading: true };
    }
    case RESOLVED: {
      return {
        status: RESOLVED,
        data: action.data,
        error: null,
        loading: false,
      };
    }
    case REJECTED: {
      return {
        status: REJECTED,
        data: null,
        error: action.error,
        loading: false,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useAsync = (initialState) => {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: IDLE,
    data: null,
    error: null,
    loading: false,
    ...initialState,
  });

  const { data, error, status, loading } = state;

  const run = React.useCallback(
    (promise) => {
      dispatch({ type: PENDING });
      promise
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: RESOLVED, data });
        })
        .catch((error) => {
          let message = error?.response?.data || "something failed";
          let status = error?.response?.status;
          if (status === 500) message = "Internal server error";
          dispatch({ type: REJECTED, error: message });
        });
    },
    // we don't need to put dispatch as a dependecy
    //because useReducer will ensure that dispatch will never change.
    []
  );

  return {
    error,
    status,
    data,
    loading,
    run,
  };
};

export default useAsync;
