import { makeAutoObservable } from "mobx";
import { With } from "..";

/**
 * `allowSelect` - Shows if model can be selected.
 * 
 * `selected` - Shows if model selected.
 */
 type Selectable = {
  /** Shows if model can be selected. */
  allowSelect: boolean;
  /** Shows if model selected. */
  selected: boolean;
}

/** Model that has `Selectable`. */
type WithSelectable = With<Selectable, 'selectable'>;

/** Default `selectable` object. */
type SelectableDefault = Partial<Selectable>;

/** Object that has `selectable` default. */
type WithSelectableDefault = With<SelectableDefault, 'selectableDefault'>;

/** Function that creates `selectable` observable. */
const createSelectable = (
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

export type {
  Selectable,
  WithSelectable,
  SelectableDefault,
  WithSelectableDefault
};
export { createSelectable };