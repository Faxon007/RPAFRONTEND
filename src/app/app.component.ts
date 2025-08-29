import { Component, OnInit } from '@angular/core'
import 'tw-elements'
import { DarkModeService } from './services/dark-mode.service'
//import { pages } from './components/common/sidemenu/pages'

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	//public pages = pages;
	isAuthenticated: boolean | undefined
	constructor(public darkModeService: DarkModeService) {
    this.darkModeService.enableDarkMode();
	}
}
