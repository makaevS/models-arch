import { makeAutoObservable } from "mobx";
import { CreateMethods, ModelProto, With } from "..";
import { createDisableable, WithDisableable, WithDisableableDefault } from "../features/disableable";
import {
  createDisplayable,
  WithDisplayable,
  WithDisplayableDefault
} from "../features/displayable";

export type Search = WithDisableable & WithDisplayable<string> & SearchHandlers;

export type WithSearch = With<Search, 'search'>;

export type SearchDefault = Partial<SearchDefaultHandlers & (
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

type SearchHandlers = {
  handleChange: (value: string) => void;
  submit: () => void;
}

type SearchDefaultHandlers = CreateMethods<Search>;

export const createDefaultHandleChange = (model: Search) => (value: string) => {
  model.displayable.label = value;
}

export const createDefaultSubmit = (model: Search) => () => {
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
    createSubmit = createDefaultSubmit,
  } = params ?? {};
  const model: ModelProto<Search> = makeAutoObservable({
    disableable: disableable ?? createDisableable(disableableDefault),
    displayable: displayable ?? createDisplayable(
      displayableDefault ?? { value: '' }
    ),
    handleChange: () => null,
    submit: () => null
  })
  model.handleChange = createHandleChange(model as Search);
  model.submit = createSubmit(model as Search);
  return model as Search;
}