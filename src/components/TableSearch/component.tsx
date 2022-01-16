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
      disabled
    },
    canBeDisplayed,
    handleChange,
    handleSubmit
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
    </form>
  )
});