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
  const {
    canBeDisabled = createCanBeDisabled,
    select = () => createSelect({
      hasSelected: () => createHasSelected({
        selected: limitSelectDefault.selected
      }),
      hasOptions: () => createHasOptions({
        options: limitSelectDefault.options
      })
    }),
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const internals: Internals<Limit> = makeAutoObservable({
    get canBeDisabled() { return canBeDisabled(); },
    get select() { return select(); },
    handleChange: () => null
  });
  internals.handleChange = createHandleChange(internals);
  return internals as Instance<Limit>;
}