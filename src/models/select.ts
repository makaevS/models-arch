import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
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
  const internalOption = createHasOptions<T>();
  const internalSelected  = createHasSelected<T>();
  const {
    hasOptions = () => internalOption,
    hasSelected = () => internalSelected,
  } = params ?? {};
  const internals: Internals<Select<T>> = {
    get hasOptions() { return hasOptions(); },
    get hasSelected() { return hasSelected(); },
  };
  return makeInstance(internals);
}