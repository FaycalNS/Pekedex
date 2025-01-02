import type { Preview } from "@storybook/react";
import { withApollo } from '../stories/mocks/apolloMock';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypes: {} },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [withApollo],
};

export default preview;