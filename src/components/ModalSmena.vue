<template>
    <form class="card auth-card modal modal-smena" id="modal-smena" @submit.prevent="save()">
        <div class="card-content">
            <span class="card-title">Предпологаемый ТО</span>
            <div class="input-field">
                <input
                        id="TO"
                        type="text"
                        v-model="smena.plan"
                >
                <label for="TO">TO</label>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                        class="btn waves-effect waves-light auth-submit"
                        type="submit"
                >
                    Задать
                    <i class="material-icons right">send</i>
                </button>
            </div>

        </div>
    </form>
</template>

<script>
  export default {
    name: "Modal",
    props: ['smena'],
    data: ()=>({
      modal: {},
    }),

    async mounted() {

      window.M.updateTextFields();
    },
    methods:{
      close() {
        this.$emit("close");
      },
      async save() {
        const ok = await this.$store.dispatch("saveSmena", {plan: this.smena.plan, manager: this.$store.state.auth.user.id});
        if (ok) {
          this.close()
          return
        }
        return ok
      }
    },
  }
</script>

<style scoped>

</style>