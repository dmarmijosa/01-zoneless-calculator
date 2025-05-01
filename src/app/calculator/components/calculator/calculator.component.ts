import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { JsonPipe } from '@angular/common';
import { calculatorsButton } from '@/calculator/utils/data.calculator';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
  handleClick(key: string) {
    console.log({ key });
  }



  buttonRows = calculatorsButton;
}
