import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
} from "../../models";
import {
  createCanBeDisabled,
  CanBeDisabled,
} from "../../models/features/canBeDisabled";
import { createHasOptions } from "../../models/features/hasOptions";
import { createHasSelected } from "../../models/features/hasSelected";
import {
  createSelect,
  Select,
} from "../../models/select";

export type Limit = MakeModel<
  'Limit',
  With<CanBeDisabled> & With<Select<number>>,
  { handleChange: (value: number) => void },
  {},
  'canBeDisabled' | 'select'
>;

export const createDefaultHandleChange = (model: Internals<Limit>) => (value: number): void => {
  if(model.select) model.select.hasSelected.changeSelected(value);
}

const limitSelectDefault = {
  selected: 50,
  options: [10, 25, 50, 75, 100]
};

export const createLimit = (
  params?: Defaults<Limit>
): Instance<Limit> => {
  const innerCanBeDisabled = createCanBeDisabled();
  const innerSelect = createSelect({
    hasSelected: () => createHasSelected({
      selected: limitSelectDefault.selected
    }),
    hasOptions: () => createHasOptions({
      options: limitSelectDefault.options
    })
  });
  const {
    canBeDisabled = () => innerCanBeDisabled,
    select = () => innerSelect,
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const internals: Internals<Limit> = {
    get canBeDisabled() { return canBeDisabled(); },
    get select() { return select(); },
    handleChange: () => null
  };
  internals.handleChange = createHandleChange(internals);
  return makeInstance(internals);
}