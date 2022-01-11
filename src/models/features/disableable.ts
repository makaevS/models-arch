import { makeAutoObservable } from "mobx";
import { With } from "..";

/** `disabled` - Shows if model is disabled. */
export type Disableable = {
  /** Shows if model is disabled. */
  disabled: boolean;
}

/** Model that has `Disableable`. */
export type WithDisableable = With<Disableable, 'disableable'>;

/** Default `disableable` object. */
export type DisableableDefault = Partial<Disableable>;

/** Object that has `disableable` default. */
export type WithDisableableDefault = With<DisableableDefault, 'disableableDefault'>;

/** Function that creates `disableable` observable. */
export const createDisableable = (
  params?: DisableableDefault
): Disableable => {
  const {
    disabled = false,
  } = params ?? {};
  return makeAutoObservable({
    disabled
  });
}