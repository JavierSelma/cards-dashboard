import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CardComponent } from 'src/app/shared/widgets/card/card.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @ViewChild("cardsContainer", {static: false, read : ViewContainerRef}) container;
  componentRef: any;

  cardsCounter : number = 0;

  constructor(private dashboardService: DashboardService, private resolver : ComponentFactoryResolver) { }

  addNewCard(numberOfCards : number){
    console.log("aaaaa");
    for(let i = 0; i < numberOfCards; i++){
      const factory = this.resolver.resolveComponentFactory(CardComponent);
      this.componentRef = this.container.createComponent(factory);
      console.log(this.cardsCounter);
      this.cardsCounter++;
      this.componentRef.instance.label = "Card Nº " + this.cardsCounter;
    }
  }
}
