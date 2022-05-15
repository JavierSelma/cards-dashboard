import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { CardComponent } from '../shared/widgets/card/card.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }
  cardsToOpen : number;
  @Output() createNewCards: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    let number = document.querySelector('input').value;
    this.dialogRef.close(number);
  }

}
