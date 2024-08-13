import React from 'react';
import { inter } from '../app/fonts';

const decorators = [
  (Story) => (
    <div className={`${inter.className}`}>
      <Story />
    </div>
  ),
];

export default decorators;
