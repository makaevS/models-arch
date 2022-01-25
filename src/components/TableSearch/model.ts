import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  With,
  makeInstance,
  makeInnerInstancies,
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
    replaceDisabler: () => void;
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
  const innerInstancies = makeInnerInstancies({
    canBeDisabled: () => createCanBeDisabled(),
    canBeDisplayed: () => createCanBeDisplayed({ value: '' })
  })
  const {
    canBeDisabled = () => innerInstancies.canBeDisabled,
    canBeDisplayed = () => innerInstancies.canBeDisplayed,
    createHandleChange = createDefaultHandleChange,
    createHandleSubmit = createDefaultHandleSubmit,
    createReplaceDisabler = () => () => {
      innerInstancies.canBeDisabled = createCanBeDisabled();
    },
    createChangeCanBeDisabled = () => (value: Instance<CanBeDisabled>) => {
      innerInstancies.canBeDisabled = value;
    },
    createChangeCanBeDisplayed = () => (
      value: Instance<CanBeDisplayed<string>>
    ) => {
      innerInstancies.canBeDisplayed = value;
    }
  } = params ?? {};
  const internals: Internals<Search> = {
    get canBeDisabled() { return canBeDisabled(); },
    get canBeDisplayed() { return canBeDisplayed(); },
    handleChange: () => null,
    handleSubmit: () => null,
    replaceDisabler: () => null,
    changeCanBeDisabled: () => null,
    changeCanBeDisplayed: () => null
  };
  internals.handleChange = createHandleChange(internals);
  internals.handleSubmit = createHandleSubmit(internals);
  internals.replaceDisabler = createReplaceDisabler(internals);
  internals.changeCanBeDisabled = createChangeCanBeDisabled(internals);
  internals.changeCanBeDisplayed = createChangeCanBeDisplayed(internals);
  return makeInstance(internals);
}