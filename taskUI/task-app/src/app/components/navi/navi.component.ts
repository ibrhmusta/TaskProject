import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {

  items: MenuItem[] = [];

  ngOnInit() {
      // this.items = [
      //     {
      //         label: 'Ana Sayfa',          
      //     },
      // ];
  } 
}
