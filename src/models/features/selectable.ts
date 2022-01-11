import { makeAutoObservable } from "mobx";
import { CreateMethods, Internals, With } from "..";

/**
 * `allowSelect` - Shows if model can be selected.
 * 
 * `selected` - Shows if model selected.
 */
export type Selectable = {
  /** Shows if model can be selected. */
  readonly allowSelect: boolean;
  /** Shows if model selected. */
  readonly selected: boolean;
} & SelectableMethods;

/** Model that has `Selectable`. */
export type WithSelectable = With<Selectable, 'selectable'>;

/** Default `selectable` object. */
export type SelectableDefault = Partial<
  & Omit<Selectable, 'handleChange'>
  & SelectableDefaultMethods
>;

/** Object that has `selectable` default. */
export type WithSelectableDefault =
  With<SelectableDefault, 'selectableDefault'>;

type SelectableMethods = {
  handleSelected: (value: boolean) => void;
}

type SelectableDefaultMethods = CreateMethods<Selectable>;

export const createDefaultHandleSelected = (internals: Internals<Selectable>) => (value: boolean) => {
  if(value){
    if(internals.allowSelect) internals.selected = value;
  } else {
    internals.selected = value;
  }
}

/** Function that creates `selectable` observable. */
export const createSelectable = (
  params?: SelectableDefault
): Selectable => {
  const {
    allowSelect = true,
    selected = false,
    createHandleSelected = createDefaultHandleSelected
  } = params ?? {};
  const internals: Internals<Selectable> = makeAutoObservable({
    allowSelect,
    selected,
    handleSelected: () => null
  });
  internals.handleSelected = createHandleSelected(internals);
  return internals as Selectable;
};