import { makeAutoObservable, reaction } from "mobx";
import { With } from ".";
import { WithDisposable } from "./features/disposable";
import { SelectOption } from "./selectOption";

export type Select<T, K extends T | SelectOption<T>> = {
  selected?: K,
  options: K[]
}

export type WithSelect<
  T,
  K extends T | SelectOption<T>
> = With<Select<T, K>, 'select'>;

export type SelectDefault<T, K extends T | SelectOption<T>> =
  & Select<T, K>
  & Partial<WithDisposable>;

export type WithSelectDefault<
  T, K extends T | SelectOption<T>
> = With<SelectDefault<T, K>, 'selectDefault'>;

export const createSelect = <T, K extends T | SelectOption<T>>(
  params: SelectDefault<T, K>,
): Select<T, K> => {
  const {
    selected,
    options,
    disposable
  } = params;
  const model = makeAutoObservable({
    selected,
    options
  });
  if(disposable){
    disposable.add(
      reaction(
        () => {
          const selectedOptions = (model.options as SelectOption<T>[]).filter(
            ({ selectable: { selected } }) => selected
          );
          return selectedOptions;
        },
        (selectedOptions) => {
          if(!selectedOptions.length){
            model.selected = undefined;
            return;
          }
          if(selectedOptions.length === 1){
            if(selectedOptions[0] === model.selected) return;
            model.selected = (selectedOptions[0] as K);
            return;
          }
          const newSelected = (selectedOptions.find(
            option => option !== model.selected
          ) ?? model.selected) as K;
          if((model.selected as SelectOption<T> | null) !== null){
            (model.selected as SelectOption<T>).selectable.selected =
              false;
          }
          model.selected = newSelected;
        }
      )
    )
  }
  return model;
}