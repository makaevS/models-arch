import { makeAutoObservable } from "mobx";
import { ChangeMethods, CreateMethods, Internals, OmitMethods, With } from "..";
import { createDisableable, WithDisableable, WithDisableableDefault } from "../features/disableable";
import {
  createDisplayable,
  WithDisplayable,
  WithDisplayableDefault
} from "../features/displayable";

export type Search =
  & Readonly<SearchFields>
  & SearchMethods;

export type WithSearch = With<Search, 'search'>;

export type SearchDefault = Partial<SearchDefaultMethods & OmitMethods<(
  | SearchDefaultParams
  | SearchDefaultModels
)>>;

export type WithSearchDefault = With<SearchDefault, 'searchDefault'>;

type SearchDefaultParams =
  & WithDisableableDefault
  & WithDisplayableDefault<string>

type SearchDefaultModels =
  & WithDisableable
  & WithDisplayable<string>

type SearchFields =
  & WithDisableable
  & WithDisplayable<string>;

type SearchMethods = 
  & ChangeMethods<SearchFields, 'disableable' | 'displayable'>
  & {
    handleChange: (value: string) => void;
    handleSubmit: () => void;
  }

type SearchDefaultMethods = CreateMethods<Search>;

export const createDefaultHandleChange = (model: Internals<Search>) => (value: string) => {
  model.displayable?.changeLabel(value);
}

export const createDefaultHandleSubmit = (model: Internals<Search>) => () => {
  model.displayable?.changeValue(model.displayable.label);
}

export const createSearch = (
  params?: SearchDefault
): Search => {
  const {
    disableableDefault,
    displayableDefault,
  } = (params as SearchDefaultParams) ?? {};
  const {
    disableable,
    displayable,
  } = (params as SearchDefaultModels) ?? {};
  const {
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit,
  } = params ?? {};
  const model: Internals<Search> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    displayable: displayable ?? createDisplayable(
      displayableDefault ?? { value: '' }
    ),
    handleChange: () => null,
    handleSubmit: () => null
  })
  model.handleChange = createHandleChange(model as Search);
  model.handleSubmit = createHandleSubmit(model as Search);
  return model as Search;
}