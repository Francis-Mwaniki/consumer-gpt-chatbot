<template>
  <div class="main bg-slate-800 flex justify-center items-center mx-auto">
    <h2
      class="flex text-white justify-center items-center mx-auto text-lg relative z-10 top-0 p-2 m-2"
    >
      Welcome to Our ChatBot Ask Any Question!
    </h2>
    <strong class="text-white"
      >signed in as <span class="italic text-orange-400">{{ user.email }}</span>
    </strong>
    <button
      class="text-white rounded bg-transparent py-1 px-3 ring-slate-700 ring-1 hidden"
      @click="logout"
    >
      <Icon name="ic:round-log-out" />Logout
    </button>
    <div id="chat_container">
      <div class="wrapper" v-for="message in messages" :class="{ ai: message.isAi }">
        <div class="chat">
          <div class="profile">
            <img
              :src="message.isAi ? bot : userr"
              :alt="message.isAi ? 'bot' : 'userr'"
            />
          </div>
          <div class="message">
            <template v-if="message.isLoading">
              <span v-text="loadingIndicator"></span>
            </template>
            <template v-else>
              {{ message.text }}
            </template>
          </div>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="handleSubmit"
      class="form-input bg-slate-900"
      @keyup.enter="handleSubmit"
    >
      <textarea
        type="text"
        name="prompt"
        :class="load ? 'bg-slate-500 cursor-not-allowed' : ''"
        :disabled="load"
        :placeholder="load ? 'Please wait while it loads....' : 'Ask your question?'"
        id="prompt"
        v-model="prompt"
      ></textarea>
      <button type="submit" class="btn" :class="load ? ' cursor-not-allowed' : ''">
        <svg
          :class="load ? ' cursor-not-allowed' : ''"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
    <ClientOnly>
      <div class="flex justify-center items-center gap-x-2 flex-row">
        <button class="btn-2" @click="clear">
          <Icon name="ic:sharp-delete-forever" />clear
        </button>
        <button class="btn-2" @click="refresh"><Icon name="uil:refresh" />refresh</button>
      </div>
    </ClientOnly>
    <div
      class="flex justify-center items-center mx-auto text-white md:flex-row flex-col gap-x-1"
    >
      &copy; 2023 Copyright <span class="text-orange-500 text-lg"> Built with Nuxt3</span>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import bott from "../assets/img/bot.svg";
import user_bot from "../assets/img/user.svg";
export default {
  setup() {
    const router = useRouter();
    const client = useSupabaseClient();
    const user = useSupabaseUser();

    definePageMeta({
      middleware: "auth",
    });
    const prompt = ref("");
    const messages = ref([]);
    const loadingIndicator = ref("");
    let loadInterval = null;
    let botsvg = bott;
    let usersvg = user_bot;
    const bot = computed(() => {
      return botsvg;
    });
    const userr = computed(() => {
      return usersvg;
    });
    const load = ref(false);
    const logout = async () => {
      const { error } = await client.auth.signOut();
      if (error) {
        alert(error.message);
      }
      router.push("/");
      window.location.reload;
    };

    function handleSubmit() {
      messages.value.push({
        isAi: false,
        text: prompt.value,
      });
      messages.value.push({
        isAi: true,
        text: "",
        isLoading: true,
      });

      const messageDiv = messages.value[messages.value.length - 1];

      loadInterval = setInterval(() => {
        loadingIndicator.value += ".";
        if (loadingIndicator.value === "....") {
          loadingIndicator.value = "";
        }
      }, 300);
      load.value = true;
      fetch("https://gpt-chat-sb66.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.value,
        }),
      })
        .then((response) => {
          load.value = false;
          if (!response.ok) {
            throw new Error(response.text());
          } else {
            clearInterval(loadInterval);
            return response.json();
          }
        })
        .then((data) => {
          clearInterval(loadInterval);
          messageDiv.text = data.bot.trim();
          messageDiv.isLoading = false;
        })
        .catch((err) => {
          clearInterval(loadInterval);
          messageDiv.text = "Something went wrong";
          messageDiv.isLoading = false;
          alert(err);
        });
      prompt.value = "";
    }

    onMounted(() => {
      console.log(user.value.email);
    });
    const clear = () => {
      messages.value = [];
    };
    const refresh = () => {
      window.location.reload();
    };

    return {
      prompt,
      messages,
      refresh,
      clear,
      loadingIndicator,
      bot,
      logout,
      load,
      user,
      userr,
      handleSubmit,
    };
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400;500;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Alegreya Sans", sans-serif;
}

body {
  background: #343541;
  overflow: auto;
}

#chat_container {
  flex: 1;
  width: 100%;
  margin-top: 90px;
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 10px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  padding-bottom: 20px;
  scroll-behavior: smooth;
}
.btn {
  background-color: #2e2e2e;
  border-radius: 999px;
  padding: 10px 20px;
  color: white;
}
.btn-2 {
  background-color: #1b0a0a;
  border-radius: 10px;
  padding: 10px 30px;
  color: white;
}

/* hides scrollbar */
#chat_container::-webkit-scrollbar {
  display: none;
}

.wrapper {
  width: 100%;
  padding: 15px;
}

.ai {
  background: #40414f;
}
.form-input {
  position: relative;
  bottom: 0px;
  width: 100%;
  max-width: 1280px;
  color: black;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.chat {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
}

.profile {
  width: 36px;
  height: 36px;
  border-radius: 5px;

  background: #5436da;

  display: flex;
  justify-content: center;
  align-items: center;
}

.ai .profile {
  background: #10a37f;
}

.profile img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
}
.message {
  flex: 1;

  color: #ffffff;
  font-size: 20px;

  max-width: 100%;
  overflow-x: scroll;

  /*
       * white space refers to any spaces, tabs, or newline characters that are used to format the CSS code
       * specifies how white space within an element should be handled. It is similar to the "pre" value, which tells the browser to treat all white space as significant and to preserve it exactly as it appears in the source code.
       * The pre-wrap value allows the browser to wrap long lines of text onto multiple lines if necessary.
       * The default value for the white-space property in CSS is "normal". This tells the browser to collapse multiple white space characters into a single space, and to wrap text onto multiple lines as needed to fit within its container.
      */
  white-space: pre-wrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* hides scrollbar */
.message::-webkit-scrollbar {
  display: none;
}

textarea {
  width: 100%;

  color: rgb(255, 255, 255);
  font-size: 18px;

  padding: 10px 5px;
  background: transparent;
  border-radius: 5px;
  border: none;
  outline: none;
}

form img {
  width: 30px;
  height: 30px;
}
</style>
