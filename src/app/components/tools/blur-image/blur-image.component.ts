import { afterNextRender, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import * as StackBlur from 'stackblur-canvas';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../design-system/button/button.component";

type Action = 'blur' | 'pixelate';

@Component({
   selector: 'app-blur-image',
   imports: [ButtonBackComponent, MatButtonModule, ButtonComponent, MatIconModule, MatMenuModule],
   templateUrl: './blur-image.component.html',
   styleUrl: './blur-image.component.scss'
})
export class BlurImageComponent {
   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

   // Reactive properties
   brushSize = signal(30);
   blurRadius = signal(5);
   canvasSize = signal({ width: 0, height: 0 });
   private isPainting = false;
   private ctx!: CanvasRenderingContext2D;

   action: Action = 'blur';
   blurPercentages = signal([100, 75, 50, 25]);
   blurPercentage: number | null = null;

   constructor() {
      // Initialize after view renders
      afterNextRender(() => {
         this.initCanvas();
      });

      // Resize observer for responsive canvas
      effect(() => {
         const canvas = this.canvasRef?.nativeElement;
         if (canvas) {
            canvas.width = this.canvasSize().width;
            canvas.height = this.canvasSize().height;
         }
      });
   }

   onClickAction(action: Action) {
      this.action = action;
   }

   onClickBlurPercent(event: MouseEvent, percentage: number) {
      event.stopPropagation();
      this.blurPercentage = percentage;
   }

   private initCanvas() {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      // this.ctx.fillStyle = '#f0f0f0';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   startPainting(event: MouseEvent | Touch) {
      this.isPainting = true;
      this.applyNuclearBlur(event);
   }

   paint(event: MouseEvent | Touch) {
      if (!this.isPainting) return;
      this.applyNuclearBlur(event);
   }

   stopPainting() {
      this.isPainting = false;
   }

   private applyBlurEffect(event: MouseEvent | Touch) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const brushSize = this.brushSize();
      const blurRadius = this.blurRadius();

      // Apply blur using StackBlur
      StackBlur.canvasRGB(
         canvas,
         x - brushSize / 2,
         y - brushSize / 2,
         brushSize,
         brushSize,
         blurRadius
      );
   }

   async applyNuclearBlur(event: MouseEvent | Touch) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const brushSize = this.brushSize();
      const blurRadius = this.blurRadius();

      // 1. Flou gaussien intensif (5 passes)
      for (let i = 0; i < 5; i++) {
         StackBlur.canvasRGB(
            canvas,
            x - brushSize / 2,
            y - brushSize / 2,
            brushSize,
            brushSize,
            blurRadius
         );
         await this.delay(50); // Pause pour éviter le blocage UI
      }

      // 2. Ajout de bruit aléatoire
      // this.addWhiteNoise(canvas.getContext('2d')!, 0.15);

      // 3. Compression destructive
      const finalBlob = await this.canvasToLowQualityBlob(canvas);
      return finalBlob;
   }

   // Bruit numérique aléatoire
   addWhiteNoise(ctx: CanvasRenderingContext2D, intensity: number) {
      const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < imageData.data.length; i++) {
         if (i % 4 !== 3) { // Ignore canal alpha
            const noise = (Math.random() - 0.5) * intensity * 255;
            imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
         }
      }
      ctx.putImageData(imageData, 0, 0);
   }

   // Conversion en qualité très basse
   private async canvasToLowQualityBlob(canvas: HTMLCanvasElement): Promise<Blob> {
      return new Promise((resolve) => {
         canvas.toBlob(
            (blob) => resolve(blob!),
            'image/jpeg',
            0.4 // Qualité à 40%
         );
      });
   }

   delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   downloadImage() {
      const canvas = this.canvasRef.nativeElement;

      // 1. Crée un lien temporaire
      const link = document.createElement('a');

      // 2. Convertit le canvas en URL de données (format PNG par défaut)
      const imageUrl = canvas.toDataURL('image/png');

      // 3. Configure le lien
      link.href = imageUrl;
      link.download = 'image-floutee-' + new Date().getTime() + '.png'; // Nom unique

      // 4. Déclenche le téléchargement
      link.click();

      // 5. Nettoie la mémoire
      URL.revokeObjectURL(imageUrl);
   }

   async handleImageUpload(event: Event) {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (!file) return;

      try {
         // Convert FileReader result to Blob properly
         const arrayBuffer = await new Response(file).arrayBuffer();
         const imgBitmap = await createImageBitmap(new Blob([arrayBuffer]));

         this.canvasSize.set({
            width: imgBitmap.width,
            height: imgBitmap.height
         });

         const canvas = this.canvasRef.nativeElement;
         canvas.width = this.canvasSize().width;
         canvas.height = this.canvasSize().height;

         this.ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);
      } catch (error) {
         console.error('Error loading image:', error);
      }
   }
}
