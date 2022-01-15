import React from 'react';
import { observer } from 'mobx-react-lite';
import { Limit } from '.';
import { WithInstance } from '../../models';

type TableLimitProps = WithInstance<Limit>;

export const TableLimit: React.FC<TableLimitProps> = observer(({
  limit
}) => {
  const {
    disableable: {
      disabled
    },
    select: {
      selected,
      optionable: {
        options
      }
    },
    handleChange
  } = limit;
  return (
    <select
      disabled={disabled}
      value={selected ?? undefined}
      onChange={event => {
        const { currentTarget: { value } } = event;
        handleChange(Number(value));
      }}
    >
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  )
});