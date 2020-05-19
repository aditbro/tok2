import "./leaderboard.css"

export default class EndScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeaderboardSpace(id) {
    if (this.state.players[id]) {
      return (
        <LeaderboardSpace
          id={"player-" + (id + 1)}
          rank={this.getRankForPlayer(id + 1)}
        />
      )
    } else {
      return null;
    }
  }
  
  getRankForPlayer(id) {
    currentRank = 1
    for (i = 0; i < this.state.players.length; i++) {
      if (this.state.players[i].score > this.state.players[id].score) {
        currentRank++;
      }
    }
    return currentRank;
  }
  render() {
    return (
      <div className="row">
        {this.renderLeaderboardSpace(getRankForPlayer(1))}
        {this.renderLeaderboardSpace(getRankForPlayer(2))}
        {this.renderLeaderboardSpace(getRankForPlayer(3))}
      </div>
    );
  }

}

class LeaderboardSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    className = "leaderboard-rank-" + this.props.rank;
    return (
      <div id={this.props.id} className="leaderboard-space col-md-4">
        <div
          id={"leaderboard-" + this.props.id}
          className={this.className}
        />
        <Score
          score={this.state.players[id].score}
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
        {"Score: " + 100}
      </div>
    )
  }
}