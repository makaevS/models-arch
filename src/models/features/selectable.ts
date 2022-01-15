import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
} from "..";

export type Selectable = MakeModel<'Selectable', {
  allowSelect: boolean;
  selected: boolean;
}, {}, {}>;

export const createDefaultChangeAllowSelected = (
  internals: Internals<Selectable>
) => (value: boolean) => {
  internals.allowSelect = value;
}

export const createDefaultChangeSelected = (
  internals: Internals<Selectable>
) => (value: boolean) => {
  if(value){
    if(internals.allowSelect) internals.selected = value;
  } else {
    internals.selected = value;
  }
}

export const createSelectable = (
  params?: InstanceDefault<Selectable>
): Instance<Selectable> => {
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
  return internals as Instance<Selectable>;
};