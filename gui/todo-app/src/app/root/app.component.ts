/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Subscription, delay } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-app';
  private darkTheme = 'default-theme-dark';
  private lightTheme = 'default-theme-light';

  isDarkTheme: boolean = false;


  languages = [
    { name: 'English', code: 'en', flag: 'assets/flags/4x3/gb.svg' },
    { name: 'Français', code: 'fr', flag: 'assets/flags/4x3/fr.svg' },
  ];

  selectedLanguage = this.languages[0].code;

  private subs: Subscription[] = [];
  isLogged = false;
  loading: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private translate: TranslateService,
    private _loading: LoadingService
  ) {
    let isDarkThemeFromCookie =  localStorage.getItem('todo-app-is-dark');

    if (isDarkThemeFromCookie) {
      this.isDarkTheme = JSON.parse(isDarkThemeFromCookie);
    }
    localStorage.setItem('todo-app-is-dark', JSON.stringify(this.isDarkTheme))


    this.subs.push(
      this.authService.isLoggedSubject$.subscribe((isLogged) =>
        this.isLogged = isLogged
      )
    );
    this.translate.addLangs(this.languages.map((lang) => lang.code));

    let langFromCookie =  localStorage.getItem('todo-app-current-lang');

    if (langFromCookie) {
      this.selectedLanguage = langFromCookie;
    }
    localStorage.setItem('todo-app-current-lang', this.selectedLanguage);
    this.translate.setDefaultLang(this.selectedLanguage);
  }

  ngOnInit() {
    this.setTheme();
    this.listenToLoading();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => (sub ? sub.unsubscribe() : null));
  }

  private setTheme() {
    this.renderer.removeClass(this.document.body, this.isDarkTheme ? this.lightTheme : this.darkTheme);
    this.renderer.addClass(this.document.body, this.isDarkTheme ? this.darkTheme : this.lightTheme);
    this.cdr.detectChanges();
    localStorage.setItem('todo-app-is-dark', JSON.stringify(this.isDarkTheme));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

  changeLanguage(language: any) {
    this.selectedLanguage = language.code;
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('todo-app-current-lang', this.selectedLanguage);

  }
  
  logout(){
    this.authService.logout();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this.subs.push(this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      }));
  }
}
