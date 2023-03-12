import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Renderer2,
} from '@angular/core';
import { OnInit } from '@angular/core';

interface Language {
  code: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'todo-app';
  private darkTheme = 'default-theme-dark';
  private lightTheme = 'default-theme-light';

  isDarkTheme = false;


  selectedLanguage: Language = { code: 'en', label: 'English', icon: 'us' };
  languages: Language[] = [
    { code: 'en', label: 'English', icon: 'us' },
    { code: 'fr', label: 'Français', icon: 'fr' },
    { code: 'es', label: 'Español', icon: 'es' },
    { code: 'de', label: 'Deutsch', icon: 'de' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setTheme();
  }

  private setTheme() {
    this.renderer.removeClass(this.document.body, this.isDarkTheme ? this.lightTheme : this.darkTheme);
    this.renderer.addClass(this.document.body, this.isDarkTheme ? this.darkTheme : this.lightTheme);
    this.cdr.detectChanges();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

  changeLanguage() {
    // Implement the logic to change the language here
  }
  

}
