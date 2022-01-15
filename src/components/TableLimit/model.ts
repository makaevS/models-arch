import { makeAutoObservable } from "mobx";
import {
  Instance,
  InstanceDefault,
  Internals,
  MakeModel,
  WithInstance,
  WithInstanceDefault,
} from "../../models";
import {
  createDisableable,
  Disableable,
} from "../../models/features/disableable";
import {
  createSelect,
  Select,
} from "../../models/select";

export type Limit = MakeModel<
  'Limit',
  WithInstance<Disableable> & WithInstance<Select<number>>,
  { handleChange: (value: number) => void },
  & Partial<WithInstanceDefault<Disableable>>
  & WithInstanceDefault<Select<number>>,
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
  params?: InstanceDefault<Limit>
): Instance<Limit> => {
  const {
    disableable,
    disableableDefault,
    select,
    selectDefault,
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const internals: Internals<Limit> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    select: select ?? createSelect(selectDefault ?? limitSelectDefault),
    handleChange: () => null
  });
  internals.handleChange = createHandleChange(internals);
  return internals as Instance<Limit>;
}