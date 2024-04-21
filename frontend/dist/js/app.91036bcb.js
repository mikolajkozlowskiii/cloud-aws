(function () {
    "use strict";
    var e = {
        6791: function (e, t, r) {
            var o = r(5130), n = r(6768);
            const a = {class: "d-flex justify-content-center header"};

            function s(e, t, r, o, s, i) {
                const c = (0, n.g2)("the-header"), l = (0, n.g2)("router-view"), d = (0, n.g2)("win-loose-draw"), m = (0, n.g2)("connecting-to-server");
                return (0, n.uX)(), (0, n.CE)(n.FK, null, [(0, n.Lk)("div", a, [(0, n.bF)(c)]), (0, n.bF)(l), e.$store.getters.gameOver ? ((0, n.uX)(), (0, n.Wv)(d, {
                    key: 0,
                    id: "win-loose-draw",
                    resultStr: s.resultStr
                }, null, 8, ["resultStr"])) : (0, n.Q3)("", !0), "backend not connected" === e.$store.state.connectionStr ? ((0, n.uX)(), (0, n.Wv)(m, {key: 1})) : (0, n.Q3)("", !0)], 64)
            }

            var i = {
                data() {
                    return {resultStr: ""}
                }, methods: {}, created() {
                    window.addEventListener("beforeunload", this.$router.replace("/"))
                }, mounted() {
                    let e = this.$store;
                    document.title = "Tic Tac Toe", e.getters.socket.on("on_connect", (t => {
                        e.commit("setConnStr", t)
                    })), e.getters.socket.on("on_disconnect", (t => {
                        e.commit("setConnStr", t), this.$router.replace("/")
                    })), e.getters.socket.on("message", (e => {
                        console.log(e)
                    })), e.getters.socket.on("make_user_switch", (() => {
                        let t = e.getters.myTurn;
                        e.commit("setMyTurn", !t), console.log("our lord and savior backend said to switch the user " + !t)
                    })), e.getters.socket.on("board_changed_in_server", (t => {
                        if (e.commit("changeValue", {x: t["x"], y: t["y"], player: t["player"]}), e.getters.playerHas3InARow("X")) {
                            let t = {roomId: e.getters.roomId, player: "X"};
                            e.getters.socket.emit("someone_won", t), console.log("X won!")
                        } else if (e.getters.playerHas3InARow("O")) {
                            let t = {roomId: e.getters.roomId, player: "O"};
                            e.getters.socket.emit("someone_won", t), console.log("O won!")
                        }
                        e.getters.checkIfFull && (console.log("Draw!"), e.getters.socket.emit("draw", {roomId: e.getters.roomId}))
                    })), e.getters.socket.on("game_over", (t => {
                        e.commit("setGameOver", !0), this.resultStr = t
                    })), e.getters.socket.on("setOppName", (t => {
                        e.commit("setOppUserName", t)
                    }))
                }
            }, c = r(1241);
            const l = (0, c.A)(i, [["render", s]]);
            var d = l, m = r(782);
            const u = r(6226), p = (0, m.y$)({
                state() {
                    return {
                        board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        currentPlayer: "",
                        playerUserName: "",
                        opponentUserName: "",
                        roomId: "",
                        myTurn: !1,
                        gameOver: !1,
                        socket: u("http://127.0.0.1:5000", {transports: ["websocket"]}),
                        connectionStr: "backend not connected"
                    }
                }, mutations: {
                    setConnStr(e, t) {
                        e.connectionStr = t
                    }, changeValue(e, t) {
                        0 === e.board[t.x][t.y] && (e.board[t.x][t.y] = t.player)
                    }, switchPlayer(e) {
                        "O" === e.currentPlayer ? e.currentPlayer = "X" : e.currentPlayer = "O"
                    }, clearBoard(e) {
                        for (let t = 0; t < e.board.length; t++) for (let r = 0; r < e.board[t].length; r++) 0 !== e.board[t][r] && (console.log("clear board"), e.board[t][r] = 0)
                    }, setUserName(e, t) {
                        e.playerUserName = t
                    }, setOppUserName(e, t) {
                        e.opponentUserName = t
                    }, setCurrentPlayer(e, t) {
                        e.currentPlayer = t
                    }, setRoomId(e, t) {
                        e.roomId = t
                    }, setMyTurn(e, t) {
                        e.myTurn = t
                    }, setGameOver(e, t) {
                        e.gameOver = t
                    }
                }, getters: {
                    socket: e => e.socket,
                    board: e => e.board,
                    checkIfFull: e => {
                        for (let t = 0; t < e.board.length; t++) for (let r = 0; r < e.board[t].length; r++) if (0 === e.board[t][r]) return !1;
                        return !0
                    },
                    playerHas3InARow: e => t => {
                        for (let r = 0; r < 3; r++) if (e.board[0][r] === t && e.board[1][r] === t && e.board[2][r] === t) return !0;
                        for (let r = 0; r < 3; r++) if (e.board[r][0] === t && e.board[r][1] === t && e.board[r][2] === t) return !0;
                        return e.board[0][0] === t && e.board[1][1] === t && e.board[2][2] === t || e.board[2][0] === t && e.board[1][1] === t && e.board[0][2] === t
                    },
                    playerUserName: e => e.playerUserName,
                    opponentUserName: e => e.opponentUserName,
                    roomId: e => e.roomId,
                    myTurn: e => e.myTurn,
                    currentPlayer: e => e.currentPlayer,
                    gameOver: e => e.gameOver
                }
            });
            var h = p, v = r(973), g = r(4232);
            const y = e => ((0, n.Qi)("data-v-d57f9fe6"), e = e(), (0, n.jt)(), e), b = {class: "container"}, f = {class: "tictactoe-board"},
                k = {class: "container-fluid gameInfo"}, x = y((() => (0, n.Lk)("div", {class: "line-break"}, null, -1))), _ = {key: 0, class: "yourTurn"},
                w = {key: 1, class: "oppTurn"};

            function I(e, t, r, o, a, s) {
                const i = (0, n.g2)("the-cell");
                return (0, n.uX)(), (0, n.CE)(n.FK, null, [(0, n.Lk)("div", b, [(0, n.Lk)("div", f, [((0, n.uX)(), (0, n.CE)(n.FK, null, (0, n.pI)(3, ((e, t) => (0, n.Lk)("div", {key: t}, [((0, n.uX)(), (0, n.CE)(n.FK, null, (0, n.pI)(3, ((e, r) => (0, n.Lk)("div", {key: r}, [(0, n.bF)(i, {vals: [r, t]}, null, 8, ["vals"])]))), 64))]))), 64))])]), (0, n.Lk)("div", k, [(0, n.Lk)("div", {class: (0, g.C4)(["myName", {active: e.$store.getters.myTurn}])}, (0, g.v_)(e.$store.getters.playerUserName), 3), (0, n.Lk)("div", {class: (0, g.C4)(["oppName", {active: !e.$store.getters.myTurn}])}, (0, g.v_)(e.$store.getters.opponentUserName), 3), x, e.$store.getters.myTurn ? ((0, n.uX)(), (0, n.CE)("div", _, "It's your turn!")) : ((0, n.uX)(), (0, n.CE)("div", w, "Waiting for opponent to move . . ."))])], 64)
            }

            var L = {
                methods: {
                    clearBoard() {
                        this.$store.commit("clearBoard")
                    }
                }
            };
            const O = (0, c.A)(L, [["render", I], ["__scopeId", "data-v-d57f9fe6"]]);
            var C = O;
            const T = e => ((0, n.Qi)("data-v-2675839e"), e = e(), (0, n.jt)(), e), N = {class: "nameInput container"}, $ = {class: "input-button"},
                X = T((() => (0, n.Lk)("label", null, "Gamer Name", -1))), A = ["disabled"];

            function S(e, t, r, a, s, i) {
                return (0, n.uX)(), (0, n.CE)("div", N, [(0, n.Lk)("div", $, [(0, n.bo)((0, n.Lk)("input", {
                    ref: "name",
                    class: (0, g.C4)({active: s.isActive}),
                    onFocus: t[0] || (t[0] = e => s.isActive = !0),
                    onBlur: t[1] || (t[1] = e => 0 === s.name.length ? s.isActive = !1 : s.isActive = s.isActive),
                    type: "text",
                    "onUpdate:modelValue": t[2] || (t[2] = e => s.name = e)
                }, null, 34), [[o.Jo, s.name]]), X, (0, n.Lk)("button", {
                    class: "btn btn-dark",
                    onClickOnce: t[3] || (t[3] = e => i.setUserName()),
                    disabled: !i.validateName(s.name)
                }, "Find Match", 40, A)])])
            }

            var U = {
                data() {
                    return {name: "", isActive: !1}
                }, created() {
                }, watch: {
                    name(e) {
                        let t = 12;
                        e.length < t ? this.name = e : this.name = e.slice(0, t)
                    }
                }, methods: {
                    validateName(e) {
                        return "" !== e
                    }, setUserName() {
                        let e = this.$store.getters.socket, t = this.$store;
                        this.$store.commit("setUserName", this.name), e.emit("get_username", this.name);
                        let r = {room_id: this.name + "-" + e.id, username: this.name};
                        e.emit("user_join_room", r);
                        let o = new Promise(((r, o) => {
                            e ? t.getters.socket.on("set_current_player_and_room_id", (e => {
                                t.commit("setCurrentPlayer", e["player"]), t.commit("setRoomId", e["room_id"]), console.log("my room id is this -> " + t.getters.roomId), "X" === e["player"] && t.commit("setMyTurn", !0), r(t.getters.roomId)
                            })) : o("No socket connection.")
                        }));
                        o.then((r => {
                            e.on("waiting_for_opponent", (() => {
                                let e = "/waiting/" + r;
                                this.$router.replace(e)
                            })), e.on("match_found", (() => {
                                e.emit("sendUserName", {name: t.getters.playerUserName, roomid: t.getters.roomId});
                                let o = "/game/" + r;
                                this.$router.replace(o)
                            }))
                        })).catch((e => {
                            console.log(e)
                        }))
                    }
                }
            };
            const W = (0, c.A)(U, [["render", S], ["__scopeId", "data-v-2675839e"]]);
            var E = W, P = r.p + "img/giphy.765d29ec.gif";
            const j = e => ((0, n.Qi)("data-v-e6bb205a"), e = e(), (0, n.jt)(), e), F = j((() => (0, n.Lk)("h3", null, "Waiting for opponent . . .", -1))),
                M = j((() => (0, n.Lk)("img", {src: P, alt: ""}, null, -1)));

            function Q(e, t, r, o, a, s) {
                return (0, n.uX)(), (0, n.CE)(n.FK, null, [F, M], 64)
            }

            var B = {};
            const G = (0, c.A)(B, [["render", Q], ["__scopeId", "data-v-e6bb205a"]]);
            var K = G;
            const R = (0, v.aE)({history: (0, v.LA)(), routes: [{path: "/", component: E}, {path: "/waiting/:roomid", component: K}, {path: "/game/:roomid", component: C}]});
            var V = R;
            const H = {key: 0};

            function D(e, t, r, o, a, s) {
                return (0, n.uX)(), (0, n.CE)("div", {
                    class: "cell",
                    onClick: t[0] || (t[0] = e => s.makeMove()),
                    style: (0, g.Tr)({"border-width": a.borderWidth})
                }, [0 !== e.$store.state.board[a.x][a.y] ? ((0, n.uX)(), (0, n.CE)("span", H, (0, g.v_)(e.$store.state.board[a.x][a.y]), 1)) : (0, n.Q3)("", !0)], 4)
            }

            var J = {
                props: ["vals"], data() {
                    return {x: this.vals[0], y: this.vals[1], borderWidth: ""}
                }, created() {
                    0 === this.x && 0 === this.y && (this.borderWidth = "0px 2px 2px 0px"), 0 === this.x && 1 === this.y && (this.borderWidth = "0px 2px 2px 2px"), 0 === this.x && 2 === this.y && (this.borderWidth = "0px 0px 2px 2px"), 1 === this.x && 0 === this.y && (this.borderWidth = "2px 2px 2px 0px"), 1 === this.x && 1 === this.y && (this.borderWidth = "2px 2px 2px 2px"), 1 === this.x && 2 === this.y && (this.borderWidth = "2px 0px 2px 2px"), 2 === this.x && 0 === this.y && (this.borderWidth = "2px 2px 0px 0px"), 2 === this.x && 1 === this.y && (this.borderWidth = "2px 2px 0px 2px"), 2 === this.x && 2 === this.y && (this.borderWidth = "2px 0px 0px 2px")
                }, methods: {
                    makeMove() {
                        let e = this.$store;
                        if (0 === e.state.board[this.x][this.y] && e.state.myTurn) {
                            e.commit("setMyTurn", !1), e.commit("changeValue", {
                                x: this.x,
                                y: this.y,
                                player: e.getters.currentPlayer
                            }), e.getters.socket.emit("switch_users", e.getters.roomId);
                            let t = {roomId: e.getters.roomId, player: e.getters.currentPlayer, x: this.x, y: this.y};
                            e.getters.socket.emit("board_changed", t)
                        }
                    }
                }
            };
            const Y = (0, c.A)(J, [["render", D]]);
            var q = Y;
            const z = e => ((0, n.Qi)("data-v-78790c8b"), e = e(), (0, n.jt)(), e), Z = {class: "container"}, ee = {class: "modal-mask"}, te = {class: "modal-wrapper"},
                re = {class: "modal-container"}, oe = {class: "modal-body"}, ne = z((() => (0, n.Lk)("hr", null, null, -1)));

            function ae(e, t, r, a, s, i) {
                return (0, n.uX)(), (0, n.CE)("div", Z, [(0, n.bF)(o.eB, {name: "modal"}, {
                    default: (0, n.k6)((() => [(0, n.Lk)("div", ee, [(0, n.Lk)("div", te, [(0, n.Lk)("div", re, [(0, n.Lk)("div", oe, [(0, n.eW)((0, g.v_)(r.resultStr) + " ", 1), ne, (0, n.Lk)("button", {
                        class: "btn",
                        onClick: t[0] || (t[0] = (...e) => i.newGame && i.newGame(...e))
                    }, "New Game")])])])])])), _: 1
                })])
            }

            var se = {
                props: ["resultStr"], methods: {
                    newGame() {
                        this.$store.state.gameOver = !1, this.$store.commit("clearBoard"), this.$store.commit("setMyTurn", !1), this.$router.replace("/"), window.location.reload()
                    }
                }
            };
            const ie = (0, c.A)(se, [["render", ae], ["__scopeId", "data-v-78790c8b"]]);
            var ce = ie;
            const le = e => ((0, n.Qi)("data-v-2f124a8d"), e = e(), (0, n.jt)(), e), de = {class: "main-header"}, me = le((() => (0, n.Lk)("h1", null, "TIC TAC TOE", -1))),
                ue = [me];

            function pe(e, t, r, o, a, s) {
                return (0, n.uX)(), (0, n.CE)("div", de, ue)
            }

            var he = {};
            const ve = (0, c.A)(he, [["render", pe], ["__scopeId", "data-v-2f124a8d"]]);
            var ge = ve;
            const ye = e => ((0, n.Qi)("data-v-4aa7a74e"), e = e(), (0, n.jt)(), e),
                be = ye((() => (0, n.Lk)("div", {class: "modal-mask"}, [(0, n.Lk)("div", {class: "modal-wrapper"}, [(0, n.Lk)("div", {class: "modal-dialog modal-dialog-centered"}, [(0, n.Lk)("div", {class: "modal-content"}, [(0, n.Lk)("div", {class: "modal-body"}, [(0, n.Lk)("h2", {class: "display-7"}, " Waiting for server . . . "), (0, n.Lk)("p", {class: ""}, " Server is starting 🚀🚀🚀 ")])])])])], -1)));

            function fe(e, t) {
                return (0, n.uX)(), (0, n.Wv)(o.eB, {name: "modal"}, {default: (0, n.k6)((() => [be])), _: 1})
            }

            const ke = {}, xe = (0, c.A)(ke, [["render", fe], ["__scopeId", "data-v-4aa7a74e"]]);
            var _e = xe, we = r(1738), Ie = r(346), Le = r(292);
            r(857);
            we.Yv.add(Ie.Cvc);
            const Oe = (0, o.Ef)(d);
            Oe.component("the-cell", q), Oe.component("win-loose-draw", ce), Oe.component("the-header", ge), Oe.component("connecting-to-backend", _e), Oe.component("font-awesome-icon", Le.gc), Oe.use(h), Oe.use(V), Oe.mount("#app")
        }
    }, t = {};

    function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var a = t[o] = {exports: {}};
        return e[o].call(a.exports, a, a.exports, r), a.exports
    }

    r.m = e, function () {
        var e = [];
        r.O = function (t, o, n, a) {
            if (!o) {
                var s = 1 / 0;
                for (d = 0; d < e.length; d++) {
                    o = e[d][0], n = e[d][1], a = e[d][2];
                    for (var i = !0, c = 0; c < o.length; c++) (!1 & a || s >= a) && Object.keys(r.O).every((function (e) {
                        return r.O[e](o[c])
                    })) ? o.splice(c--, 1) : (i = !1, a < s && (s = a));
                    if (i) {
                        e.splice(d--, 1);
                        var l = n();
                        void 0 !== l && (t = l)
                    }
                }
                return t
            }
            a = a || 0;
            for (var d = e.length; d > 0 && e[d - 1][2] > a; d--) e[d] = e[d - 1];
            e[d] = [o, n, a]
        }
    }(), function () {
        r.d = function (e, t) {
            for (var o in t) r.o(t, o) && !r.o(e, o) && Object.defineProperty(e, o, {enumerable: !0, get: t[o]})
        }
    }(), function () {
        r.g = function () {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" === typeof window) return window
            }
        }()
    }(), function () {
        r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
    }(), function () {
        r.r = function (e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }
    }(), function () {
        r.p = "/"
    }(), function () {
        var e = {524: 0};
        r.O.j = function (t) {
            return 0 === e[t]
        };
        var t = function (t, o) {
            var n, a, s = o[0], i = o[1], c = o[2], l = 0;
            if (s.some((function (t) {
                return 0 !== e[t]
            }))) {
                for (n in i) r.o(i, n) && (r.m[n] = i[n]);
                if (c) var d = c(r)
            }
            for (t && t(o); l < s.length; l++) a = s[l], r.o(e, a) && e[a] && e[a][0](), e[a] = 0;
            return r.O(d)
        }, o = self["webpackChunkvue_tic_tac_toe"] = self["webpackChunkvue_tic_tac_toe"] || [];
        o.forEach(t.bind(null, 0)), o.push = t.bind(null, o.push.bind(o))
    }();
    var o = r.O(void 0, [504], (function () {
        return r(6791)
    }));
    o = r.O(o)
})();
//# sourceMappingURL=app.91036bcb.js.map