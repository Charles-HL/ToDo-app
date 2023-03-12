import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-app';
  private darkTheme = 'default-theme-dark';
  private lightTheme = 'default-theme-light';

  isDarkTheme = false;


  languages = [
    { name: 'English', code: 'en', flag: 'assets/flags/4x3/gb.svg' },
    { name: 'Français', code: 'fr', flag: 'assets/flags/4x3/fr.svg' },
  ];

  selectedLanguage = this.languages[0].code;

  private subs: Subscription[] = [];
  isLogged = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private translate: TranslateService,
    private cookieService: CookieService
  ) {
    this.subs.push(
      this.authService.isLoggedSubject$.subscribe((isLogged) =>
        this.isLogged = isLogged
      )
    );
    this.translate.addLangs(this.languages.map((lang) => lang.code));

    let langFromCookie =  this.cookieService.get('todo-app-current-lang');

    if (langFromCookie) {
      this.selectedLanguage = langFromCookie;
    }
    this.cookieService.set('todo-app-current-lang', this.selectedLanguage);
    this.translate.setDefaultLang(this.selectedLanguage);
  }

  ngOnInit() {
    this.setTheme();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => (sub ? sub.unsubscribe() : null));
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

  changeLanguage(language: any) {
    this.selectedLanguage = language.code;
    this.translate.use(this.selectedLanguage);
    this.cookieService.set('todo-app-current-lang', this.selectedLanguage);

  }
  

}
