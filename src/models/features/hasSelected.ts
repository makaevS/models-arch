import { Defaults, Instance, Internals, makeInstance, MakeModel } from "..";

export type HasSelected<T> = MakeModel<'HasSelected', {
  selected: T | undefined;
}>;

export const createDefaultChangeSelected = <T>(
  internals: Internals<HasSelected<T>>
) => (value?: T) => {
  internals.selected = value;
}

export const createHasSelected = <T>(
  params?: Defaults<HasSelected<T>>
): Instance<HasSelected<T>> => {
  const {
    selected,
    createChangeSelected = createDefaultChangeSelected
  } = params ?? {};
  const internals: Internals<HasSelected<T>> = {
    selected,
    changeSelected: () => null
  };
  internals.changeSelected = createChangeSelected(internals);
  return makeInstance(internals);
}