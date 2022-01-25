import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { Search } from '.';
import { With } from '../../models';

type TableSearchProps = With<Search>;

export const TableSearch: React.FC<TableSearchProps> = observer(({
  search
}) => {
  const {
    canBeDisabled: {
      disabled,
      changeDisabled
    },
    canBeDisplayed,
    handleChange,
    handleSubmit,
    replaceDisabler
  } = search;
  return (
    <form onSubmit={event => {
      event.preventDefault();
      handleSubmit();
    }}>
      <Observer>
        {() => {
          const { label } = canBeDisplayed;
          return (
            <input
              disabled={disabled}
              value={label}
              onChange={event => {
                const { currentTarget: { value } } = event;
                handleChange(value);
              }}
            />
          )
        }}
      </Observer>
      <button disabled={disabled}>
        submit
      </button>
      <button onClick={() => changeDisabled(!disabled)}>
        {disabled ? 'enable' : 'disable'}
      </button>
      <button onClick={replaceDisabler}>
        replace disabler
      </button>
    </form>
  )
});