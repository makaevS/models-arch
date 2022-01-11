import { makeAutoObservable, reaction } from "mobx";
import { With } from ".";
import { WithDisposable } from "./features/disposable";
import { SelectOption } from "./selectOption";

type Select<T, K extends T | SelectOption<T>> = {
  selected?: K,
  options: K[]
}

type WithSelect<
  T,
  K extends T | SelectOption<T>
> = With<Select<T, K>, 'select'>;

type SelectDefault<T, K extends T | SelectOption<T>> =
  & Select<T, K>
  & Partial<WithDisposable>;

type WithSelectDefault<
  T, K extends T | SelectOption<T>
> = With<SelectDefault<T, K>, 'selectDefault'>;

const createSelect = <T, K extends T | SelectOption<T>>(
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

export type {
  Select,
  WithSelect,
  SelectDefault,
  WithSelectDefault
}
export { createSelect }