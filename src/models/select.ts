import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
  WithInstance,
  WithInstanceDefault
} from ".";
import { createOptionable, Optionable } from "./features/optionable";

export type Select<T> = MakeModel<
  'Select',
  {
    selected?: T
  } & WithInstance<Optionable<T>>,
  {},
  Partial<WithInstanceDefault<Optionable<T>>>,
  'optionable'
>;

export const createDefaultChangeSelected = <T>(internals: Internals<Select<T>>) => (value: T | undefined) => {
  internals.selected = value;
}

export const createSelect = <T>(
  params: InstanceDefault<Select<T>>,
): Instance<Select<T>> => {
  const {
    optionable,
    optionableDefault,
    selected,
    createChangeSelected = createDefaultChangeSelected
  } = params;
  const internals: Internals<Select<T>> = makeAutoObservable({
    optionable: optionable ?? createOptionable(
      optionableDefault
    ),
    selected,
    changeSelected: () => null,
  });
  internals.changeSelected = createChangeSelected(internals);
  // const model = internals as Select<T>;
  // for(const option of options){
  //   if(
  //     typeof option === 'object'
  //     && (option as WithSelectable).selectable !== undefined
  //   ){
  //     const selectOption = option as WithSelectable;
  //     const oldHandler = selectOption.selectable.changeSelected;
  //     selectOption.selectable.changeSelected = (value: boolean) => {
  //       if(value && option !== model.selected){
  //         (model.selected as WithSelectable | undefined)?.selectable.changeSelected(false);
  //         model.changeSelected(option);
  //       }
  //       oldHandler(value);
  //     }
  //     model.options.push(option);
  //   } else {
  //     model.options.push(option);
  //   }
  // }
  // return model;
  return internals as Instance<Select<T>>;
}