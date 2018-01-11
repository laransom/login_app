import React from 'react'

import './ShadowedCard.css'

class ShadowedCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width ? this.props.width : 'auto',
            height: this.props.height ? this.props.height : 'auto',
            className: this.props.className ? this.props.className : undefined
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            width: nextProps.width ? nextProps.width : 'auto',
            height: nextProps.height ? nextProps.height : 'auto',
            className: nextProps.className ? nextProps.className : undefined
        })
    }
    render() {
        let className = 'shadowed-card';
        if (this.state.className) className += ' '+this.state.className;
        let style = {width: this.state.width, height: this.state.height};
        return (
            <div className={className} style={style}>
                {this.props.children}
            </div>
        );
    }
}

export default ShadowedCard;