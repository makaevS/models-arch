import { makeAutoObservable } from "mobx";
import { With } from "..";

/** `isNew` - Shows if model is new. */
type Newable = {
  /** Shows if model is new. */
  isNew: boolean;
}

/** Model that has `Newable`. */
type WithNewable = With<Newable, 'newable'>;

/** Default `newable` object. */
type NewableDefault = Partial<Newable>;

/** Object that has `newable` default. */
type WithNewableDefault = With<NewableDefault, 'newableDefault'>;

/** Function that creates `newable` observable. */
const createNewable = (
  params?: NewableDefault
): Newable => {
  const {
    isNew = false,
  } = params ?? {};
  return makeAutoObservable({
    isNew
  });
}

export type {
  Newable,
  WithNewable,
  NewableDefault,
  WithNewableDefault
};
export { createNewable };