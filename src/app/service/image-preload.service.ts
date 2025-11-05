import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, firstValueFrom } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import PageComponentModel from '../model/page-component.model';
import PageComponentTranslationModel from '../model/page-component-translation.model';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloadService {
  private http = inject(HttpClient);
  private preloadedImages = new Set<string>();
  private staticRessources: string[] = [];

  private async loadStaticRessources(): Promise<string[]> {
    if (this.staticRessources.length > 0) {
      return this.staticRessources;
    }

    try {
      const fileContent = await firstValueFrom(
        this.http.get('assets/static-images.txt', { responseType: 'text' }).pipe(
          map(content => 
            content
              .split('\n')
              .map(line => line.trim())
              .filter(line => line.length > 0 && !line.startsWith('#'))
          ),
          catchError(error => {
            console.warn('Impossible de charger static-images.txt, utilisation de la liste vide:', error);
            return [];
          })
        )
      );
      
      this.staticRessources = fileContent;
      return this.staticRessources;
    } catch (error) {
      console.warn('Erreur lors du chargement de static-images.txt:', error);
      return [];
    }
  }

  private async preloadStaticImages(): Promise<void> {
    const staticRessources = await this.loadStaticRessources();
    
    if (staticRessources.length === 0) {
      return;
    }

    await Promise.allSettled(
      staticRessources.map(imagePath => this.preloadImage(imagePath))
    );
  }

  private async preloadDynamicImages(componentsData: {
    problemsSection: Record<string, PageComponentModel>;
    secureMyselfSection: Record<string, PageComponentModel>;
    homeSection: Record<string, PageComponentModel>;
  }): Promise<void> {
    const imageUrls = new Set<string>();
    
    this.extractImageUrls(componentsData.problemsSection, imageUrls);
    this.extractImageUrls(componentsData.secureMyselfSection, imageUrls);
    this.extractImageUrls(componentsData.homeSection, imageUrls);

    if (imageUrls.size === 0) return;

    await Promise.allSettled(
      Array.from(imageUrls).map(imageUrl => this.preloadImage(imageUrl))
    );
  }

  private async preloadImage(imagePath: string): Promise<void> {
    if (this.preloadedImages.has(imagePath)) return;

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.preloadedImages.add(imagePath);
        resolve();
      };
      
      img.onerror = () => {
        console.error(`Impossible de précharger l'image: ${imagePath}`);
        reject(new Error(`Failed to preload image: ${imagePath}`));
      };
      
      img.src = imagePath;
    });
  }

  private extractImageUrls(
    componentsData: Record<string, PageComponentModel>, 
    imageUrls: Set<string>
  ): void {
    Object.values(componentsData).forEach(component => {
      component.translations?.forEach((translation: PageComponentTranslationModel) => {
        if (translation.image?.trim()) {
          imageUrls.add(translation.image);
        }
      });
    });
  }

  preloadAllImages(componentsData?: {
    problemsSection: Record<string, PageComponentModel>;
    secureMyselfSection: Record<string, PageComponentModel>;
    homeSection: Record<string, PageComponentModel>;
  }): Observable<void> {
    const preloadPromise = this.preloadStaticImages().then(async () => {
      if (componentsData) {
        await this.preloadDynamicImages(componentsData);
      }
    });

    return from(preloadPromise);
  }
} 