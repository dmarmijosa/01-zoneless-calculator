import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['+/-', '%', '%', '.', '=', 'C', 'Backspace', ' '];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultTest = signal('0');
  subResultText = signal('0');
  lastOperator = signal('x');

  constructNumber(value: string) {
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log(`Invalid value: ${value}`);
      return;
    }

    if (value === '=') {
      console.log(`Calculating result for: ${this.resultTest()}`);
      return;
    }

    if (value === 'C') {
      this.resultTest.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultTest() === '0') return;
      if (this.resultTest().length === 1) {
        this.resultTest.set('0');
        return;
      }

      this.resultTest.update((prev) => {
        return prev.slice(0, prev.length - 1);
      });
      return;
    }

    //Operators
    if (operators.includes(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultTest());
      this.resultTest.set('0');
      return;
    }

    //Validatos decimal numbers

    if(value === '.' && !this.resultTest().includes('.')) {
      if(this.resultTest() === '0' || this.resultTest() === '') {
        this.resultTest.update(text => text+'0.')
      }
      return;
    }

    this.resultTest.update((text)=> text + '.');
    return;
  }
}
