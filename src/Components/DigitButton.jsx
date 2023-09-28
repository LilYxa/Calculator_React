import React from 'react';

function DigitButton({className, value, onClick}) {
    return (
        <button className = {className} onClick={() => {onClick(value)}}>{value}</button>
    );
}

export default DigitButton;