'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { addWeeks } from 'date-fns/addWeeks';
import DateInput from 'morning-react-ui/components/inputs/datetimeField/DateInput';
import TimeInput from 'morning-react-ui/components/inputs/datetimeField/TimeInput';
import TimeStringInput from 'morning-react-ui/components/inputs/datetimeField/TimeStringInput';
import Column from 'morning-react-ui/components/layout/Column';
import Columns from 'morning-react-ui/components/layout/Columns';
import Container from 'morning-react-ui/components/layout/Container';
import Navigation from 'morning-react-ui/components/layout/Navigation';
import { OptionalDate } from 'morning-react-ui/types';
import { Size } from 'morning-react-ui/utils/Enum';

export default function Page() {
  const [timeValue, setTimeValue] = useState<OptionalDate>(null);
  const [dateValue, setDateValue] = useState<OptionalDate>(null);
  const [timeStringValue, setTimeStringValue] = useState<string | null>(null);

  const handleTimeChange = (newTimeValue: OptionalDate) => {
    setTimeValue(newTimeValue);
  };

  const handleDateChange = (newDateValue: OptionalDate) => {
    setDateValue(newDateValue);
  };

  const handleTimeStringChange = (newTimeStringValue: string | null) => {
    setTimeStringValue(newTimeStringValue);
  };

  const renderTimeInputs = (props: {
    label?: string;
    sublabel?: string;
    bold?: boolean;
    size?: Size;
    value?: OptionalDate;
    disabled?: boolean;
    isError?: boolean;
    min?: Date;
    max?: Date;
    onChange: (event: OptionalDate) => void;
    placeholder?: string;
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
    bold?: boolean;
    size?: Size;
    value?: Date | null;
    disabled?: boolean;
    isError?: boolean;
    from?: string;
    to?: string;
    onChange: (event: OptionalDate) => void;
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

  const renderTimeStringInputs = (props: {
    label?: string;
    sublabel?: string;
    bold?: boolean;
    size?: Size;
    value?: string | null;
    disabled?: boolean;
    isError?: boolean;
    min?: string | null;
    max?: string | null;
    onChange: (event: string | null) => void;
    placeholder?: string;
  }) => {
    return (
      <>
        <TimeStringInput {...props} size={Size.xs} />
        <TimeStringInput {...props} size={Size.s} />
        <TimeStringInput {...props} size={Size.m} />
        <TimeStringInput {...props} size={Size.l} />
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
          <div>Selected time: {timeValue && timeValue.toTimeString()}</div>
          <div>Selected time string: {timeStringValue ?? 'null'}</div>
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
              <h1>TimeInput (Date)</h1>
              {renderTimeInputs({
                label: 'Normal',
                value: timeValue,
                onChange: handleTimeChange,
                placeholder: 'HH:mm',
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
                min: new Date(0, 0, 0, 8, 0),
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: '< 22:00',
                max: new Date(0, 0, 0, 22, 0),
                value: timeValue,
                onChange: handleTimeChange,
              })}
              {renderTimeInputs({
                label: '8:00 < x < 22:00',
                min: new Date(0, 0, 0, 8, 0),
                max: new Date(0, 0, 0, 22, 0),
                value: timeValue,
                onChange: handleTimeChange,
              })}
            </Column>
            <Column>
              <h1>TimeStringInput (String)</h1>
              {renderTimeStringInputs({
                label: 'Normal',
                value: timeStringValue,
                onChange: handleTimeStringChange,
                placeholder: 'HH:mm',
              })}
              {renderTimeStringInputs({
                label: 'Error',
                isError: true,
                value: timeStringValue,
                onChange: handleTimeStringChange,
              })}
              {renderTimeStringInputs({
                label: 'Disabled',
                disabled: true,
                value: timeStringValue,
                onChange: handleTimeStringChange,
              })}
              {renderTimeStringInputs({
                label: '> 08:00',
                min: '08:00',
                value: timeStringValue,
                onChange: handleTimeStringChange,
              })}
              {renderTimeStringInputs({
                label: '< 22:00',
                max: '22:00',
                value: timeStringValue,
                onChange: handleTimeStringChange,
              })}
              {renderTimeStringInputs({
                label: '08:00 < x < 22:00',
                min: '08:00',
                max: '22:00',
                value: timeStringValue,
                onChange: handleTimeStringChange,
              })}
            </Column>
          </Columns>
        </Container>
      </div>
    </>
  );
}
