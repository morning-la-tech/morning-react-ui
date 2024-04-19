'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { addWeeks } from 'date-fns/addWeeks';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/utils/Enum';
import TimeInput from '@/components/inputs/datetimeField/TimeInput';
import Navigation from '@/components/layout/Navigation';
import DateInput from '@/components/inputs/datetimeField/DateInput';

export default function Page() {
  const [timeValue, setTimeValue] = useState<Date | false | null>(null);
  const [dateValue, setDateValue] = useState<Date | false | null>(null);

  const handleTimeChange = (newTimeValue: Date | false | null) => {
    setTimeValue(newTimeValue);
  };

  const handleDateChange = (newDateValue: Date | false | null) => {
    setDateValue(newDateValue);
  };

  const renderTimeInputs = (props: {
    label?: string;
    sublabel?: string;
    isLabelBold?: boolean;
    size?: Size;
    value: Date | false | null;
    disabled?: boolean;
    isError?: boolean;
    min?: string;
    max?: string;
    onChange: (event: Date | false | null) => void;
  }) => {
    return (
      <>
        <TimeInput {...props} size={Size.xs} />
        <TimeInput {...props} size={Size.s} />
        <TimeInput {...props} size={Size.m} />
        <TimeInput {...props} size={Size.l} />
      </>
    );
  };

  const renderDateInputs = (props: {
    label?: string;
    sublabel?: string;
    isLabelBold?: boolean;
    size?: Size;
    value: Date | false | null;
    disabled?: boolean;
    isError?: boolean;
    from?: string;
    to?: string;
    onChange: (event: Date | false | null) => void;
  }) => {
    return (
      <>
        <DateInput {...props} size={Size.xs} />
        <DateInput {...props} size={Size.s} />
        <DateInput {...props} size={Size.m} />
        <DateInput {...props} size={Size.l} />
      </>
    );
  };

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}> Date & Time Inputs</h1>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Columns>
            <Column>
              <h1>DateInput</h1>
              {renderDateInputs({
                label: 'Normal',
                value: dateValue,
                onChange: handleDateChange,
              })}
              {renderDateInputs({
                label: 'Error',
                isError: true,
                value: dateValue,
                onChange: handleDateChange,
              })}
              {renderDateInputs({
                label: 'Disabled',
                disabled: true,
                value: dateValue,
                onChange: handleDateChange,
              })}
              {renderDateInputs({
                label: format(addWeeks(new Date(), -1), '> dd/MM/yyyy'),
                from: format(addWeeks(new Date(), -1), 'dd/MM/yyyy'),
                value: dateValue,
                onChange: handleDateChange,
              })}
              {renderDateInputs({
                label: format(addWeeks(new Date(), 1), '< dd/MM/yyyy'),
                to: format(addWeeks(new Date(), 1), 'dd/MM/yyyy'),
                value: dateValue,
                onChange: handleDateChange,
              })}
              {renderDateInputs({
                label: `${format(
                  addWeeks(new Date(), -2),
                  'dd/MM/yyyy',
                )} < x < ${format(addWeeks(new Date(), 1), 'dd/MM/yyyy')}`,
                from: format(addWeeks(new Date(), -1), 'dd/MM/yyyy'),
                to: format(addWeeks(new Date(), 1), 'dd/MM/yyyy'),
                value: dateValue,
                onChange: handleDateChange,
              })}
            </Column>
            <Column>
              <h1>TimeInput</h1>
              {renderTimeInputs({
                label: 'Normal',
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: 'Error',
                isError: true,
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: 'Disabled',
                disabled: true,
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: '> 8:00',
                min: '8:00',
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: '< 22:00',
                max: '22:00',
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: '8:00 < x < 22:00',
                min: '8:00',
                max: '22:00',
                value: timeValue,
                onChange: handleTimeChange,
              })}
            </Column>
          </Columns>
        </Container>
      </div>
    </>
  );
}
