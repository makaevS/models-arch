import { makeAutoObservable } from "mobx";
import {
  ChangeMethods,
  CreateMethods,
  Internals,
  OmitMethods,
  With
} from "..";

export type Selectable =
  & Readonly<SelectableFields>
  & SelectableMethods;

export type WithSelectable = With<Selectable, 'selectable'>;

export type SelectableDefault = Partial<
  & OmitMethods<Selectable>
  & SelectableDefaultMethods
>;

export type WithSelectableDefault =
  With<SelectableDefault, 'selectableDefault'>;

type SelectableFields = {
  allowSelect: boolean;
  selected: boolean;
}

type SelectableMethods = ChangeMethods<SelectableFields>;

type SelectableDefaultMethods = CreateMethods<Selectable>;

export const createDefaultChangeAllowSelected = (internals: Internals<Selectable>) => (value: boolean) => {
  internals.allowSelect = value;
}

export const createDefaultChangeSelected = (internals: Internals<Selectable>) => (value: boolean) => {
  if(value){
    if(internals.allowSelect) internals.selected = value;
  } else {
    internals.selected = value;
  }
}

export const createSelectable = (
  params?: SelectableDefault
): Selectable => {
  const {
    allowSelect = true,
    selected = false,
    createChangeAllowSelect = createDefaultChangeAllowSelected,
    createChangeSelected = createDefaultChangeSelected
  } = params ?? {};
  const internals: Internals<Selectable> = makeAutoObservable({
    allowSelect,
    selected,
    changeAllowSelect: () => null,
    changeSelected: () => null
  });
  internals.changeAllowSelect = createChangeAllowSelect(internals);
  internals.changeSelected = createChangeSelected(internals);
  return internals as Selectable;
};