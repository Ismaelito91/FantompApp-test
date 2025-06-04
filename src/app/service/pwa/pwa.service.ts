/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { interval, BehaviorSubject, timer } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { PwaPromptInstallComponent, PwaPromptUpdateComponent } from '../../components/pwa';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  private promptEvent: any;
  appInstalled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  appUpdateAvailable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private swUpdate: SwUpdate,
    private _dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private platform: Platform) {

    if (this.swUpdate.isEnabled) {
      // check toutes les 1 minutes
      interval(1*60*1000).subscribe(() => this.swUpdate.checkForUpdate()
        .then(() => {
          console.log('checking for updates');
        }));
    }

  }

  checkForUpdates() {
    const updatesAvailable = this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })));
    updatesAvailable.subscribe((update) => {
      console.log('update available');
      console.log(update);
      this.appUpdateAvailable$.next(true);
      this.promptUserUpdate();
    });
  }

  promptUserUpdate(): void {
    console.log('updating to new version');
    this.swUpdate.activateUpdate().then(() => {
      const dialogRef = this._dialog.open(PwaPromptUpdateComponent, {
        width: '500px'
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.appUpdateAvailable$.next(false);
          window.location.reload();
        }
      });
    });
  }

  promptUserInstall() {
    this.initPwaPrompt();
  }

  public initPwaPrompt() {
    console.log("platform android : ", this.platform.ANDROID, "platform ios : ", this.platform.IOS);
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        console.log('beforeinstallprompt', event.origin, window.location.origin);
        if (event.origin && event.origin !== window.location.origin) {
          return;
        }
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PwaPromptInstallComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
