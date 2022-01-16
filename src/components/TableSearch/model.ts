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
import {
  createCanBeDisplayed,
  CanBeDisplayed,
} from "../../models/features/canBeDisplayed";

export type Search = MakeModel<
  'Search',
  With<CanBeDisabled> & With<CanBeDisplayed<string>>,
  {
    handleChange: (value: string) => void;
    handleSubmit: () => void;
  },
  {},
  'canBeDisabled' | 'canBeDisplayed'
>;

export const createDefaultHandleChange = (model: Internals<Search>) => (value: string) => {
  model.canBeDisplayed?.changeLabel(value);
}

export const createDefaultHandleSubmit = (model: Internals<Search>) => () => {
  model.canBeDisplayed?.changeValue(model.canBeDisplayed.label);
}

export const createSearch = (
  params?: Defaults<Search>
): Instance<Search> => {
  const {
    canBeDisabled,
    canBeDisplayed,
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit
  } = params ?? {};
  const internals: Internals<Search> = makeAutoObservable({
    canBeDisabled: canBeDisabled ?? createCanBeDisabled(),
    canBeDisplayed: canBeDisplayed ?? createCanBeDisplayed({ value: '' }),
    handleChange: () => null,
    handleSubmit: () => null
  });
  internals.handleChange = createHandleChange(internals);
  internals.handleSubmit = createHandleSubmit(internals);
  return internals as Instance<Search>;
}