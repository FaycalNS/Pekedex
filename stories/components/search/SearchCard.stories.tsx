// stories/components/search/SearchCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SearchCard from '@/components/pokemon/search-card';
import { withApollo } from '../../mocks/apolloMock';

const meta = {
  title: 'Search/SearchCard',
  component: SearchCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => Promise.resolve(),
      },
    }
  },
  decorators: [
    withApollo,
    (Story) => (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof SearchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default state of the search card showing both search and random buttons.',
      },
    },
  },
};

// With Input Focus
export const WithInputFocus: Story = {
  args: {
    defaultStates: {
      autoFocus: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search card with auto-focused input field.',
      },
    },
  },
};

// With Input Value
export const WithInputValue: Story = {
  args: {
    defaultStates: {
      inputValue: 'pikachu'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search card with pre-filled input value.',
      },
    },
  },
};

// With Invalid Input
export const WithInvalidInput: Story = {
  args: {
    defaultStates: {
      inputValue: '123456789',
      showError: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search card showing validation error state.',
      },
    },
  },
};

// Loading States
export const SearchLoading: Story = {
  args: {
    defaultStates: {
      isSearchLoading: true,
      isRandomLoading: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Search button in loading state while fetching Pokemon data.',
      },
    },
  },
};

export const RandomLoading: Story = {
  args: {
    defaultStates: {
      isSearchLoading: false,
      isRandomLoading: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Random button in loading state while fetching Pokemon data.',
      },
    },
  },
};

// Mobile View
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Search card in mobile viewport.',
      },
    },
  },
};

// Tablet View
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Search card in tablet viewport.',
      },
    },
  },
};

// With Background
export const WithBackground: Story = {
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-themeBgColor p-4 flex items-center justify-center relative">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Search card with themed background.',
      },
    },
  },
};