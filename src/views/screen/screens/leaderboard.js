'use strict';
import React from 'react';
import "./leaderboard.css"

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeaderboardSpace(id, rank) {
    if(!rank) return null;
    return (
      <LeaderboardSpace
        id={id}
        rank={rank}
        score={this.props.players[id].score}
      />
    )
  }

  getRankForPlayer(id) {
    if(id >= this.props.players.length) return null;
    let currentRank = 1
    for (let i = 0; i < this.props.players.length; i++) {
      if (this.props.players[i].score > this.props.players[id].score) {
        currentRank++;
      }
    }
    return currentRank;
  }

  render() {
    return (
      <div className="row">
        {this.renderLeaderboardSpace(0, this.getRankForPlayer(0))}
        {this.renderLeaderboardSpace(1, this.getRankForPlayer(1))}
        {this.renderLeaderboardSpace(2, this.getRankForPlayer(2))}
      </div>
    );
  }

}

class LeaderboardSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let componentId = "leaderboard-rank-" + this.props.rank;
    let className = "leaderboard-space col-md-4";
    return (
      <div id={componentId} className={className}>
        <Score
          score={this.props.score}
        />
      </div>
    );
  }
}

class Score extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
      <div
        id={"score-" + this.props.id}
        className="score-player"
      >
        {/* {"Score: " + this.props.score} */}
        {"Score: " + this.props.score.toFixed(0)}
      </div>
    )
  }
}