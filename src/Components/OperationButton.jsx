import React from 'react';

function OperationButton({className, value, onClick}) {
    return (
        <button className={className} onClick={() => {onClick(value)}}>{value}</button>
    );
}

export default OperationButton;