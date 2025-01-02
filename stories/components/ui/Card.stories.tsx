import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>A card without footer.</p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>Just content without header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const CustomStyled: Story = {
  render: () => (
    <Card className="w-[350px] py-4 px-6 sm:py-10 sm:px-[60px] bg-white border-[2px] border-themeBorder rounded-[10px]">
      <CardHeader className="p-0 pb-4">
        <CardTitle>Custom Styled Card</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-[34px]">
        <p>Card with custom styling matching your theme.</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="bg-themeMainColor hover:bg-themeBgColor/90 text-white">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};