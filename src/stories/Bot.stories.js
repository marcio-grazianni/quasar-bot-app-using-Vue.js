// import { within, userEvent } from '@storybook/testing-library';
import MyBot from './Bot.vue';

export default {
  title: 'Example/Bot',
  component: MyBot,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Template = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyBot },

  // Here we define the `template`
  template: '<my-bot />',
});

