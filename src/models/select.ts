import { makeAutoObservable } from "mobx";
import { ChangeMethods, CreateMethods, Internals, OmitMethods, With } from ".";
import { WithSelectable } from "./features/selectable";

export type Select<T extends Value> =
  & Readonly<SelectFields<T>>
  & SelectMethods<T>;

export type WithSelect<T extends Value> = With<Select<T>, 'select'>;

export type SelectDefault<T extends Value> =
  & Omit<OmitMethods<Select<T>, 'selected'>, 'selected'>
  & Partial<
    & Pick<Select<T>, 'selected'>
    & SelectDefaultMethods<T>
  >;

export type WithSelectDefault<T extends Value> = With<SelectDefault<T>, 'selectDefault'>;

type Value =
  | string
  | number
  | boolean
  | Symbol
  | WithSelectable

type SelectFields<T extends Value> = {
  options: T[]
  selected?: T,
};

type SelectMethods<T extends Value> = ChangeMethods<SelectFields<T>>;

type SelectDefaultMethods<T extends Value> = CreateMethods<Select<T>>

export const createDefaultChangeOptions = <T extends Value>(internals: Internals<Select<T>>) => (value: T[]) => {
  internals.options = value;
  internals.changeSelected(undefined);
}

export const createDefaultChangeSelected = <T extends Value>(internals: Internals<Select<T>>) => (value: T | undefined) => {
  internals.selected = value;
}

export const createSelect = <T extends Value>(
  params: SelectDefault<T>,
): Select<T> => {
  const {
    options,
    selected,
    createChangeOptions = createDefaultChangeOptions,
    createChangeSelected = createDefaultChangeSelected
  } = params;
  const internals: Internals<Select<T>> = makeAutoObservable({
    selected,
    options: [],
    changeSelected: () => null,
    changeOptions: () => null
  });
  internals.changeOptions = createChangeOptions(internals);
  internals.changeSelected = createChangeSelected(internals);
  const model = internals as Select<T>;
  for(const option of options){
    if(
      typeof option === 'object'
      && (option as WithSelectable).selectable !== undefined
    ){
      const selectOption = option as WithSelectable;
      const oldHandler = selectOption.selectable.changeSelected;
      selectOption.selectable.changeSelected = (value: boolean) => {
        if(value && option !== model.selected){
          (model.selected as WithSelectable | undefined)?.selectable.changeSelected(false);
          model.changeSelected(option);
        }
        oldHandler(value);
      }
      model.options.push(option);
    } else {
      model.options.push(option);
    }
  }
  return model;
}