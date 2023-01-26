<template>
  <section class="flex flex-col md:flex-row h-screen items-center relative">
    <div class="bg-slate-900 lg:block w-full md:w-1/2 xl:w-2/3 h-screen" v-if="!user">
      <img
        src="https://cdn.pixabay.com/photo/2017/03/23/12/56/security-2168233_960_720.jpg"
        alt=""
        class="w-full h-3/4 md:h-full object-cover"
      />
    </div>

    <div class="bg-indigo-600 lg:block w-full md:w-1/2 xl:w-2/3 h-screen" v-else>
      <img
        src="https://cdn.pixabay.com/photo/2017/03/23/12/56/security-2168234__340.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="bg-slate-900 w-full md:pb-1 pb-5 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
    >
      <div class="w-full h-100">
        <span class="ml-4 flex justify-center items-center mx-auto">
          <img
            src="https://app.supabase.com/img/supabase-logo.svg"
            alt=""
            class="h-12 w-12"
          />
        </span>
        <h1
          class="text-xl md:text-2xl  flex-col font-bold text-white leading-tight mt-12 justify-center items-center flex mx-auto"
        >
         <span> Log in to your account</span>
         <span> Explore Courses</span>
         <span>Experience with our Chatbot</span>
        </h1>

        <!--  <form class="mt-6" action="#" method="POST">
          <div>
            <label class="block text-gray-700">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter Email Address"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autofocus
              autocomplete
              required
            />
          </div>
          <div class="mt-4">
            <label class="block text-gray-700">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="Enter Password"
              minlength="6"
              class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div class="text-right mt-2">
            <a
              href="#"
              class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >Forgot Password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Log In
          </button>
        </form> -->

        <hr class="my-6 border-gray-300 w-full" />

        <button
          type="button"
          class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-4 border border-gray-300"
          @click="signInWithGoogle"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-6 h-6"
              viewBox="0 0 48 48"
            >
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlink:href="#a" overflow="visible" />
              </clipPath>
              <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </svg>
            <span class="ml-4"> Log in with Google</span>
          </div>
        </button>
        <!--    <button
          type="button"
          class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          @click="handleSignTwitter"
          v-if="!isSignedIn"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 50 50"
            >
              <path
                d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"
              ></path>
            </svg>
            <span class="ml-4"> Log in with Twitter</span>
          </div>
        </button> -->

        <button
          type="button"
          class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 mt-1 text-gray-900 font-semibold rounded-lg px-4 py-2 border border-gray-300"
          @click="signInWithGithub"
        >
          <div class="flex items-center justify-center">
            <svg
              fill="currentColor"
              class="w-6 h-6 m-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span class="ml-4"> Log in with Github</span>
          </div>
        </button>
      </div>
    </div>
    <div
      v-show="open"
      class="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60 mt-5"
    >
      <div
        class="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between"
      >
        <div>
          👉
          <nuxt-link to="/chatbot" class="hover:underline m-1 text-white underline"
            >Tasks</nuxt-link
          >
          <nuxt-link to="/" class="hover:underline m-1 text-white underline"
            >home</nuxt-link
          >
        </div>
        <button class="text-gray-500 hover:text-gray-400 ml-5" @click="open = false">
          <span class="sr-only">Close</span>
          <svg class="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
            <path
              d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    const user = useSupabaseUser();
    const { auth } = useSupabaseClient();
    const open = ref(true);
    watchEffect(() => {
      if (user.value) {
        navigateTo("/chatbot");
      }
    });
    const fetchedData = ref([]);

    const signInWithGithub = async () => {
      const { error, data } = await auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw Error;
      fetchedData.value.push(data);
      console.log(data);
    };
    const signInWithGoogle = async () => {
      const { error, data } = await auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw Error;
      fetchedData.value.push(data);
      console.log(data);
    };
    return { user, auth, signInWithGithub, signInWithGoogle, open };
  },
};
</script>

<style></style>