import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  resultTest = signal('0');
  subResultText = signal('0');
  lastOperator = signal('x');
}
