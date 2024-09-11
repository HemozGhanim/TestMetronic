import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { SearchModalComponent } from './partials/search-modal/search-modal.component';
import KTComponents from '../metronic/core/index';
// @ts-ignore
import KTLayout from '../metronic/app/layouts/demo1';
import { ThemeService } from './shared/handlers/theme.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SearchModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'dasho';
  @HostBinding('class') hostClass = 'flex grow';

  constructor(private themeService: ThemeService, private updates: SwUpdate) {}

  ngAfterViewInit(): void {
    KTComponents.init();
    KTLayout.init();
  }

  ngOnInit(): void {
    this.themeService.ngOnInit();
  }
}
