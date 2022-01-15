import {
  Instance,
  Defaults,
  Internals,
  With,
  ExtendModel
} from "../../models";
import { Selectable } from "../../models/features/selectable";
import { createSelect, Select } from "../../models/select";

export type SelectRadio<T extends With<Selectable>> = ExtendModel<
  Select<T>,
  {}, {}, {
    createHandleOptionsChange?: typeof createDefaultHandleOptionsChange,
    createHandleOptionSelected?: typeof createDefaultHandleOptionSelected,
  }
>

export const createDefaultChangeSelected = <T>(
  instance: Internals<Select<T>>
) => (value: T) => {
  instance.selected = value;
}

export const createDefaultHandleOptionsChange = <T>(
  internals: Internals<Select<T>>,
  createHandleOptionChange: (
    internals: Internals<SelectRadio<With<Selectable>>>,
    option: With<Selectable>
  ) => (optionSelect: boolean) => void
) => {
  const oldChangeOptions = internals.optionable?.changeOptions;
  return (value: T[]) => {
    for(const option in value){
      if(
        (option as unknown as With<Selectable>)
          .selectable !== undefined
      ){
        (option as unknown as With<Selectable>)
          .selectable.changeSelected = createHandleOptionChange(
            internals as Internals<Select<With<Selectable>>>,
            option as unknown as With<Selectable>
          )
      }
    }
    oldChangeOptions?.(value);
  }
}

export const createDefaultHandleOptionSelected = (
  internals: Internals<Select<With<Selectable>>>,
  option: With<Selectable>
) => {
  const oldHandleSelected = option.selectable.changeSelected;
  return (optionSelected: boolean) => {
    if(optionSelected){
      if(internals.selected){
        internals.selected.selectable.changeSelected(false);
      }
      internals.changeSelected(option);
    }
    oldHandleSelected(optionSelected);
  }
}

export const createSelectRadio = <T extends With<Selectable>>(
  params?: Defaults<SelectRadio<T>>
): Instance<SelectRadio<T>> => {
  const {
    selected,
    optionable,
    createChangeSelected,
    createHandleOptionsChange = createDefaultHandleOptionsChange,
    createHandleOptionSelected = createDefaultHandleOptionSelected
  } = params ?? {};
  const internals: Internals<Select<T>> = createSelect({
    selected,
    optionable,
    createChangeSelected
  });
  const model = internals as Instance<Select<T>>;
  model.optionable.changeOptions = createHandleOptionsChange(
    internals,
    createHandleOptionSelected
  );
  model.optionable.changeOptions(model.optionable.options);
  return model;
}