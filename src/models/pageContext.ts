import React, { createContext, useContext, createElement } from 'react';
import { WithInstance } from '.';
import { Disposable } from './features/disposable';

const PageContext = createContext<WithInstance<Disposable> | null>(null);

/**
 * Custom hook for `PageContext`.
 * 
 * @returns Page model of type `DisposableModel`.
 * 
 * Intended to be used for cases where page element's model require disposable model in order to register own disposer.
 */
export const usePageContext = () => {
  const model = useContext(PageContext);

  if(!model) throw new Error('Page model context must be provided!');
  
  return model;
}

/** Context provider for `PageContext`. */
export const PageProvider: React.FC<{ model: WithInstance<Disposable>; }> = ({
  model,
  children 
}) => createElement(PageContext.Provider, { value: model }, children);