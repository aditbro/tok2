import React from 'react'
import client from './connection';
export default class MobileDisplay extends React.Component {
  constructor(props) {
    console.log("reconstruct")
    super(props);
    this.state = {
      currentPoint: 0
    }
    // this.addPoint = this.addPoint.bind(this)
  }

  addPoint() {

    // console.log(this.state.currentPoint)
    this.setState({
      currentPoint: this.state.currentPoint + 1
    }, () => {
      console.log(this.state.currentPoint)
    })
    console.log("point added")

  }

  render() {
    return (
      <div>{this.state.currentPoint}</div>
    );
  }

}