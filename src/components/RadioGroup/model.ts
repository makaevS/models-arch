import {
  Instance,
  InstanceDefault,
  Internals,
  WithInstance
} from "../../models";
import { createOptionable } from "../../models/features/optionable";
import { Selectable } from "../../models/features/selectable";
import { createSelect, Select } from "../../models/select";

export const createDefaultChangeSelected = <T>(
  instance: Internals<Select<T>>
) => (value: T) => {
  instance.selected = value;
}

export const createDefaultHandleOptionsChange = <T>(
  internals: Internals<Select<T>>,
  createHandleOptionChange: (
    internals: Internals<Select<WithInstance<Selectable>>>,
    option: WithInstance<Selectable>
  ) => (optionSelect: boolean) => void
) => {
  const oldChangeOptions = internals.optionable?.changeOptions;
  return (value: T[]) => {
    for(const option in value){
      if(
        (option as unknown as WithInstance<Selectable>)
          .selectable !== undefined
      ){
        (option as unknown as WithInstance<Selectable>)
          .selectable.changeSelected = createHandleOptionChange(
            internals as Internals<Select<WithInstance<Selectable>>>,
            option as unknown as WithInstance<Selectable>
          )
      }
    }
    oldChangeOptions?.(value);
  }
}

export const createDefaultHandleOptionSelected = (
  internals: Internals<Select<WithInstance<Selectable>>>,
  option: WithInstance<Selectable>
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

export type SelectRadioDefault<T> =
  & InstanceDefault<Select<T>>
  & {
    createHandleOptionsChange: typeof createDefaultHandleOptionsChange,
    createHandleOptionSelected: typeof createDefaultHandleOptionSelected,
  }

export const createSelectRadio = <T>(
  params: SelectRadioDefault<T>
): Instance<Select<T>> => {
  const {
    selected,
    optionable,
    optionableDefault,
    createChangeSelected,
    createHandleOptionsChange = createDefaultHandleOptionsChange,
    createHandleOptionSelected = createDefaultHandleOptionSelected
  } = params;
  const optionableModel = optionable ?? createOptionable(
    optionableDefault
  );
  const internals: Internals<Select<T>> = createSelect({
    selected,
    optionable: optionableModel,
    optionableDefault,
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