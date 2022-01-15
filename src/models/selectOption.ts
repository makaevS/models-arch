import { makeAutoObservable } from "mobx";
import { Instance, InstanceDefault, MakeModel, WithInstance, WithInstanceDefault } from ".";
import {
  createDisplayable,
  Displayable,
} from "./features/displayable";
import {
  createSelectable,
  Selectable,
} from "./features/selectable";

export type SelectOption<T> = MakeModel<
  'SelectOption',
  WithInstance<Displayable<T>> & WithInstance<Selectable>,
  {},
  & WithInstanceDefault<Displayable<T>>
  & Partial<WithInstanceDefault<Selectable>>,
  'displayable' | 'selectable'
>;

export const createSelectOption = <T>(
  params: InstanceDefault<SelectOption<T>>
): Instance<SelectOption<T>> => {
  const {
    displayable,
    displayableDefault,
    selectable,
    selectableDefault
  } = params;
  return makeAutoObservable({
    displayable: displayable ?? createDisplayable(displayableDefault),
    selectable: selectable ?? createSelectable(selectableDefault)
  });
}