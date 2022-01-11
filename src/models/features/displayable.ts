import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `label` - Displayable label.
 * 
 * `value` - Value linked to label.
 */
export type Displayable<T> = {
  /** Displayable label. */
  label: string;
  /** Value linked to label. */
  value: T;
}

/** Model that has `Displayable`. */
export type WithDisplayable<T> = With<Displayable<T>, 'displayable'>;

/** Default `displayable` object. */
export type DisplayableDefault<T> =
  | Displayable<T>
  | Omit<Displayable<T>, 'label'>

/** Object that has `displayable` default. */
export type WithDisplayableDefault<T> = With<
  DisplayableDefault<T>, 'displayableDefault'
>;

/** Function that creates `displayable` observable. */
export const createDisplayable = <T>(
  params: DisplayableDefault<T>
): Displayable<T> => {
  const {
    label = String(params.value),
    value,
  } = params as Displayable<T>;
  return makeAutoObservable({
    label,
    value
  });
};