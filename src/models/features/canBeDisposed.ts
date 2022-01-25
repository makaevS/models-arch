import {
  Instance,
  Defaults,
  Internals,
  MakeModel,
  makeInstance,
  makeInnerInstancies
} from "..";

export type CanBeDisposed = MakeModel<'CanBeDisposed', {
  disposers: (() => void)[]
}, {
  add: (disposer: () => void) => void;
  dispose: () => void;
}, {}, 'disposers'>;

export const createDefaultAdd = (internals: Internals<CanBeDisposed>) => (disposer: () => void) => {
  internals.disposers?.push(disposer);
}

export const createDefaultDispose = (internals: Internals<CanBeDisposed>) => () => internals.disposers?.forEach(disposer => disposer())

export const createCanBeDisposed = (
  params?: Defaults<CanBeDisposed>
): Instance<CanBeDisposed> => {
  // const internalDisposers: (() => void)[] = [];
  const innerInstancies = makeInnerInstancies({
    disposers: () => [] as (() => void)[]
  });
  const {
    disposers = () => innerInstancies.disposers,
    createAdd = createDefaultAdd,
    createDispose = createDefaultDispose,
    createChangeDisposers = (
      internals: Internals<CanBeDisposed>
    ) => (value: (() => void)[]) => {
      internals.dispose();
      innerInstancies.disposers = value;
    }
  } = params ?? {};
  const internals: Internals<CanBeDisposed> = {
    get disposers() { return disposers(); },
    add: () => null,
    dispose: () => null,
    changeDisposers: () => null
  };
  internals.add = createAdd(internals);
  internals.dispose = createDispose(internals);
  internals.changeDisposers = createChangeDisposers(internals);
  return makeInstance(internals);
}