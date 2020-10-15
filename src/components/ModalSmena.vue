<template>
    <form class="card auth-card modal modal-smena" id="modal-smena" @submit.prevent="close()">
        <div class="card-content">
            <span class="card-title">Предпологаемый ТО</span>
            <div class="input-field">
                <input
                        id="TO"
                        type="text"
                >
                <label for="TO">TO</label>
                <small class="helper-text invalid">Товарооборот</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Уже есть аккаунт?
                <a href="/">Войти!</a>
            </p>
        </div>
    </form>
</template>

<script>
  export default {
    name: "Modal",
    data: ()=>({
      modal: {}
    }),
    methods:{
      close(){
        this.$emit("close")
      }
    },
  }
</script>

<style scoped>

</style>