import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'role',
    // value: 'button',
    // 'aria-label': 'calculator button',
  },
})
export class CalculatorButtonComponent {
  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  })

  @HostBinding('class.bg-indigo-700') get commandStyle() {
    return this.isCommand();
  }

  @HostBinding('class.w-2/4') get doubleSizeStyle() {
    return this.isDoubleSize();
  }

}
