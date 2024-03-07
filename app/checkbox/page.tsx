'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Size } from '@/util/Enum';
import Checkbox from '@/components/checkboxes/Checkbox';

const CheckboxPage = () => {
  const [isChecked, setIsChecked] = useState({
    terms: false,
    newsletter: false,
    customize: false,
  });

  const handleChange = (name: string, value: boolean) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <Link href={'/'}>Home</Link>
      <h2>Checkbox</h2>
      <form>
        <Checkbox
          label='Checkbox'
          value={isChecked.terms}
          onChange={(value) => handleChange('terms', value)}
          size={Size.m}
        />
        <Checkbox
          label='Checkbox'
          value={isChecked.newsletter}
          onChange={(value) => handleChange('newsletter', value)}
          size={Size.s}
        />
        <Checkbox
          label='Checkbox'
          value={isChecked.customize}
          onChange={(value) => handleChange('customize', value)}
          size={Size.l}
        />
        <Checkbox
          label='Checkbox'
          value={isChecked.customize}
          onChange={(value) => handleChange('customize', value)}
          size={Size.xs}
        />
      </form>
    </div>
  );
};

export default CheckboxPage;
