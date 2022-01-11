import { makeAutoObservable } from "mobx";
import { CreateMethods, ModelProto, With } from "..";
import { createDisableable, WithDisableable, WithDisableableDefault } from "../features/disableable";
import { createSelect, WithSelect, WithSelectDefault } from "../select";

export type Limit =
  & LimitMethods
  & WithDisableable
  & WithSelect<number, number>;

export type WithLimit = With<Limit, 'limit'>;

export type LimitDefault = Partial<LimitDefaultMethods & (
  | LimitDefaultParams
  | LimitDefaultModels
)>;

export type WithLimitDefault = With<LimitDefault, 'limit'>;

type LimitDefaultParams =
  & WithDisableableDefault
  & WithSelectDefault<number, number>;

type LimitDefaultModels =
  & WithDisableable
  & WithSelect<number, number>;

type LimitMethods = {
  handleChange: (value: number) => void;
};

type LimitDefaultMethods = CreateMethods<Limit>;

export const createDefaultHandleChange = (model: Limit) => (value: number): void => {
  model.select.selected = value;
}

const limitSelectDefault = {
  selected: 50,
  options: [10, 25, 50, 75, 100]
};

export const createLimit = (params?: LimitDefault): Limit => {
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