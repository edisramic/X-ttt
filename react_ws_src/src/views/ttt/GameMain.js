import React, { Component } from "react";

import io from "socket.io-client";

import TweenMax from "gsap";

import rand_arr_elem from "../../helpers/rand_arr_elem";
import rand_to_fro from "../../helpers/rand_to_fro";
import isCellSelected from "../../helpers/isCellSelected";

export default class SetName extends Component {
  constructor(props) {
    super(props);

    let rawScoreboard = window.localStorage.getItem(
      app.settings.curr_user.name
    );

    let scoreboard = {};

    if (rawScoreboard) {
      scoreboard = JSON.parse(rawScoreboard);
    }

    this.win_sets = [
      ["c1", "c2", "c3"],
      ["c4", "c5", "c6"],
      ["c7", "c8", "c9"],

      ["c1", "c4", "c7"],
      ["c2", "c5", "c8"],
      ["c3", "c6", "c9"],

      ["c1", "c5", "c9"],
      ["c3", "c5", "c7"],
    ];

    if (this.props.game_type != "live")
      this.state = {
        cell_vals: {},
        next_turn_ply: true,
        game_play: true,
        game_stat: "Start game",
        scoreboard: scoreboard,
      };
    else {
      this.sock_start();

      this.state = {
        cell_vals: {},
        next_turn_ply: true,
        game_play: false,
        game_stat: "Connecting",
        scoreboard: scoreboard,
      };
    }
  }

  //	------------------------	------------------------	------------------------

