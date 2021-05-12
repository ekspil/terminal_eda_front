<template>
  <div>
    {{ timer | date("order") }}
  </div>
</template>

<script>
export default {
  name: "OrderTime",
  props: ["time", "corner"],
  data: () => ({
    interval: null,
    timer: new Date(0)
  }),
  watch: {
    // time: function (n) {
    //       if(n.timeStart && !n.timeReady){
    //
    //         this.interval = setInterval(() => {
    //           this.timer = (new Date().getTime() - n.timeStart);
    //         }, 1000);
    //       }else if(n.timeReady){
    //         this.timer = (n.timeReady - n.timeStart);
    //         clearInterval(this.interval);
    //       }
    // }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.corner && this.corner !== "ALL") {
        const status = this.time.cornerReady.find(
          st => st.corner === this.corner
        );
        if (status && status.readyTime) {
          this.timer = status.readyTime - this.time.timeStart;
          return;
        }
      }
      if (this.time && this.time.timeStart && !this.time.timeReady) {
        this.timer = new Date().getTime() - this.time.timeStart;
      } else if (this.time.timeReady && this.time.timeStart) {
        this.timer = this.time.timeReady - this.time.timeStart;
        clearInterval(this.interval);
      }
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped></style>
