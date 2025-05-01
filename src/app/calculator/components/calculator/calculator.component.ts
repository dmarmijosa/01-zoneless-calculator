import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { calculatorsButton } from '@/calculator/utils/data.calculator';
import { CalculatorService } from '@/calculator/services/calculator.service';

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
  calculatorService = inject(CalculatorService);

  resultText = computed(() => {
    return this.calculatorService.resultTest();
  });
  subResultText = computed(() => {
    return this.calculatorService.subResultText();
  });
  lastOperator = computed(() => {
    return this.calculatorService.lastOperator();
  });

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
