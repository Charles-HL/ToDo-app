import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class KeepAliveAuthService implements OnDestroy {
  private logSub: Subscription | undefined;
  private isKeepAliveStarted: boolean = false;
  private keepAliveAuthApiPeriodInMinute: number = 20;
  private keepAliveInterval: number | undefined;

  constructor(private apiService: ApiService) {}

  init(isLoggedSubject$: BehaviorSubject<boolean>) {
    this.logSub = isLoggedSubject$.subscribe(
      (isLogged) => (this.updateStatusKeepAlive(isLogged))
    );
  }

  private updateStatusKeepAlive(isLogged : boolean) {
    if (isLogged && !this.isKeepAliveStarted) {
      console.log("Starting the keep alive to keep the auth with the server...");
      this.keepAliveInterval = window.setInterval(() => this.apiService.postKeepAlive().subscribe(), this.keepAliveAuthApiPeriodInMinute*60*1000);
      this.isKeepAliveStarted = true;
    } else if (!isLogged && this.isKeepAliveStarted){
      console.log("Stopping the keep alive to keep the auth with the server.");
      this.stopKeepAlive();
    }
  }

  private stopKeepAlive() {
    this.isKeepAliveStarted = false;
    if (this.keepAliveInterval) {
      window.clearInterval(this.keepAliveInterval);
    }
  }

  ngOnDestroy(): void {
    if (this.logSub) {
      this.stopKeepAlive();
      this.logSub.unsubscribe();
    }
  }
}
