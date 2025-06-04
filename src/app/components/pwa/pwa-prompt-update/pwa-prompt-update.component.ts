/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  standalone: true,
  imports: [
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-pwa-prompt-update',
  templateUrl: './pwa-prompt-update.component.html',
  styleUrls: ['./pwa-prompt-update.component.scss']
})
export class PwaPromptUpdateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
