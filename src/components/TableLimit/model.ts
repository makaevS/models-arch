import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
  makeInnerInstancies,
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

export const createLimit = (
  params?: Defaults<Limit>
): Instance<Limit> => {
  const innerInstancies = makeInnerInstancies({
    canBeDisabled: () => createCanBeDisabled(),
    select: () => createSelect({
      hasSelected: () => createHasSelected({
        selected: 50
      }),
      hasOptions: () => createHasOptions({
        options: [10, 25, 50, 75, 100]
      })
    })
  })
  const {
    canBeDisabled = () => innerInstancies.canBeDisabled,
    select = () => innerInstancies.select,
    createHandleChange = createDefaultHandleChange,
    createChangeCanBeDisabled = () => (value: Instance<CanBeDisabled>) => {
      innerInstancies.canBeDisabled = value;
    },
    createChangeSelect = () => (value: Instance<Select<number>>) => {
      innerInstancies.select = value;
    }
  } = params ?? {};
  const internals: Internals<Limit> = {
    get canBeDisabled() { return canBeDisabled(); },
    get select() { return select(); },
    handleChange: () => null,
    changeCanBeDisabled: () => null,
    changeSelect: () => null
  };
  internals.handleChange = createHandleChange(internals);
  internals.changeCanBeDisabled = createChangeCanBeDisabled(internals);
  internals.changeSelect = createChangeSelect(internals);
  return makeInstance(internals);
}