import type { Meta, StoryObj } from '@storybook/react';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="bg-gray-100">
        <TabsTrigger 
          value="account" 
          className="text-gray-500 data-[state=active]:text-emerald-600 hover:text-emerald-500"
        >
          Account
        </TabsTrigger>
        <TabsTrigger 
          value="password"
          className="text-gray-500 data-[state=active]:text-indigo-600 hover:text-indigo-500"
        >
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4 p-4 bg-emerald-50 text-emerald-800">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="mt-4 p-4 bg-indigo-50 text-indigo-800">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
};

export const Threetabs: Story = {
  render: () => (
    <Tabs defaultValue="general" className="w-[400px]">
      <TabsList className="bg-gray-100">
        <TabsTrigger 
          value="general"
          className="text-gray-500 data-[state=active]:text-teal-600 hover:text-teal-500"
        >
          General
        </TabsTrigger>
        <TabsTrigger 
          value="details"
          className="text-gray-500 data-[state=active]:text-purple-600 hover:text-purple-500"
        >
          Details
        </TabsTrigger>
        <TabsTrigger 
          value="settings"
          className="text-gray-500 data-[state=active]:text-rose-600 hover:text-rose-500"
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="mt-4 p-4 bg-teal-50 text-teal-800">
        General information goes here.
      </TabsContent>
      <TabsContent value="details" className="mt-4 p-4 bg-purple-50 text-purple-800">
        Detailed view of the content.
      </TabsContent>
      <TabsContent value="settings" className="mt-4 p-4 bg-rose-50 text-rose-800">
        Customize your settings.
      </TabsContent>
    </Tabs>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="bg-gray-100 p-1 rounded-full">
        <TabsTrigger
          value="tab1"
          className="text-gray-500 data-[state=active]:text-amber-600 hover:text-amber-500 rounded-full"
        >
          Tab 1
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          className="text-gray-500 data-[state=active]:text-cyan-600 hover:text-cyan-500 rounded-full"
        >
          Tab 2
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4 p-4 bg-amber-50 text-amber-800">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab2" className="mt-4 p-4 bg-cyan-50 text-cyan-800">
        Content for Tab 2
      </TabsContent>
    </Tabs>
  ),
};