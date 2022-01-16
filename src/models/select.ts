import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from ".";
import { createHasOptions, HasOptions } from "./features/hasOptions";

export type Select<T> = MakeModel<
  'Select',
  { selected?: T } & With<HasOptions<T>>,
  {},
  {},
  'hasOptions'
>;

export const createDefaultChangeSelected = <T>(internals: Internals<Select<T>>) => (value: T | undefined) => {
  internals.selected = value;
}

export const createSelect = <T>(
  params?: Defaults<Select<T>>,
): Instance<Select<T>> => {
  const {
    hasOptions,
    selected,
    createChangeSelected = createDefaultChangeSelected
  } = params ?? {};
  const internals: Internals<Select<T>> = makeAutoObservable({
    hasOptions: hasOptions ?? createHasOptions(),
    selected,
    changeSelected: () => null,
  });
  internals.changeSelected = createChangeSelected(internals);
  return internals as Instance<Select<T>>;
}