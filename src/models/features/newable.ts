import { makeAutoObservable } from "mobx";
import { With } from "..";

/** `isNew` - Shows if model is new. */
export type Newable = {
  /** Shows if model is new. */
  isNew: boolean;
}

/** Model that has `Newable`. */
export type WithNewable = With<Newable, 'newable'>;

/** Default `newable` object. */
export type NewableDefault = Partial<Newable>;

/** Object that has `newable` default. */
export type WithNewableDefault = With<NewableDefault, 'newableDefault'>;

/** Function that creates `newable` observable. */
export const createNewable = (
  params?: NewableDefault
): Newable => {
  const {
    isNew = false,
  } = params ?? {};
  return makeAutoObservable({
    isNew
  });
}