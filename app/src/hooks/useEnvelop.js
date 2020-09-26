import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as envelop from "../ducks/envelop";

const useEnvelop = id => {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  let isLoading = useSelector(state =>
    envelop.selectors.isLoading(state.envelop, id)
  );

  let isError = useSelector(state =>
    envelop.selectors.isError(state.envelop, id)
  );

  const geo = useSelector(state =>
    envelop.selectors.envelop(state.envelop, id)
  );

  useEffect(() => {
    if (isError) {
      return;
    }
    if (!geo) {
      if (!isLoading && count < 10) {
        setCount(count => count + 1);
        const actions = envelop.actions.fetch(id);
        if (Array.isArray(actions)) {
          actions.map(a => dispatch(a));
        } else {
          dispatch(actions);
        }
      }
    }
  }, [geo, isLoading, id]);

  return {
    isLoading,
    isError,
    geo
  };
};

export default useEnvelop;