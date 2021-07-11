import React from 'react';
import PropTypes from 'prop-types';

class Delayed extends React.Component <any,any> {
    static propTypes: { waitBeforeShow: PropTypes.Validator<number>; };
    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? '' : this.props.children;
    }
}

Delayed.propTypes = {
  waitBeforeShow: PropTypes.number.isRequired
};

export default Delayed;