import { makeAutoObservable } from "mobx";
import { Instance, Defaults, MakeModel, With } from ".";
import { Displayable } from "./features/displayable";
import {
  createSelectable,
  Selectable,
} from "./features/selectable";

export type SelectOption<T> = MakeModel<
  'SelectOption',
  With<Displayable<T>> & With<Selectable>,
  {},
  {},
  'displayable' | 'selectable',
  'displayable'
>;

export const createSelectOption = <T>(
  params: Defaults<SelectOption<T>>
): Instance<SelectOption<T>> => {
  const {
    displayable,
    selectable,
  } = params;
  return makeAutoObservable({
    displayable,
    selectable: selectable ?? createSelectable()
  });
}