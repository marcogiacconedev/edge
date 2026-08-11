import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-creation',
  imports: [],
  templateUrl: './modal-creation.html',
  styleUrl: './modal-creation.css',
})
export class ModalCreation implements OnChanges {
  @Input() warning!: string;
  @Input() isLoading: boolean = false;
  @Input() loadingCompleted: boolean = false;
  @Input() loadingSuccess: boolean = true;
  @Input() loadingMessage: string = '';
  @Input() resultMessage: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['isLoading']) {
      console.log('isLoading changed:', changes['isLoading'].currentValue);
    }

    if (changes['loadingCompleted'] && changes['loadingCompleted'].currentValue) {
      console.log('Loading completed');
    }

    if (changes['loadingSuccess']) {
      console.log('Success:', changes['loadingSuccess'].currentValue);
    }
  }

}
