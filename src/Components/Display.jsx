import React from 'react';

function Display({currentValue, expression}) {
    return (
        <div className="output">
                <div className="previous_operand">{expression}</div>
                <div className="current_operand">{currentValue}</div>
            </div>
    );
}

export default Display;