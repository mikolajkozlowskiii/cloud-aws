<template>
  <div class="d-flex justify-content-center header">
    <the-header></the-header>
  </div>
  <router-view></router-view>
  <win-loose-draw id="win-loose-draw" v-if="$store.getters.gameOver" :resultStr=resultStr></win-loose-draw>

  <connecting-to-server v-if="$store.state.connectionStr === 'backend not connected'"/>

</template>

<script>

export default {
  data() {
    return {
      resultStr: ""
    }
  },
  methods: {},
  created() {
    window.addEventListener('beforeunload', this.$router.replace("/"));
  },
  mounted() {
    // listening for backend events
    let store = this.$store;
    document.title = 'Tic Tac Toe';

    store.getters.socket.on('on_connect', (msg) => {
      store.commit('setConnStr', msg);
    });
    store.getters.socket.on('on_disconnect', (msg) => {
      store.commit('setConnStr', msg);
      this.$router.replace("/");
    });


    store.getters.socket.on('message', (msg) => {
      console.log(msg);
    });


    store.getters.socket.on('make_user_switch', () => {
      let new_turn = store.getters.myTurn;
      store.commit('setMyTurn', !(new_turn));
      console.log("our lord and savior backend said to switch the user " + (!new_turn));
    })


    store.getters.socket.on('board_changed_in_server', (data) => {

      store.commit('changeValue', {x: data["x"], y: data["y"], player: data["player"]});

      if (store.getters.playerHas3InARow("X")) {
        let data = {roomId: store.getters.roomId, player: "X"};
        store.getters.socket.emit("someone_won", data);
        console.log("X won!");
      } else if (store.getters.playerHas3InARow("O")) {
        let data = {roomId: store.getters.roomId, player: "O"};
        store.getters.socket.emit("someone_won", data);
        console.log("O won!");
      }

      if (store.getters.checkIfFull) {
        console.log("Draw!");
        store.getters.socket.emit("draw", {roomId: store.getters.roomId});
      }
    })

    store.getters.socket.on('game_over', (msg) => {
      store.commit('setGameOver', true);
      this.resultStr = msg;
    })

    store.getters.socket.on('setOppName', (name) => {
      store.commit('setOppUserName', name);
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;500&display=swap');


html,
body {
  height: 100%;
  background: green;
  color: white;
  text-align: center;
  overflow-x: hidden;
}

.header {
  padding-bottom: 5vh;
  margin-top: 8vh;
}

</style>
