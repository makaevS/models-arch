import {
  Instance,
  Defaults,
  Internals,
  ExtendModel,
  makeInstance,
} from "..";
import { createDefaultChangeSelected, HasSelected } from "./hasSelected";

export type CanBeSelected = ExtendModel<HasSelected<boolean>, {
  permitSelect: boolean;
}>;

export const createDefaultChangePermitSelected = (
  internals: Internals<CanBeSelected>
) => (value: boolean) => {
  internals.permitSelect = value;
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
  const internals: Internals<CanBeSelected> = {
    selected,
    permitSelect,
    changeSelected: () => null,
    changePermitSelect: () => null,
  };
  internals.changePermitSelect = createChangePermitSelect(internals);
  internals.changeSelected = createChangeSelected(internals);
  return makeInstance(internals);
};