import { Component } from '@angular/core';
import { NavbarComponent } from '../../../layout/components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAngleUp,
  faBorderAll,
  faBox,
  faClock,
  faGear,
  faHeart,
  faUser,
  faWaveSquare,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [
    NavbarComponent,
    FontAwesomeModule,
    CdkAccordionModule,
    RouterModule,
  ],
  templateUrl: './boards.component.html',
})
export class BoardsComponent {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUser;
  faGear = faGear;
  // dinamic accordion
  // itemList = [
  //   {
  //     label: 'Item 1',
  //     items: [
  //       {
  //         label: 'Sub Item 1.1',
  //       },
  //       {
  //         label: 'Sub Item 1.2',
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Item 2',
  //     items: [
  //       {
  //         label: 'Sub Item 2.1',
  //       },
  //     ],
  //   },
  //   {
  //     label: 'Item 3',
  //     items: [
  //       {
  //         label: 'Sub Item 3.1',
  //       },
  //       {
  //         label: 'Sub Item 3.2',
  //       },
  //       {
  //         label: 'Sub Item 3.3',
  //       },
  //     ],
  //   },
  // ];
}
