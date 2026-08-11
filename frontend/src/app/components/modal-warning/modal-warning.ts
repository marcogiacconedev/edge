import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../model/model';

@Component({
  selector: 'app-modal-warning',
  imports: [],
  templateUrl: './modal-warning.html',
  styleUrl: './modal-warning.css',
})
export class ModalWarning {

  @Input() warning!: string;
  @Input() isLoading: boolean = false;
  @Input() loadingCompleted: boolean = false;
  @Input() loadingSuccess: boolean = true;
  @Input() loadingMessage: string = '';
  @Input() resultMessage: string = '';
  @Output() action = new EventEmitter<boolean>();

  accept(): void {
    this.action.emit(true);
  }
  
  decline(): void {
    this.action.emit(false);
  }



}
