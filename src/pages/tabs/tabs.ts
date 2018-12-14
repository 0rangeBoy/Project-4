import { Component } from '@angular/core';

import { NewPlanPage } from '../newPlan/newPlan';
import { MapPage } from '../map/map';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewPlanPage;
  tab3Root = MapPage;

  constructor() {

  }
}
