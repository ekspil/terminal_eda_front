<template>
  <form class="card auth-card" @submit.prevent="login">
    <div class="card-content">
      <span class="card-title">RB Managment Console</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Email не должен быть пустым</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Введите корректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >Пароль должен быть больше
          {{ $v.password.$params.minLength.min }}</small
        ><small
          v-else-if="error === 1"
          class="helper-text invalid"
          >Неверные логин или пароль</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <!--      <p class="center">-->
      <!--        Нет аккаунта?-->
      <!--        <a href="/">Зарегистрироваться</a>-->
      <!--      </p>-->
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    error: 0
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(1) }
  },
  methods: {
    async login() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        login: this.email,
        password: this.password
      };
      const ok = await this.$store.dispatch("login", formData);
      if(!ok){
        this.error = 1
        setTimeout(()=>{
          this.error = 0
        }, 2000)
      }
      else{
        this.$router.push("/");
      }

    }
  }
};
</script>

<style scoped></style>
