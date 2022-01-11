import React from 'react';
import './RadioGroup.css';
import { observer } from 'mobx-react-lite';
import { WithSelect } from '../models/select';
import Radio from './Radio';
import { SelectOption } from '../models/selectOption';

type RadioGroupProps<T> = WithSelect<SelectOption<T>>

const RadioGroup = observer(<T,>({
  select
}: RadioGroupProps<T>) => {
  const { options } = select;
  return (
    <fieldset className='radio-group'>
      {options.map((option, index) => (
        <Radio
          key={index}
          selectOption={option}
        />
      ))}
    </fieldset>
  )
});

export default RadioGroup;