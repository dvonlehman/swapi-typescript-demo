import React, { Component, SyntheticEvent } from 'react';
import MagicButton from './components/MagicButton';

class Sample extends Component {
  handleMagicClick = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <MagicButton onClick={this.handleMagicClick} text="See some magic!" />
      </div>
    );
  }
}
