import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from ".";
import { createOptionable, Optionable } from "./features/optionable";

export type Select<T> = MakeModel<
  'Select',
  { selected?: T } & With<Optionable<T>>,
  {},
  {},
  'optionable'
>;

export const createDefaultChangeSelected = <T>(internals: Internals<Select<T>>) => (value: T | undefined) => {
  internals.selected = value;
}

export const createSelect = <T>(
  params?: Defaults<Select<T>>,
): Instance<Select<T>> => {
  const {
    optionable,
    selected,
    createChangeSelected = createDefaultChangeSelected
  } = params ?? {};
  const internals: Internals<Select<T>> = makeAutoObservable({
    optionable: optionable ?? createOptionable(),
    selected,
    changeSelected: () => null,
  });
  internals.changeSelected = createChangeSelected(internals);
  return internals as Instance<Select<T>>;
}