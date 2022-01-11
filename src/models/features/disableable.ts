import { makeAutoObservable } from "mobx";
import { With } from "..";

/** `disabled` - Shows if model is disabled. */
type Disableable = {
  /** Shows if model is disabled. */
  disabled: boolean;
}

/** Model that has `Disableable`. */
type WithDisableable = With<Disableable, 'disableable'>;

/** Default `disableable` object. */
type DisableableDefault = Partial<Disableable>;

/** Object that has `disableable` default. */
type WithDisableableDefault = With<DisableableDefault, 'disableableDefault'>;

/** Function that creates `disableable` observable. */
const createDisableable = (
  params?: DisableableDefault
): Disableable => {
  const {
    disabled = false,
  } = params ?? {};
  return makeAutoObservable({
    disabled
  });
}

export type {
  Disableable,
  WithDisableable,
  DisableableDefault,
  WithDisableableDefault
};
export { createDisableable };