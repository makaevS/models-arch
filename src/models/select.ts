import { makeAutoObservable } from "mobx";
import { With } from ".";
import { SelectOption } from "./selectOption";

export type Select<T, K extends T | SelectOption<T>> = {
  selected?: K,
  options: K[]
}

export type WithSelect<
  T,
  K extends T | SelectOption<T>
> = With<Select<T, K>, 'select'>;

export type SelectDefault<T, K extends T | SelectOption<T>> = Select<T, K>

export type WithSelectDefault<
  T, K extends T | SelectOption<T>
> = With<SelectDefault<T, K>, 'selectDefault'>;

export const createSelect = <T, K extends T | SelectOption<T>>(
  params: SelectDefault<T, K>,
): Select<T, K> => {
  const {
    selected,
    options,
  } = params;
  const model: Select<T, K> = makeAutoObservable({
    selected,
    options: []
  });
  for(const option of options){
    if(typeof option !== 'object'){
      model.options.push(option);
    } else {
      const selectOption = option as SelectOption<T>;
      const oldHandler = selectOption.selectable.handleSelected;
      selectOption.selectable.handleSelected = (value: boolean) => {
        if(value && selectOption !== model.selected){
          (model.selected as SelectOption<T>).selectable.handleSelected(false);
          model.selected = selectOption as K;
        }
        oldHandler(value);
      }
      model.options.push(option);
    }
  }
  return model;
}