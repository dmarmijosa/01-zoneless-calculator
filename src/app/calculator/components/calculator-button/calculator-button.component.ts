import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  viewChild,
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
  onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  @HostBinding('class.bg-indigo-700') get commandStyle() {
    return this.isCommand();
  }

  @HostBinding('class.w-2/4') get doubleSizeStyle() {
    return this.isDoubleSize();
  }

  handelClick() {
    if (!this.contentValue()?.nativeElement) return;
    // this.contentValue()?.nativeElement.innerText = 'clicked';
    const value = this.contentValue()?.nativeElement.innerText;
    this.onClick.emit(value?.trim()!);
  }


}
