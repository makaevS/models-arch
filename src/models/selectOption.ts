import { makeAutoObservable } from "mobx";
import { With } from ".";
import {
  createDisplayable,
  Displayable,
  DisplayableDefault
} from "./features/displayable";
import {
  createSelectable,
  Selectable,
  SelectableDefault
} from "./features/selectable";

type SelectOption<T> = {
  displayable: Displayable<T>,
  selectable: Selectable
}

type WithSelectOption<T> = With<SelectOption<T>, 'selectOption'>;

type SelectOptionDefault<T> = {
  displayable: DisplayableDefault<T>,
  selectable?: SelectableDefault
}

type WithSelectOptionDefault<T> = With<
  SelectOptionDefault<T>, 'selectOptionDefault'
>;

const createSelectOption = <T>(
  params: SelectOptionDefault<T>
): SelectOption<T> => {
  const {
    displayable,
    selectable
  } = params;
  return makeAutoObservable({
    displayable: createDisplayable(displayable),
    selectable: createSelectable(selectable)
  });
}

export type {
  SelectOption,
  WithSelectOption,
  SelectOptionDefault,
  WithSelectOptionDefault
};
export { createSelectOption };