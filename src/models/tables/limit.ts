import { makeAutoObservable } from "mobx";
import { ChangeMethods, CreateMethods, Internals, OmitMethods, With } from "..";
import {
  createDisableable,
  WithDisableable,
  WithDisableableDefault
} from "../features/disableable";
import {
  createSelect,
  WithSelect,
  WithSelectDefault
} from "../select";

export type Limit =
  & LimitMethods
  & WithDisableable
  & WithSelect<number>;

export type WithLimit = With<Limit, 'limit'>;

export type LimitDefault = Partial<LimitDefaultMethods & OmitMethods<(
  | LimitDefaultParams
  | LimitDefaultModels
)>>;

export type WithLimitDefault = With<LimitDefault, 'limit'>;

type LimitDefaultParams =
  & WithDisableableDefault
  & WithSelectDefault<number>;

type LimitDefaultModels =
  & WithDisableable
  & WithSelect<number>;

type LimitFields =
  & WithDisableable
  & WithSelect<number>;

type LimitMethods =
  & ChangeMethods<LimitFields, 'disableable' | 'select'>
  & {
    handleChange: (value: number) => void;
  };

type LimitDefaultMethods = CreateMethods<Limit>;

export const createDefaultHandleChange = (model: Internals<Limit>) => (value: number): void => {
  if(model.select) model.select.changeSelected(value);
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
  const model: Internals<Limit> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    select: select ?? createSelect(selectDefault ?? limitSelectDefault),
    handleChange: () => null
  });
  model.handleChange = createHandleChange(model as Limit)
  return model as Limit;
}