import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modalview',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})

export class ModalViewComponent implements OnInit {
  constructor(public matDialog: MatDialog) { }
  @Output() cardsToOpen : EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.cardsToOpen.emit(result);
    });

  }
}
