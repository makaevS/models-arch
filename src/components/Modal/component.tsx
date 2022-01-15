import React, { ReactNode } from 'react';
import './component.css';

type ModalChildren = {
  Header: ReactNode,
  Content: ReactNode
}

type ModalProps<T> = {
  children: T extends ModalChildren ? ModalChildren : ReactNode
}

export const Modal = <T,>({ children }: ModalProps<T>) => {
  const {
    Header,
    Content
  } = (children as ModalChildren);
  const slotted = Header || Content;
  return (
    <section className='modal'>
      {
        slotted && (
          <>
            <header>
              {Header}
            </header>
            {Content}
          </>
        )
      }
      {
        !slotted && (
          <>{children}</>
        )
      }
    </section>
  );
}