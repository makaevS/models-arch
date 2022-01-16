import { makeAutoObservable } from "mobx";
import { Instance, Defaults, Internals, MakeModel } from "..";

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
  const {
    disposers = [],
    createAdd = createDefaultAdd,
    createDispose = createDefaultDispose
  } = params ?? {};
  const internals: Internals<CanBeDisposed> = makeAutoObservable({
    disposers,
    add: () => null,
    dispose: () => null
  });
  internals.add = createAdd(internals);
  internals.dispose = createDispose(internals);
  return internals as Instance<CanBeDisposed>;
}