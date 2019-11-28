import { Component, OnInit ,Input} from '@angular/core';
import { MenusService } from '../../../service/MenusService';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Input() isCollapsed;
  triggerTemplate = null;
  menus;
  openMap: { [name: string]: boolean } = {
    sub1: false,
    sub2: false,
    sub3: false
  };
  isCollapsedSlider=false;
  constructor(
    private menu: MenusService
  ) { }

  ngOnInit() {
    this.menus = this.menu.menus();
  }
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }
  launchSidebar() {
    this.isCollapsedSlider = !this.isCollapsedSlider;
  }

}
