import React from 'react';
import Tabs, { TabsProps } from './Tabs';
import Tab from './Tab/Tab';

export default {
  component: Tabs,
  argTypes: {
    activeTab: { control: 'text' },
  },
  tags: ['autodocs'],
};

export const DefaultTabs = (args: TabsProps) => (
  <Tabs {...args}>
    <Tab title="Tab 1" active onClick={() => {}}>Tab 1 content</Tab>
    <Tab title="Tab 2" onClick={() => {}}>Tab 2 content</Tab>
    <Tab title="Tab 3" onClick={() => {}}>Tab 3 content</Tab>
  </Tabs>
);

DefaultTabs.args = {
  activeTab: 'Tab 1',
};