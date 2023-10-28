import type { Preview } from "@storybook/react";
import '../src/app/App.module.css';
import ContextMenu from '../src/components/ContextMenu/ContextMenu';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  component: ContextMenu,
  decorators: [withRouter],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
