import { Injectable } from '@angular/core';

const KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private linkElement = ThemeService.createLinkElement();
  private linkElementIsDark = ThemeService.createLinkElement();

  constructor() {
    this.getTheme();
  }

  public getTheme(): string {
    const theme = localStorage.getItem(KEY);
    if (theme) {
      this.getCSS(theme);
      document.body.classList.add(theme);
    }
    return theme;
  }

  public setTheme(name: string): void {
    const classes = [];
    document.body.classList.forEach(item => {
      if (item.includes('theme')) {
        classes.push(item);
      }
    });
    document.body.classList.remove(...classes);
    if (name) {
      document.body.classList.add(name);
      localStorage.setItem(KEY, name);
      this.getCSS(name);
    } else {
      localStorage.removeItem(KEY);
      if (this.linkElement) {
        this.linkElement.href = '';
      }
    }
  }

  private getCSS(name: string) {
    this.linkElement.href = name + '.css';
    if (name.includes('dark')) {
      this.linkElementIsDark.href = 'material-dark.css';
    } else {
      this.linkElementIsDark.href = '';
    }
  }

  private static createLinkElement(): HTMLLinkElement {
    const element = document.createElement('link');
    element.rel = 'stylesheet';
    document.head.appendChild(element);
    return element;
  }
}
