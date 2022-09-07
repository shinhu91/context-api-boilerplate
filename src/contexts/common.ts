import { createContext, Dispatch, useContext } from "react";
import { CommonState } from "../models/common";

export const initialState: CommonState = {
  isAdmin: false,
};

export type CommonAction = { type: "SET_USER_AUTH" };

const commonReducer = (state = initialState, action: CommonAction) => {
  switch (action.type) {
    case "SET_USER_AUTH":
      return {
        ...state,
        isAdmin: !state.isAdmin,
      };

    default:
      return state;
  }
};

export default commonReducer;

export const CommonStateContext = createContext<CommonState | undefined>(
  undefined
);

export const CommonDispatchContext = createContext<
  Dispatch<CommonAction> | undefined
>(undefined);

CommonStateContext.displayName = "Common State";
CommonDispatchContext.displayName = "Common Dispatch";

export function useCommonState() {
  const state = useContext(CommonStateContext);
  if (!state) throw Error("cannot found common state");
  return state;
}

export function useCommonDispatch() {
  const dispatch = useContext(CommonDispatchContext);
  if (!dispatch) throw Error("cannot found common dispatch");
  return dispatch;
}
