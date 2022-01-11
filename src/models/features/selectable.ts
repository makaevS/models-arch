import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowSelect` - Shows if model can be selected.
 * 
 * `selected` - Shows if model selected.
 */
export type Selectable = {
  /** Shows if model can be selected. */
  allowSelect: boolean;
  /** Shows if model selected. */
  selected: boolean;
}

/** Model that has `Selectable`. */
export type WithSelectable = With<Selectable, 'selectable'>;

/** Default `selectable` object. */
export type SelectableDefault = Partial<Selectable>;

/** Object that has `selectable` default. */
export type WithSelectableDefault =
  With<SelectableDefault, 'selectableDefault'>;

/** Function that creates `selectable` observable. */
export const createSelectable = (
  params?: SelectableDefault
): Selectable => {
  const {
    allowSelect = true,
    selected = false,
  } = params ?? {};
  return makeAutoObservable({
    allowSelect,
    selected,
  });
};