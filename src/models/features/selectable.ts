import { makeAutoObservable } from "mobx";
import { CreateMethods, ModelProto, With } from "..";

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
  handleChange: (value: boolean) => void;
}

type SelectableDefaultMethods = CreateMethods<Selectable>;

export const createDefaultHandleChange = (model: Selectable) => (value: boolean) => {
  if(value){
    if(model.allowSelect) model.selected = value;
  } else {
    model.selected = value;
  }
}

/** Function that creates `selectable` observable. */
export const createSelectable = (
  params?: SelectableDefault
): Selectable => {
  const {
    allowSelect = true,
    selected = false,
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const model: ModelProto<Selectable> = makeAutoObservable({
    allowSelect,
    selected,
    handleChange: () => null
  });
  model.handleChange = createHandleChange(model as Selectable);
  return model as Selectable;
};