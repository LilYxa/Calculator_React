import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import * as math from 'mathjs';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [currentValue, setCurrentValue] = useState('0');

  const btnValues = [
    ['C', '←', '+/-'],
    ['%', '(', ')', '÷'],
    [7, 8, 9, '×'],
    [4, 5, 6, '−'],
    [1, 2, 3, '+'],
    [0, '.', '=']
  ];


const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    if (expression.length < 16) {

      setExpression((prevExpression) => prevExpression + value);
    }
  }
  
  

  const resetClickHandler = (e) => {
    e.preventDefault();
    setExpression('');
    setCurrentValue('0');
  }

  const deleteClickHandler = (e) => {
    e.preventDefault();
    setExpression((prevExpression) => prevExpression.slice(0, -1));
    setCurrentValue((prevValue) => prevValue.slice(0, -1));
  }

  const invertClickHandler = (e) => {
    e.preventDefault();
    // const currentNumber = parseFloat(currentValue);
    const currentNumber = parseFloat(expression);
    console.log(currentNumber)
    if (!isNaN(currentNumber)) {
      const invertedNumber = -currentNumber;
      // const updatedExpression = expression.replace(currentValue, invertedNumber.toString());
      setExpression(invertedNumber.toString())
      // console.log(updatedExpression)
      // setExpression(updatedExpression);
      setCurrentValue(invertedNumber.toString());
    }
  };

  const percentClickHandler = (e) => {
    e.preventDefault();
    setExpression((prevExpression) => {
      try {
        const result = math.evaluate(prevExpression) / 100;
        return result.toString();
      } catch (error) {
        return prevExpression;
      }
    });
  }

const bracketsClickHandler = (e) => {
    const value = e.target.innerHTML;
  
    // Функция для определения, следует ли добавлять открывающую или закрывающую скобку
    const shouldAddOpeningBracket = (expression) => {
      const lastChar = expression.charAt(expression.length - 1);
      const isOpeningBracket = lastChar === '(';
      const isOperator = /[+\-*/]/.test(lastChar);
  
      return expression === '' || isOpeningBracket || isOperator;
    };
  
    const shouldAddClosingBracket = (expression) => {
      const lastChar = expression.charAt(expression.length - 1);
      const isClosingBracket = lastChar === ')';
      const isOperand = /[0-9]/.test(lastChar);
  
      return !expression || isOperand || isClosingBracket;
    };
  
    setExpression((prevExpression) => {
      let newExpression = prevExpression;
  
      if (value === '(' && shouldAddOpeningBracket(prevExpression)) {
        newExpression += value;
      } else if (value === ')' && shouldAddClosingBracket(prevExpression)) {
        newExpression += value;
      }
  
      return newExpression;
    });
  };
  

  const equalsClickHandler = (e) => {
    e.preventDefault();
    try {
      const result = math.evaluate(expression);
      // setExpression(`${expression}`);
      setExpression(result.toString())
      // setCurrentValue(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  }

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    let operator = value;
  
    // Проверка на символ оператора и замена на соответствующий символ
    switch (value) {
      case "÷":
        operator = "/";
        break;
      case "×":
        operator = "*";
        break;
      case "−":
        operator = "-";
        break;
      default:
        break;
    }
  
    setExpression((prevExpression) => {
      const lastChar = prevExpression[prevExpression.length - 1];
      return /[+\-*/]/.test(lastChar) ? prevExpression.slice(0, -1) + operator : prevExpression + operator;
    });
  }
  

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setExpression((prevExpression) => {
      const lastChar = prevExpression[prevExpression.length - 1];
      return /[0-9]/.test(lastChar) && !prevExpression.includes('.') ? prevExpression + value : prevExpression;
    });
  }

  return (
    <div className="calculator-grid">
      <Display currentValue={currentValue} expression={expression} />

      {
        btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={(btn === 0 || btn === "C") ? "span-two" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "←"
                  ? deleteClickHandler
                  : btn === "+/-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "(" || btn === ")"
                  ? bracketsClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "÷" || btn === "×" || btn === "−" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })
      }
    </div>
  );
}

export default Calculator;
