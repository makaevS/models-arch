import React from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { WithSearch } from '../models/tables/search';

type TableSearchProps = WithSearch;

const TableSearch: React.FC<TableSearchProps> = observer(({
  search
}) => {
  const {
    disableable: {
      disabled
    },
    displayable,
    handleChange,
    submit
  } = search;
  return (
    <form onSubmit={event => {
      event.preventDefault();
      submit();
    }}>
      <Observer>
        {() => {
          const { label } = displayable;
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

export default TableSearch;