<template>
    <div>
        {{timer | date("order")}}
    </div>
</template>

<script>
  export default {
    name: "OrderTime",
    props: ["time"],
    data: ()=>({
      interval: null,
      timer: new Date(0)
    }),
    watch: {
      time: function (n) {
            if(n.timeStart && !n.timeReady){

              this.interval = setInterval(() => {
                this.timer = (new Date().getTime() - n.timeStart);
              }, 1000);
            }else if(n.timeReady){
              this.timer = (n.timeReady - n.timeStart);
              clearInterval(this.interval);
            }
      }
    },
    mounted() {
      if(this.time && !this.time.timeReady){
        this.interval = setInterval(() => {
          this.timer = (new Date().getTime() - this.time.timeStart);
        }, 1000);
      }else if(this.time.timeReady){
        this.timer = (this.time.timeReady - this.time.timeStart);
        clearInterval(this.interval);
      }
      },
    beforeDestroy() {

      clearInterval(this.interval);
    }

  }
</script>

<style scoped>

</style>