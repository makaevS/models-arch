import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
} from "..";

export type CanBeSelected = MakeModel<'CanBeSelected', {
  permitSelect: boolean;
  selected: boolean;
}, {}, {}>;

export const createDefaultChangePermitSelected = (
  internals: Internals<CanBeSelected>
) => (value: boolean) => {
  internals.permitSelect = value;
}

export const createDefaultChangeSelected = (
  internals: Internals<CanBeSelected>
) => (value: boolean) => {
  internals.selected = value;
}

export const createCanBeSelected = (
  params?: Defaults<CanBeSelected>
): Instance<CanBeSelected> => {
  const {
    selected = false,
    permitSelect = true,
    createChangePermitSelect = createDefaultChangePermitSelected,
    createChangeSelected = createDefaultChangeSelected
  } = params ?? {};
  const internals: Internals<CanBeSelected> = makeAutoObservable({
    selected,
    permitSelect,
    changeSelected: () => null,
    changePermitSelect: () => null,
  });
  internals.changePermitSelect = createChangePermitSelect(internals);
  internals.changeSelected = createChangeSelected(internals);
  return internals as Instance<CanBeSelected>;
};