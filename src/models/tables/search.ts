import { makeAutoObservable } from "mobx";
import { CreateMethods, ModelProto, With } from "..";
import { createDisableable, WithDisableable, WithDisableableDefault } from "../features/disableable";
import {
  createDisplayable,
  WithDisplayable,
  WithDisplayableDefault
} from "../features/displayable";

export type Search = WithDisableable & WithDisplayable<string> & SearchMethods;

export type WithSearch = With<Search, 'search'>;

export type SearchDefault = Partial<SearchDefaultMethods & (
  | SearchDefaultParams
  | SearchDefaultModels
)>;

export type WithSearchDefault = With<SearchDefault, 'searchDefault'>;

type SearchDefaultParams =
  & WithDisableableDefault
  & WithDisplayableDefault<string>

type SearchDefaultModels =
  & WithDisableable
  & WithDisplayable<string>

type SearchMethods = {
  handleChange: (value: string) => void;
  handleSubmit: () => void;
}

type SearchDefaultMethods = CreateMethods<Search>;

export const createDefaultHandleChange = (model: Search) => (value: string) => {
  model.displayable.label = value;
}

export const createDefaultHandleSubmit = (model: Search) => () => {
  model.displayable.value = model.displayable.label;
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
  const model: ModelProto<Search> = makeAutoObservable({
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