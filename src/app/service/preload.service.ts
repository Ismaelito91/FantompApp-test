import { Injectable, inject, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { catchError, of, forkJoin, tap, map, finalize, Observable } from "rxjs";
import SettingModel from "../model/setting.model";
import PageComponentModel from "../model/page-component.model";
import { PageComponentUtilsService } from "./page-component-utils.service";
import { PageComponentService } from "./page-component.service";
import { SettingService } from "./setting.service";
import { LanguageService } from "./language.service";
import { ImagePreloadService } from "./image-preload.service";

export interface PreloadedData {
  settings: SettingModel | null;
  problemsSection: Record<string, PageComponentModel>;
  secureMyselfSection: Record<string, PageComponentModel>;
  homePageLinkIds: Record<string, number>;
  translations?: { [lang: string]: any };
}

@Injectable({
  providedIn: "root",
})
export class PreloadService {
  private readonly pageComponentUtils = inject(PageComponentUtilsService);
  private readonly pageComponentService = inject(PageComponentService);
  private readonly settingService = inject(SettingService);
  private readonly imagePreloadService = inject(ImagePreloadService);

  // État du préchargement
  private _isPreloading = signal(false);
  private _isPreloaded = signal(false);
  private _preloadError = signal<string | null>(null);
  private _preloadedData = signal<PreloadedData | null>(null);

  // Getters publics
  get isPreloading() { return this._isPreloading.asReadonly(); }
  get isPreloaded() { return this._isPreloaded.asReadonly(); }
  get preloadError() { return this._preloadError.asReadonly(); }
  get preloadedData() { return this._preloadedData.asReadonly(); }

  /**
   * Charge toutes les données nécessaires au démarrage de l'application
   */
  preloadAllData(): void {
    if (this._isPreloading() || this._isPreloaded()) {
      return;
    }

    this._isPreloading.set(true);
    this._preloadError.set(null);

    forkJoin({
      settings: this.settingService.getSettings().pipe(
        catchError(err => {
          console.error("Erreur lors du chargement des paramètres:", err);
          return of(null);
        })
      ),
      problemsSection: this.pageComponentService.getRootPageComponentsBySectionId(1).pipe(
        catchError(err => {
          console.error("Erreur lors du chargement de la section problèmes:", err);
          return of({} as Record<string, PageComponentModel>);
        })
      ),
      secureMyselfSection: this.pageComponentService.getRootPageComponentsBySectionId(2).pipe(
        catchError(err => {
          console.error("Erreur lors du chargement de la section 'Me sécuriser':", err);
          return of({} as Record<string, PageComponentModel>);
        })
      ),
      homePageLinkIds: this.pageComponentService.getHomePageLinkIds().pipe(
        catchError(err => {
          console.error("Erreur lors du chargement des liens de la page d'accueil:", err);
          return of({} as Record<string, number>);
        })
      )
    }).pipe(
      map((data): PreloadedData => ({
        settings: data.settings,
        problemsSection: data.problemsSection || {},
        secureMyselfSection: data.secureMyselfSection || {},
        homePageLinkIds: data.homePageLinkIds || {}
      })),
      tap(preloadedData => {
        // Stocker les données préchargées
        this._preloadedData.set(preloadedData);

        // Mettre à jour les maps de composants
        this.pageComponentUtils.updateComponentMap(preloadedData.problemsSection);
        this.pageComponentUtils.updateComponentMap(preloadedData.secureMyselfSection);
        
        // Précharger toutes les images (statiques et dynamiques)
        this.imagePreloadService.preloadAllImages({
          problemsSection: preloadedData.problemsSection,
          secureMyselfSection: preloadedData.secureMyselfSection
        }).subscribe({
          next: () => {
            console.log("fin du pré-chargement");
            this._isPreloaded.set(true);
          },
          error: (error) => {
            console.error("Erreur lors du préchargement des images:", error);
            console.log("fin du pré-chargement (avec erreurs d'images)");
            this._isPreloaded.set(true);
          }
        });
      }),
      catchError(err => {
        console.error("Erreur lors du pré-chargement:", err);
        this._preloadError.set("Une erreur est survenue lors du pré-chargement des données.");
        return of(null);
      }),
      finalize(() => {
        this._isPreloading.set(false);
      })
    ).subscribe();
  }

} 