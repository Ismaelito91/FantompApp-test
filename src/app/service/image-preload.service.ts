import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import PageComponentModel from '../model/page-component.model';
import PageComponentTranslationModel from '../model/page-component-translation.model';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloadService {
  private preloadedImages = new Set<string>();

  private readonly staticRessources = [
    'assets/images/anonym-img.svg',
    'assets/images/blur-image-tool-bg.jpg'
    // à compléter avec tous les assets statiques à la fin du projet
  ];

  private async preloadStaticImages(): Promise<void> {
    await Promise.allSettled(
      this.staticRessources.map(imagePath => this.preloadImage(imagePath))
    );
  }

  private async preloadDynamicImages(componentsData: {
    problemsSection: Record<string, PageComponentModel>;
    secureMyselfSection: Record<string, PageComponentModel>;
  }): Promise<void> {
    const imageUrls = new Set<string>();
    
    this.extractImageUrls(componentsData.problemsSection, imageUrls);
    this.extractImageUrls(componentsData.secureMyselfSection, imageUrls);

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
  }): Observable<void> {
    const preloadPromise = this.preloadStaticImages().then(async () => {
      if (componentsData) {
        await this.preloadDynamicImages(componentsData);
      }
    });

    return from(preloadPromise);
  }
} 