import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from "../../models";
import {
  createCanBeDisabled,
  CanBeDisabled,
} from "../../models/features/canBeDisabled";
import { createHasOptions } from "../../models/features/hasOptions";
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
  if(model.select) model.select.changeSelected(value);
}

const limitSelectDefault = {
  selected: 50,
  options: [10, 25, 50, 75, 100]
};

export const createLimit = (
  params?: Defaults<Limit>
): Instance<Limit> => {
  const {
    canBeDisabled,
    select,
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const internals: Internals<Limit> = makeAutoObservable({
    canBeDisabled: canBeDisabled ?? createCanBeDisabled(),
    select: select ?? createSelect({
      selected: limitSelectDefault.selected,
      hasOptions: createHasOptions({
        options: limitSelectDefault.options
      })
    }),
    handleChange: () => null
  });
  internals.handleChange = createHandleChange(internals);
  return internals as Instance<Limit>;
}