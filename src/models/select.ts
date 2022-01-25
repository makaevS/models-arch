import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
  makeInnerInstancies,
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
  const innerInstancies = makeInnerInstancies({
    hasOptions: () => createHasOptions<T>(),
    hasSelected: () => createHasSelected<T>()
  })
  const {
    hasOptions = () => innerInstancies.hasOptions,
    hasSelected = () => innerInstancies.hasSelected,
    createChangeHasOptions = () => (value: Instance<HasOptions<T>>) => {
      innerInstancies.hasOptions = value;
    },
    createChangeHasSelected = () => (value: Instance<HasSelected<T>>) => {
      innerInstancies.hasSelected = value;
    }
  } = params ?? {};
  const internals: Internals<Select<T>> = {
    get hasOptions() { return hasOptions(); },
    get hasSelected() { return hasSelected(); },
    changeHasOptions: () => null,
    changeHasSelected: () => null
  };
  internals.changeHasOptions = createChangeHasOptions(internals);
  internals.changeHasSelected = createChangeHasSelected(internals);
  return makeInstance(internals);
}