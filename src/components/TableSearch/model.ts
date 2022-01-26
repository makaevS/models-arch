import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
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
  }
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
    canBeDisabled = createCanBeDisabled(),
    canBeDisplayed = createCanBeDisplayed({ value: '' }),
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit,
    createChangeCanBeDisabled = (internals: Internals<Search>) => (
      value: Instance<CanBeDisabled>
    ) => {
      internals.canBeDisabled = value;
    },
    createChangeCanBeDisplayed = (internals: Internals<Search>) => (
      value: Instance<CanBeDisplayed<string>>
    ) => {
      internals.canBeDisplayed = value;
    }
  } = params ?? {};
  const internals: Internals<Search> = {
    canBeDisabled,
    canBeDisplayed,
    handleChange: () => null,
    handleSubmit: () => null,
    changeCanBeDisabled: () => null,
    changeCanBeDisplayed: () => null
  };
  internals.handleChange = createHandleChange(internals);
  internals.handleSubmit = createHandleSubmit(internals);
  internals.changeCanBeDisabled = createChangeCanBeDisabled(internals);
  internals.changeCanBeDisplayed = createChangeCanBeDisplayed(internals);
  return makeInstance(internals);
}