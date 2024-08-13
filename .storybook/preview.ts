import type { Preview } from '@storybook/react';
import '../app/theme.scss';
import decorators from './decorators';

const preview: Preview = {
  decorators: decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
