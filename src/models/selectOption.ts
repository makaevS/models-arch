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

export type SelectOption<T> = {
  displayable: Displayable<T>,
  selectable: Selectable
}

export type WithSelectOption<T> = With<SelectOption<T>, 'selectOption'>;

export type SelectOptionDefault<T> = {
  displayable: DisplayableDefault<T>,
  selectable?: SelectableDefault
}

export type WithSelectOptionDefault<T> = With<
  SelectOptionDefault<T>, 'selectOptionDefault'
>;

export const createSelectOption = <T>(
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