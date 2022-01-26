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
  {}
>;

export const createDefaultHandleChange = (model: Internals<Limit>) => (value: number): void => {
  if(model.select) model.select.hasSelected.changeSelected(value);
}

export const createLimit = (
  params?: Defaults<Limit>
): Instance<Limit> => {
  const {
    canBeDisabled = createCanBeDisabled(),
    select = createSelect({
      hasSelected: createHasSelected({
        selected: 50
      }),
      hasOptions: createHasOptions({
        options: [10, 25, 50, 75, 100]
      })
    }),
    createHandleChange = createDefaultHandleChange,
    createChangeCanBeDisabled = (internals: Internals<Limit>) => (
      value: Instance<CanBeDisabled>
    ) => {
      internals.canBeDisabled = value;
    },
    createChangeSelect = (internals: Internals<Limit>) => (
      value: Instance<Select<number>>
    ) => {
      internals.select = value;
    }
  } = params ?? {};
  const internals: Internals<Limit> = {
    canBeDisabled,
    select,
    handleChange: () => null,
    changeCanBeDisabled: () => null,
    changeSelect: () => null
  };
  internals.handleChange = createHandleChange(internals);
  internals.changeCanBeDisabled = createChangeCanBeDisabled(internals);
  internals.changeSelect = createChangeSelect(internals);
  return makeInstance(internals);
}