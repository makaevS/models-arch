import { makeAutoObservable } from "mobx";
import { ChangeMethods, CreateMethods, Internals, OmitMethods, With } from ".";
import { SelectOption } from "./selectOption";

export type Select<T> =
  & Readonly<SelectFields<T>>
  & SelectMethods<T>;

export type WithSelect<T> = With<Select<T>, 'select'>;

export type SelectDefault<T> =
  & Omit<OmitMethods<Select<T>, 'selected'>, 'selected'>
  & Partial<
    & Pick<Select<T>, 'selected'>
    & SelectDefaultMethods<T>
  >;

export type WithSelectDefault<T> = With<SelectDefault<T>, 'selectDefault'>;

type SelectFields<T> = {
  options: T[]
  selected?: T,
};

type SelectMethods<T> = ChangeMethods<SelectFields<T>>;

type SelectDefaultMethods<T> = CreateMethods<Select<T>>

export const createDefaultChangeOptions = <T>(internals: Internals<Select<T>>) => (value: T[]) => {
  internals.options = value;
  internals.changeSelected(undefined);
}

export const createDefaultChangeSelected = <T>(internals: Internals<Select<T>>) => (value: T | undefined) => {
  internals.selected = value;
}

export const createSelect = <T>(
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
      && (option as unknown as SelectOption<never>).selectable !== undefined
    ){
      const selectOption = option as unknown as SelectOption<never>;
      const oldHandler = selectOption.selectable.changeSelected;
      selectOption.selectable.changeSelected = (value: boolean) => {
        if(value && option !== model.selected){
          (model.selected as SelectOption<never> | undefined)?.selectable.changeSelected(false);
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