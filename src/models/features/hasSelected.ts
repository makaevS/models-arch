import { makeAutoObservable } from "mobx";
import { Defaults, Instance, Internals, MakeModel } from "..";

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
  const internals: Internals<HasSelected<T>> = makeAutoObservable({
    selected,
    changeSelected: () => null
  });
  internals.changeSelected = createChangeSelected(internals);
  return internals as Instance<HasSelected<T>>;
}