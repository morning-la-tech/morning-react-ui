'use client';

import { useState } from 'react';
import Container from '@/components/layout/Container';
import Columns from '@/components/layout/Columns';
import Column from '@/components/layout/Column';
import { Size } from '@/utils/Enum';
import TimeInput from '@/components/inputs/textField/TimeInput';
import Navigation from '@/components/layout/Navigation';

export default function Page() {
  const [timeValue, setTimeValue] = useState<Date | false | null>(null);

  const handleTimeChange = (newTimeValue: Date | false | null) => {
    setTimeValue(newTimeValue);
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

  return (
    <>
      <Navigation>
        <h1 className={'font-size-xl'}> Date & Time Inputs</h1>
      </Navigation>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Container>
          <Columns>
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
