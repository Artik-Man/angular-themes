import {Injectable} from '@angular/core';

const KEY = 'theme';

@Injectable({providedIn: 'root'})
export class ThemeService {

  constructor() {
    this.getTheme();
    document.head.appendChild(this.linkElementThemeType);
  }

  private linkElementTheme = ThemeService.createLinkElement();
  private linkElementThemeType = ThemeService.createLinkElement();

  private static createLinkElement(): HTMLLinkElement {
    const element = document.createElement('link');
    element.rel = 'stylesheet';
    return element;
  }

  public getTheme(): string {
    const theme = localStorage.getItem(KEY);
    this.getCSS(theme);
    if (theme) {
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
    this.getCSS(name);

    if (name) {
      document.body.classList.add(name);
      localStorage.setItem(KEY, name);
    } else {
      localStorage.removeItem(KEY);
    }
  }

  private getCSS(name: string) {
    if (name) {
      this.linkElementTheme.href = name + '.css';
      document.head.appendChild(this.linkElementTheme);
    } else {
      if (this.linkElementTheme.parentNode) {
        document.head.removeChild(this.linkElementTheme);
      }
    }
    if (name && name.includes('dark')) {
      this.linkElementThemeType.href = 'material-dark.css';
    } else {
      this.linkElementThemeType.href = 'material-light.css';
    }
  }
}
