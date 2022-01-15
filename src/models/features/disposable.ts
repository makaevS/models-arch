import { makeAutoObservable } from "mobx";
import { Instance, InstanceDefault, Internals, MakeModel } from "..";

export type Disposable = MakeModel<'Disposable', {
  disposers: (() => void)[]
}, {
  add: (disposer: () => void) => void;
  dispose: () => void;
}, {}, 'disposers'>;

export const createDefaultAdd = (internals: Internals<Disposable>) => (disposer: () => void) => {
  internals.disposers?.push(disposer);
}

export const createDefaultDispose = (internals: Internals<Disposable>) => () => internals.disposers?.forEach(disposer => disposer())

export const createDisposable = (
  params?: InstanceDefault<Disposable>
): Instance<Disposable> => {
  const {
    disposers = [],
    createAdd = createDefaultAdd,
    createDispose = createDefaultDispose
  } = params ?? {};
  const internals: Internals<Disposable> = makeAutoObservable({
    disposers,
    add: () => null,
    dispose: () => null
  });
  internals.add = createAdd(internals);
  internals.dispose = createDispose(internals);
  return internals as Instance<Disposable>;
}