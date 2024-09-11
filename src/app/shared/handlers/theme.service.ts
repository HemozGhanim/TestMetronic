import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnInit {
  private lightIcon = 'assets/likecard-logo-light.ico';
  private darkIcon = 'assets/likecard-logo-dark.ico';

  constructor() {}

  ngOnInit(): void {
    this.updateFaviconBasedOnTheme();
    this.watchForThemeChanges();
  }

  private updateFaviconBasedOnTheme(): void {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (!favicon) return;

    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    favicon.href = isDarkMode ? this.lightIcon : this.darkIcon;
  }

  private watchForThemeChanges(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        const newTheme = event.matches ? 'dark' : 'light';
        this.updateFaviconBasedOnTheme();
      });
  }
}
