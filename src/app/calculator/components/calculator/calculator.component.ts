import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { calculatorsButton } from '@/calculator/utils/data.calculator';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyborardEvent($event)',
  },
})
export class CalculatorComponent {
  calculatorButton =
    viewChildren<CalculatorButtonComponent>('calculatorButton');

  handleClick(key: string) {
    console.log({ key });
  }

  //@HostListener('document:keyup', ['$event'])
  handleKeyborardEvent(event: KeyboardEvent) {
    if (!event.key) return;

    const ketEquivalent: Record<string, string> = {
      Escape: 'C',
      ' ': 'C',
      Backspace: 'C',
      Enter: '=',
      '*': 'x',
      '/': '÷',
    };
    const key = event.key;

    const keyValue = ketEquivalent[key] ?? key;

    this.handleClick(keyValue);
    this.calculatorButton().forEach((button) => {
      button.keyboardPressedStyle(keyValue);
    });
  }

  buttonRows = calculatorsButton;
}
