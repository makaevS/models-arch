import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from ".";
import { createHasOptions, HasOptions } from "./features/hasOptions";
import { createHasSelected, HasSelected } from "./features/hasSelected";

export type Select<T> = MakeModel<
  'Select',
  With<HasSelected<T>> & With<HasOptions<T>>,
  {},
  {},
  'hasSelected' | 'hasOptions'
>;

export const createSelect = <T>(
  params?: Defaults<Select<T>>,
): Instance<Select<T>> => {
  const {
    hasOptions = () => createHasOptions(),
    hasSelected = () => createHasSelected(),
  } = params ?? {};
  const internals: Internals<Select<T>> = makeAutoObservable({
    get hasOptions() { return hasOptions(); },
    get hasSelected() { return hasSelected(); },
  });
  return internals as Instance<Select<T>>;
}