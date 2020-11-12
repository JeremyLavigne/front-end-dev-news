import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'

// ==============================================================================
// One button 
// ==============================================================================
const Button = ({type, content, onClick}) => {
    return (
        <button className={`button ${type}`} onClick={onClick} >
            {content}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    content: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button;