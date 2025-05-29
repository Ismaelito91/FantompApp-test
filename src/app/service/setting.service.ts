import { Injectable, signal } from "@angular/core";
import SettingModel from "../model/setting.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
   providedIn: "root",
})
export class SettingService {
   settings = signal<SettingModel | null>(null);
   appStatus = signal<"pending" | "initialized" | "failed">("pending");

   constructor(private _http: HttpClient) {}

   getSettings() {
      return this._http.get<SettingModel>("api/config");
   }
}
