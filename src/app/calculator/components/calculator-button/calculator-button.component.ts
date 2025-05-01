import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]':'isDoubleSize()',
    '[class.w-1/4]':'!isDoubleSize()',
    // attribute: 'role',
    // value: 'button',
    // 'aria-label': 'calculator button',
  },
})
export class CalculatorButtonComponent {
  onClick = output<string>();
  contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  isPress = signal(false);

  isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  @HostBinding('class.bg-indigo-500') get commandStyle() {
    return this.isCommand();
  }

  // @HostBinding('class.w-2/4') get doubleSizeStyle() {
  //   return this.isDoubleSize();
  // }

  @HostBinding('class.bg-indigo-700') get pressStyle() {
    return this.isPress();
  }

  handelClick() {
    if (!this.contentValue()?.nativeElement) return;
    // this.contentValue()?.nativeElement.innerText = 'clicked';
    const value = this.contentValue()?.nativeElement.innerText;
    this.onClick.emit(value?.trim()!);
  }

  keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPress.set(true);

    // Restablece el estado después de un breve tiempo
    setTimeout(() => this.isPress.set(false), 200);
  }
}
