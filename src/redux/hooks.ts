import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// get state access using useSelector hook
export const useAppSelector = useSelector.withTypes<RootState>();

// inside  useDispatch() hook we can dispatch actions

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
