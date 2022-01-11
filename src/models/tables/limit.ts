import { makeAutoObservable } from "mobx";
import { CreateMethods, ModelProto, With } from "..";
import { createDisableable, WithDisableable, WithDisableableDefault } from "../features/disableable";
import { createSelect, WithSelect, WithSelectDefault } from "../select";

type Limit =
  & LimitHandlers
  & WithDisableable
  & WithSelect<number, number>;

type WithLimit = With<Limit, 'limit'>;

type LimitDefault = Partial<LimitDefaultHandlers & (
  | LimitDefaultParams
  | LimitDefaultModels
)>;

type WithLimitDefault = With<LimitDefault, 'limit'>;

type LimitDefaultParams =
  & WithDisableableDefault
  & WithSelectDefault<number, number>;

type LimitDefaultModels =
  & WithDisableable
  & WithSelect<number, number>;

type LimitHandlers = {
  handleChange: (value: number) => void;
};

type LimitDefaultHandlers = CreateMethods<Limit>;

const createDefaultHandleChange = (model: Limit) => (value: number): void => {
  model.select.selected = value;
}

const limitSelectDefault = {
  selected: 50,
  options: [10, 25, 50, 75, 100]
};

const createLimit = (params?: LimitDefault): Limit => {
  const {
    disableableDefault,
    selectDefault
  } = (params as LimitDefaultParams) ?? {};
  const {
    disableable,
    select
  } = (params as LimitDefaultModels) ?? {};
  const {
    createHandleChange = createDefaultHandleChange
  } = params ?? {};
  const model: ModelProto<Limit> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    select: select ?? createSelect(selectDefault ?? limitSelectDefault),
    handleChange: () => null
  });
  model.handleChange = createHandleChange(model as Limit)
  return model as Limit;
}

export type {
  Limit,
  WithLimit,
  LimitDefault,
  WithLimitDefault
}
export {
  createLimit,
  createDefaultHandleChange,
  limitSelectDefault
}