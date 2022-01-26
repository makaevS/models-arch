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
  // const innerInstancies = makeInnerInstancies({
  //   hasOptions: () => createHasOptions<T>(),
  //   hasSelected: () => createHasSelected<T>()
  // })
  const {
    hasOptions = createHasOptions<T>(),//() => innerInstancies.hasOptions,
    hasSelected = createHasSelected<T>(),//() => innerInstancies.hasSelected,
    createChangeHasOptions = (internals: Internals<Select<T>>) => (
      value: Instance<HasOptions<T>>
    ) => {
      internals.hasOptions = value;
    },
    createChangeHasSelected = (internals: Internals<Select<T>>) => (
      value: Instance<HasSelected<T>>
    ) => {
      internals.hasSelected = value;
    }
  } = params ?? {};
  const internals: Internals<Select<T>> = {
    hasOptions,
    hasSelected,
    changeHasOptions: () => null,
    changeHasSelected: () => null
  };
  internals.changeHasOptions = createChangeHasOptions(internals);
  internals.changeHasSelected = createChangeHasSelected(internals);
  return makeInstance(internals);
}