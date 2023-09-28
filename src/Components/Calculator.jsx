import React, { useState } from 'react';
import Display from './Display';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

function Calculator() {
    const [expression, setExpression] = useState('');
    const [currentValue, setCurrentValue] = useState('');

    const btnValues = [
        ['C', '←', '+/-'],
        ['%', '(', ')', '÷'],
        [7, 8, 9, '×'],
        [4, 5, 6, '−'],
        [1, 2, 3, '+'],
        [0, '.', '=']
    ];

    const handleButtonClick = (value) => {
        if (value === '=') {
            try {
                const result = eval(expression);
                setExpression(expression + '=' + result);
                setCurrentValue(result.toString());
            } catch (error) {
                setExpression('Error');
                setCurrentValue('');
            }
        } else if (currentValue === '0' && /[1-9]/.test(value)) {
            setCurrentValue(value);
            setExpression(value);
            console.log("here")
        } else if (value === '0' && currentValue === '0') {
            return;
        } else {
            setCurrentValue(currentValue + value);
            setExpression(expression + value);
        }
    }

    return (
        <div className="calculator-grid">
            <Display currentValue={currentValue} expression={expression}/>

            {/* <OperationButton className="span-two" onClick={() => {setCurrentValue(''); setExpression(''); }} value="C"/>
            <OperationButton value="←"/>
            <OperationButton value="+/-"/>
            <OperationButton value="%"/>
            <OperationButton value="("/>
            <OperationButton value=")"/>
            <OperationButton value="÷"/>
            <DigitButton value="7" onClick={handleButtonClick}/>
            <DigitButton value="8" onClick={handleButtonClick}/>
            <DigitButton value="9" onClick={handleButtonClick}/>
            <OperationButton value="×"/>
            <DigitButton value="4" onClick={handleButtonClick}/>
            <DigitButton value="5" onClick={handleButtonClick}/>
            <DigitButton value="6" onClick={handleButtonClick}/>
            <OperationButton value="−"/>
            <DigitButton value="1" onClick={handleButtonClick}/>
            <DigitButton value="2" onClick={handleButtonClick}/>
            <DigitButton value="3" onClick={handleButtonClick}/>
            <OperationButton value="+"/>
            <DigitButton className="span-two" value="0" onClick={handleButtonClick}/>
            <OperationButton value="."/>
            <OperationButton value="="/>  */}

            {btnValues.flat().map((btn, i) => {
                return (
                    <React.Fragment key={i}>
                        {typeof btn === "number" || btn === "." ? (
                            <DigitButton
                                className={btn === 0 ? "span-two" : ""}
                                value={btn}
                                onClick={handleButtonClick}
                            />
                        ) : (
                            <OperationButton className={btn === "C" ? "span-two" : ""}
                            value={btn}
                            //onClick
                            />
                        )}
                    </React.Fragment>
                );
                
            })
            }
    </div>
    );
}

export default Calculator;