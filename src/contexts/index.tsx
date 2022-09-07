import { Dispatch, useReducer } from "react";
import { CommonState } from "../models/common";
import commonReducer, {
  initialState as commonState,
  CommonStateContext,
  CommonDispatchContext,
  CommonAction,
} from "./common";

type AppState = CommonState;

type DispatchActions = {
  commonDispatch: Dispatch<CommonAction>;
};

type AppContexType = DispatchActions | AppState | undefined;

const compose = (components: any[], children: React.ReactNode) => {
  return (
    <>
      {components.reduce(
        (
          acc: React.Context<React.ReactNode>,
          [Context, value]: [React.Context<AppContexType>, AppContexType]
        ) => {
          return (
            <Context.Provider value={value}>
              <>{acc}</>
            </Context.Provider>
          );
        },
        children
      )}
    </>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [common, commonDispatch] = useReducer(commonReducer, commonState);

  // AppStateContext / AppDispatchContext 관심사 분리 작업 (리렌더링 방지)
  return compose(
    [
      [CommonStateContext, common],
      [CommonDispatchContext, commonDispatch],
    ],
    // Axios
    <>{children}</>
  );
};

export default AppProvider;
