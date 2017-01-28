import React, { Component } from 'react';
import className from 'classnames';

/**
 * A button component which wraps an HTML button and adds to it the basic "btn" bootstrap class
 */
export default class Button extends Component {
  /**
   * render
   */
  render() {
    const cssClass = this.props.cssClass || 'btn-default';
    const cx = className('btn', cssClass, {
      'hover': this.props.hovered
    });
    return (
      <button
        onClick={this.props.onClick}
        className={cx}
        disabled={this.props.disabled}>
        { this.props.children }
      </button>
    );
  }
}

Button.propTypes = {
  /**
   * A callback function for on click event
   */
  onClick: React.PropTypes.func,
  /**
   * A callback function for on mouse down event
   */
  onMouseDown: React.PropTypes.func,
  /**
   * A custom CSS class name for the button
   */
  cssClass: React.PropTypes.string,
  /**
   * Whether the button is clickable or not
   */
  disabled: React.PropTypes.bool,
  /**
   * Whether the button is in hover state
   */
  hovered: React.PropTypes.bool,
  /**
   * The component's children
   */
  children: React.PropTypes.node
};
