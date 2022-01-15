import { makeAutoObservable } from "mobx";
import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
} from "../../models";
import {
  createDisableable,
  Disableable,
} from "../../models/features/disableable";
import { createOptionable } from "../../models/features/optionable";
import {
  createSelect,
  Select,
} from "../../models/select";

export type Limit = MakeModel<
  'Limit',
  With<Disableable> & With<Select<number>>,
  { handleChange: (value: number) => void },
  {},
  'disableable' | 'select'
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
    disableable,
    select,
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const internals: Internals<Limit> = makeAutoObservable({
    disableable: disableable ?? createDisableable(),
    select: select ?? createSelect({
      selected: limitSelectDefault.selected,
      optionable: createOptionable({
        options: limitSelectDefault.options
      })
    }),
    handleChange: () => null
  });
  internals.handleChange = createHandleChange(internals);
  return internals as Instance<Limit>;
}