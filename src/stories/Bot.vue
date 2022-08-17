<template>
  <div class="q-page">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; margin-bottom: 7rem">
        <q-chat-message
          v-for="(c, i) in chat"
          :key="i"
          :avatar="
            c.sent
              ? 'https://cdn.quasar.dev/img/avatar3.jpg'
              : require('../assets/bot.jpg')
          "
          :sent="c.sent"
          :text-color="!c.sent ? 'white' : ''"
          :bg-color="!c.sent ? 'primary' : ''"
          :class="c.sent ? 'my-ml' : 'my-mr'"
          ><div>
            {{ c.text }}
            <q-btn
              v-if="c.button"
              flat
              color="black"
              @click="openPrice = true"
              class="my-btn"
            >
              {{ c.button }}
            </q-btn>
          </div></q-chat-message
        >
        <q-chat-message
          avatar="https://cdn.quasar.dev/img/avatar3.jpg"
          sent
          v-if="message.length"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
        <q-chat-message
          avatar="../assets/bot.jpg"
          bg-color="primary"
          v-if="botType"
        >
          <q-spinner-dots size="2rem" color="white" />
        </q-chat-message>
      </div>
    </div>
    <div class="bottom-input-chat" v-if="!endChat && !openPrice">
      <q-input
        v-model="message"
        label="Message"
        dense
        class="my-input"
        @keyup.enter.prevent="sent()"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="sent()" />
        </template>
      </q-input>
    </div>
    <div
      v-if="!endChat && openPrice"
      class="my-input-number"
      :class="{ open: openPrice }"
    >
      <q-input
        v-model.number="price"
        prefix="$"
        type="number"
        standout
        @keyup.enter.prevent="sent()"
      >
        <template v-slot:after>
          <q-btn dense flat icon="send" @click="sent()" color="primary" />
        </template>
      </q-input>
      <q-linear-progress size="xs" :value="progressPrice" color="primary" />
    </div>
  </div>
</template>

<script lang="ts">
import { chat } from 'components/models';
import { defineComponent, ref, watch, onMounted } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const replyBotFun = (
      text: string,
      sent: boolean,
      type: string,
      button: string,
      time: number
    ) => {
      setTimeout(() => {
        chat.value.push({
          text: text,
          sent: sent,
          type: type,
          button: button,
        });
      }, time);
    };
    onMounted(() => {
      botType.value = true;
      replyBotFun('Hello!', false, '', '', 500);
      replyBotFun(
        'Therefore we offer the package to multiple suppliers far 9500$ .',
        false,
        '',
        '',
        1000
      );
      replyBotFun('What is your bid ?', false, '', '', 1500);
      setTimeout(() => {
        botType.value = false;
      }, 1500);
    });
    const endChat = ref(false);
    const showInputPrice = ref([
      'So please enter a more improved offer.',
      'What is your bid ?',
    ]);
    const replyBot = ref([
      {
        sent: 'How are you ?',
        reply: 'I am fine',
      },
      {
        sent: 'What is your name ?',
        reply: 'I am Mysupply',
      },
    ]);
    const chat = ref<chat[]>([]);
    watch(
      chat,
      (newValue) => {
        if (newValue[newValue.length - 1].sent) {
          botType.value = true;
          if (newValue[newValue.length - 1].type === 'price') {
            if (price.value > correctPrice.value) {
              replyBotFun(
                'Thank you This is quite far from what we expected.',
                false,
                '',
                '',
                500
              );
              replyBotFun(
                'What held you back to strongly lower your price ?',
                false,
                '',
                '',
                1000
              );
              setTimeout(() => {
                botType.value = false;
              }, 1000);
            } else {
              replyBotFun(
                'congratulations! you got the deal.',
                false,
                '',
                '',
                500
              );
              setTimeout(() => {
                botType.value = false;
              }, 500);
              endChat.value = true;
            }
            price.value = '';
          } else {
            if (
              replyBot.value.filter(
                (e) => e.sent == newValue[newValue.length - 1].text
              ).length
            ) {
              replyBotFun(
                replyBot.value.filter(
                  (e) => e.sent == newValue[newValue.length - 1].text
                )[0].reply,
                false,
                '',
                '',
                500
              );
              setTimeout(() => {
                botType.value = false;
              }, 500);
            } else {
              replyBotFun(
                'Thanks to our procurement BOT we have strong market overview . This is why we know that our requested cost reduction is possible in your market you are unable to do it , we must look for strong suppiler.',
                false,
                '',
                '',
                500
              );
              replyBotFun(
                'So please enter a more improved offer.',
                false,
                '',
                '',
                1000
              );
              setTimeout(() => {
                botType.value = false;
              }, 1000);
            }
          }
        }
        setTimeout(() => {
          if (
            showInputPrice.value.filter(
              (e) => e == newValue[newValue.length - 1].text
            ).length
          ) {
            price.value = '';
            openPrice.value = true;
          }
        }, 1500);
        const scrollingElement = document.scrollingElement || document.body;
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
      },
      { deep: true }
    );
    const botType = ref(false);
    const message = ref('');
    const price = ref();
    const timeOpenPrice = ref(10000);
    const correctPrice = ref(3000);
    const timeoutId = ref();
    const IntervalId = ref();
    const progressPrice = ref(0);
    const openPrice = ref(false);
    watch(openPrice, (newValue) => {
      console.log(newValue);
      progressPrice.value = 0;
      if (newValue) {
        IntervalId.value = setInterval(function () {
          progressPrice.value += 1000 / timeOpenPrice.value;
        }, 800);
        timeoutId.value = setTimeout(() => {
          openPrice.value = false;
          if (
            !chat.value.filter(
              (e) =>
                e.text ==
                'You should hurry to add price. Do you want to add a price?'
            ).length
          ) {
            chat.value.push({
              text: 'You should hurry to add price. Do you want to add a price?',
              sent: false,
              type: '',
              button: 'Yes',
            });
          }
        }, timeOpenPrice.value);
      } else {
        clearTimeout(timeoutId.value);
        clearTimeout(IntervalId.value);
      }
    });
    return {
      chat,
      botType,
      message,
      price,
      openPrice,
      timeOpenPrice,
      timeoutId,
      progressPrice,
      IntervalId,
      correctPrice,
      replyBot,
      showInputPrice,
      endChat,
      sent() {
        if (message.value.length) {
          replyBotFun(message.value, true, 'text', '', 0);
          message.value = '';
        }
        if (price.value) {
          replyBotFun(`${price.value}$`, true, 'price', '', 0);
          openPrice.value = false;
        }
      },
    };
  },
});
</script>
