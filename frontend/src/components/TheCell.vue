<template>
  <div class="cell" @click=makeMove() :style="{'border-width':borderWidth}">
    <span v-if="$store.state.board[x][y] !== 0">{{ $store.state.board[x][y] }}</span>
  </div>
</template>

<script>
export default {
  props: ["vals"],
  data() {
    return {
      x: this.vals[0],
      y: this.vals[1],
      borderWidth: ""

    }
  },
  created() {

    /* border-width: top | right | bottom | left */
    if (this.x === 0 && this.y === 0) {
      this.borderWidth = "0px 2px 2px 0px";
    }
    if (this.x === 0 && this.y === 1) {
      this.borderWidth = "0px 2px 2px 2px";
    }
    if (this.x === 0 && this.y === 2) {
      this.borderWidth = "0px 0px 2px 2px";
    }
    if (this.x === 1 && this.y === 0) {
      this.borderWidth = "2px 2px 2px 0px";
    }
    if (this.x === 1 && this.y === 1) {
      this.borderWidth = "2px 2px 2px 2px";
    }
    if (this.x === 1 && this.y === 2) {
      this.borderWidth = "2px 0px 2px 2px";
    }
    if (this.x === 2 && this.y === 0) {
      this.borderWidth = "2px 2px 0px 0px";
    }
    if (this.x === 2 && this.y === 1) {
      this.borderWidth = "2px 2px 0px 2px";
    }
    if (this.x === 2 && this.y === 2) {
      this.borderWidth = "2px 0px 0px 2px";
    }
  },
  methods: {
    makeMove() {
      let store = this.$store;
      // if its our turn, then we do this shit
      if (store.state.board[this.x][this.y] === 0 && store.state.myTurn) {
        // change user locally
        store.commit('setMyTurn', false);
        // change the cell value locally
        store.commit('changeValue', {x: this.x, y: this.y, player: store.getters.currentPlayer});

        // tell backend to switch users in this room
        store.getters.socket.emit("switch_users", store.getters.roomId);
        // tell the backend a change has been made to the x and y position of the board
        let data = {roomId: store.getters.roomId, player: store.getters.currentPlayer, x: this.x, y: this.y};
        store.getters.socket.emit("board_changed", data);
      }
    }
  }
}
</script>
<style>
.cell {
  width: 64px;
  height: 64px;
  padding-top: 10%;
  font-size: 42px;
  border: 2px solid #8859da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #03DAC6;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}


.cell:hover {
  background: #333;
}
</style>