import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import home from '../images/home.jpeg';
import Header from './Header';
import Button from './common/Button';

/**
 * @class Main
 */
class Main extends Component {

  /**
   * Render method
   */
  render() {

    return(
      <div className="Main">
        <img src={ home } className="Main__home-background"/>
        <Header></Header>
        <div className="Main__home-text">
          <div className="Main__top-home-text">Your Wardrobe,</div>
          <div className="Main__bottom-home-text">Right Here</div>
          <Button cssClass="btn btn-primary Main__find-button">Search Your { this.props.clothesNumber } Clothes!</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  clothesNumber: state.clothes.numberOfClothes
});

export default connect(mapStateToProps)(Main);
