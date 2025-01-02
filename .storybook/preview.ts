import type { Preview } from "@storybook/react";
import '../app/globals.css'; // Your tailwind styles

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
};

export default preview;