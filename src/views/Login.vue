<template>
  <div class="bg-gray-200 h-screen">
    <div class="w-64 mx-auto p-5 bg-white">
      <div class="my-4 text-center">
        <span class="text-4xl font-serif">Login</span>
      </div>
      <hr />
      <div class="py-4">
        <form class="flex flex-col items-center">
          <input
            class="h-10 w-full my-1 border-b-2 border-gray-400 focus:border-teal-500 focus:outline-none"
            placeholder="Username"
            type="text"
            v-model="username"
          />

          <input
            class="h-10 w-full my-1 border-b-2 border-gray-400 focus:border-teal-500 focus:outline-none"
            placeholder="Password"
            type="password"
            v-model="password"
          />
        </form>
        <div class="pt-4">
          <button
            class="h-10 w-full text-white bg-teal-500 hover:bg-teal-700"
            @click="login()"
          >
            <span class="text-xl">LOGIN</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/login/ajax", {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          return response.data;
        })
        .then(data => {
          if (data.authenticated === true) {
            // 认证通过
            let roles = data.authorities.map(role => {
              if (/^ROLE_.*/i.test(role.authority)) {
                return role.authority.slice(5);
              }
            });
            this.$store.commit("setRoles", {
              roles,
            });
            this.$router.go(-1);
          }
        });
    },
  },
};
</script>