  componentDidMount() {
    TweenMax.from("#game_stat", 1, {
      display: "none",
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeIn,
    });
    TweenMax.from("#game_board", 1, {
      display: "none",
      opacity: 0,
      x: -200,
      y: -200,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeIn,
    });
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  sock_start() {
    // this.socket = io(app.settings.ws_conf.loc.SOCKET__io.u);
    this.socket = io("http://localhost:3001");

    this.socket.on(
      "connect",
      function (data) {
        // console.log('socket connected', data)

        this.socket.emit("new player", { name: app.settings.curr_user.name });
      }.bind(this)
    );

    this.socket.on(
      "pair_players",
      function (data) {
        // console.log('paired with ', data)

        this.setState({
          next_turn_ply: data.mode == "m",
          game_play: true,
          game_stat: "Playing with " + data.opp.name,
        });
      }.bind(this)
    );

    this.socket.on("opp_turn", this.turn_opp_live.bind(this));
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  componentWillUnmount() {
    this.socket && this.socket.disconnect();
  }

  //	------------------------	------------------------	------------------------

  cell_cont(c) {
    const { cell_vals } = this.state;

    return (
      <div>
        {cell_vals && cell_vals[c] == "x" && (
          <i className="fa fa-times fa-5x"></i>
        )}
        {cell_vals && cell_vals[c] == "o" && (
          <i className="fa fa-circle-o fa-5x"></i>
        )}
      </div>
    );
  }

  //	------------------------	------------------------	------------------------

  render() {
    const { cell_vals } = this.state;
    console.log(cell_vals);

    return (
      <div id="GameMain">
        <h1>Play {this.props.game_type}</h1>

        {this.state.scoreboard && (
          <div>
            <div>{`Wins: ${
              this.state.scoreboard.wins ? this.state.scoreboard.wins : 0
            }`}</div>
            <div>{`Draws: ${
              this.state.scoreboard.draws ? this.state.scoreboard.draws : 0
            }`}</div>
            <div>{`Losses: ${
              this.state.scoreboard.losses ? this.state.scoreboard.losses : 0
            }`}</div>
          </div>
        )}

        <div id="game_stat">
          <div id="game_stat_msg">{this.state.game_stat}</div>
          {this.state.game_play && (
            <div id="game_turn_msg">
              {this.state.next_turn_ply ? "Your turn" : "Opponent turn"}
            </div>
          )}
        </div>

        <div id="game_board">
          <table>
            <tbody>
              <tr>
                <td
                  id="game_board-c1"
                  ref="c1"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c1").bind(this)}
                  aria-label={`Cell 1 - ${isCellSelected(
                    "c1",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c1")}{" "}
                </td>
                <td
                  id="game_board-c2"
                  ref="c2"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c2").bind(this)}
                  className="vbrd"
                  aria-label={`Cell 2 - ${isCellSelected(
                    "c2",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c2")}{" "}
                </td>
                <td
                  id="game_board-c3"
                  ref="c3"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c3").bind(this)}
                  aria-label={`Cell 3 - ${isCellSelected(
                    "c3",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c3")}{" "}
                </td>
              </tr>
              <tr>
                <td
                  id="game_board-c4"
                  ref="c4"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c4").bind(this)}
                  className="hbrd"
                  aria-label={`Cell 4 - ${isCellSelected(
                    "c4",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c4")}{" "}
                </td>
                <td
                  id="game_board-c5"
                  ref="c5"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c5").bind(this)}
                  className="vbrd hbrd"
                  aria-label={`Cell 5 - ${isCellSelected(
                    "c5",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c5")}{" "}
                </td>
                <td
                  id="game_board-c6"
                  ref="c6"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c6").bind(this)}
                  className="hbrd"
                  aria-label={`Cell 6 - ${isCellSelected(
                    "c6",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c6")}{" "}
                </td>
              </tr>
              <tr>
                <td
                  id="game_board-c7"
                  ref="c7"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c7").bind(this)}
                  aria-label={`Cell 7 - ${isCellSelected(
                    "c7",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c7")}{" "}
                </td>
                <td
                  id="game_board-c8"
                  ref="c8"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c8").bind(this)}
                  className="vbrd"
                  aria-label={`Cell 8 - ${isCellSelected(
                    "c8",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c8")}{" "}
                </td>
                <td
                  id="game_board-c9"
                  ref="c9"
                  onClick={this.click_cell.bind(this)}
                  onKeyDown={this.handle_key_press("c9").bind(this)}
                  aria-label={`Cell 9 - ${isCellSelected(
                    "c9",
                    this.state.cell_vals
                  )}`}
                  role="button"
                  tabIndex="0"
                >
                  {" "}
                  {this.cell_cont("c9")}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>{this.display_hint(this.hint)}</div>

        <button
          type="submit"
          onClick={this.end_game.bind(this)}
          className="button"
        >
          <span>
            End Game <span className="fa fa-caret-right"></span>
          </span>
        </button>
      </div>
    );
  }

  display_hint() {
    if (this.state.hint) {
      setTimeout(() => {
        this.setState({
          hint: undefined,
        });
      }, 1000);
      return `Choose ${this.state.hint} ;)`;
    } else {
      return null;
    }
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  click_cell(e) {
    // console.log(e.currentTarget.id.substr(11))
    // console.log(e.currentTarget)

    const cell_id = e.currentTarget.id.substr(11);

    this.handleCellClickOrPress(cell_id);
  }

  handleCellClickOrPress(cellId) {
    if (!this.state.next_turn_ply || !this.state.game_play || !cellId) return;

    if (this.state.cell_vals[cellId]) return;

    if (this.props.game_type != "live") this.turn_ply_comp(cellId);
    else this.turn_ply_live(cellId);
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  turn_ply_comp(cell_id) {
    let { cell_vals } = this.state;

    cell_vals[cell_id] = "x";

    TweenMax.from(this.refs[cell_id], 0.7, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeOut,
    });

    // this.setState({
    // 	cell_vals: cell_vals,
    // 	next_turn_ply: false
    // })

    // setTimeout(this.turn_comp.bind(this), rand_to_fro(500, 1000));

    this.state.cell_vals = cell_vals;

    this.check_turn();
  }

  //	------------------------	------------------------	------------------------

  turn_comp() {
    let { cell_vals } = this.state;
    let empty_cells_arr = [];

    for (let i = 1; i <= 9; i++)
      !cell_vals["c" + i] && empty_cells_arr.push("c" + i);
    // console.log(cell_vals, empty_cells_arr, rand_arr_elem(empty_cells_arr))

    const c = rand_arr_elem(empty_cells_arr);
    cell_vals[c] = "o";

    TweenMax.from(this.refs[c], 0.7, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeOut,
    });

    // this.setState({
    // 	cell_vals: cell_vals,
    // 	next_turn_ply: true
    // })

    this.state.cell_vals = cell_vals;

    this.check_turn();
    this.setState({ hint: this.get_hint("x") });
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  turn_ply_live(cell_id) {
    let { cell_vals } = this.state;

    cell_vals[cell_id] = "x";

    TweenMax.from(this.refs[cell_id], 0.7, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeOut,
    });

    this.socket.emit("ply_turn", { cell_id: cell_id });

    // this.setState({
    // 	cell_vals: cell_vals,
    // 	next_turn_ply: false
    // })

    // setTimeout(this.turn_comp.bind(this), rand_to_fro(500, 1000));

    this.state.cell_vals = cell_vals;

    this.check_turn();
    this.setState({ hint: this.get_hint("o") });
  }

  //	------------------------	------------------------	------------------------

  turn_opp_live(data) {
    let { cell_vals } = this.state;
    let empty_cells_arr = [];

    const c = data.cell_id;
    cell_vals[c] = "o";

    TweenMax.from(this.refs[c], 0.7, {
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: Power4.easeOut,
    });

    // this.setState({
    // 	cell_vals: cell_vals,
    // 	next_turn_ply: true
    // })

    this.state.cell_vals = cell_vals;

    this.check_turn();
    this.setState({ hint: this.get_hint("x") });
  }

  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------
  //	------------------------	------------------------	------------------------

  check_turn() {
    const { cell_vals } = this.state;

    let win = false;
    let set;
    let fin = true;

    if (this.props.game_type != "live") this.state.game_stat = "Play";

    for (let i = 0; !win && i < this.win_sets.length; i++) {
      set = this.win_sets[i];
      if (
        cell_vals[set[0]] &&
        cell_vals[set[0]] == cell_vals[set[1]] &&
        cell_vals[set[0]] == cell_vals[set[2]]
      )
        win = true;
    }

    for (let i = 1; i <= 9; i++) !cell_vals["c" + i] && (fin = false);

    // win && console.log('win set: ', set)

    const scoreboard = {
      wins: this.state.scoreboard.wins ? this.state.scoreboard.wins : 0,
      draws: this.state.scoreboard.draws ? this.state.scoreboard.draws : 0,
      losses: this.state.scoreboard.losses ? this.state.scoreboard.losses : 0,
    };

    if (win) {
      this.refs[set[0]].classList.add("win");
      this.refs[set[1]].classList.add("win");
      this.refs[set[2]].classList.add("win");

      TweenMax.killAll(true);
      TweenMax.from("td.win", 1, { opacity: 0, ease: Linear.easeIn });

      this.setState({
        game_stat: (cell_vals[set[0]] == "x" ? "You" : "Opponent") + " win",
        game_play: false,
      });

      if (cell_vals[set[0]] == "x") {
        scoreboard.wins++;
      } else {
        scoreboard.losses++;
      }

      this.socket && this.socket.disconnect();
    } else if (fin) {
      this.setState({
        game_stat: "Draw",
        game_play: false,
      });

      scoreboard.draws++;

      this.socket && this.socket.disconnect();
    } else {
      this.props.game_type != "live" &&
        this.state.next_turn_ply &&
        setTimeout(this.turn_comp.bind(this), rand_to_fro(500, 1000));

      this.setState({
        next_turn_ply: !this.state.next_turn_ply,
      });
    }

    window.localStorage.setItem(
      app.settings.curr_user.name,
      JSON.stringify(scoreboard)
    );
  }

  //	------------------------	------------------------	------------------------

  end_game() {
    this.socket && this.socket.disconnect();

    this.props.onEndGame();
  }

  // -------------------------- --------------------------- -----------------------

  handle_key_press(cell) {
    return (event) => {
      if (event.key === "Enter") {
        this.handleCellClickOrPress(cell);
      }
    };
  }

  get_hint(player) {
    let { cell_vals, game_play } = this.state;

    if (!game_play) {
      return undefined;
    }

    for (const set of this.win_sets) {
      let count = 0;
      let hintCell = undefined;
      for (const cell of set) {
        if (cell_vals[cell] === player) {
          count++;
        } else {
          hintCell = cell;
        }
      }

      if (count === 2 && cell_vals[hintCell] === undefined) {
        return hintCell;
      }
    }

    return undefined;
  }
}
