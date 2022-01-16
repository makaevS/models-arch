import React from 'react';
import { observer } from 'mobx-react-lite';
import { Limit } from '.';
import { With } from '../../models';

type TableLimitProps = With<Limit>;

export const TableLimit: React.FC<TableLimitProps> = observer(({
  limit
}) => {
  const {
    canBeDisabled: {
      disabled
    },
    select: {
      hasSelected: {
        selected
      },
      hasOptions: {
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