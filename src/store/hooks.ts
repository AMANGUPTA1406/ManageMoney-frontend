import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Typed version of useDispatch hook
 * Use this instead of plain `useDispatch` for type safety
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Typed version of useSelector hook
 * Use this instead of plain `useSelector` for type safety
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
