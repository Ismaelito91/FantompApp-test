import { afterNextRender, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import * as StackBlur from 'stackblur-canvas';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../design-system/button/button.component";

type Action = 'blur' | 'pixelate';

@Component({
   selector: 'app-blur-image',
   imports: [ButtonBackComponent, MatButtonModule, ButtonComponent, MatIconModule, MatMenuModule, MatSliderModule],
   templateUrl: './blur-image.component.html',
   styleUrl: './blur-image.component.scss'
})
export class BlurImageComponent {
   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

   // Reactive properties
   brushSize = signal(50);
   blurRadius = signal(10);
   canvasSize = signal({ width: 0, height: 0 });
   private isPainting = false;
   private ctx!: CanvasRenderingContext2D;
   historyStack: ImageData[] = [];
   redoStack: ImageData[] = [];

   action: Action = 'blur';
   blurPercentages = signal([100, 75, 50, 25]);
   blurPercentage: number | null = null;
   showBrushSizer: boolean = true;

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

   onChangeBrushSize(event: Event) {
      const input = event.target as HTMLInputElement;
      const value = input.value ? +input.value : 50;
      this.brushSize.set(value);
   }

   private saveState() {
      const canvas = this.canvasRef.nativeElement;
      const ctx = this.ctx;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      this.historyStack.push(imageData);
      // Clear redo stack on new action
      this.redoStack = [];
   }

   undo() {
      if (this.historyStack.length > 0) {
         const canvas = this.canvasRef.nativeElement;
         const ctx = this.ctx;

         const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
         this.redoStack.push(currentState); // Save current before undo

         const prevState = this.historyStack.pop()!;
         ctx.putImageData(prevState, 0, 0);
      }
   }

   redo() {
      if (this.redoStack.length > 0) {
         const canvas = this.canvasRef.nativeElement;
         const ctx = this.ctx;

         const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
         this.historyStack.push(currentState); // Save current before redo

         const nextState = this.redoStack.pop()!;
         ctx.putImageData(nextState, 0, 0);
      }
   }

   onClickAction(action: Action) {
      if (this.action === action) {
         this.showBrushSizer = !this.showBrushSizer;
      } else {
         this.showBrushSizer = true;
      }
      this.action = action;
   }

   onClickBlurPercent(event: MouseEvent, percentage: number) {
      event.stopPropagation();
      this.blurPercentage = percentage;
      this.applyGlobalBlur(percentage);
   }

   private initCanvas() {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   startPainting(event: MouseEvent | Touch) {
      this.saveState();
      this.isPainting = true;
      this.applyBlurEffect(event);
   }

   paint(event: MouseEvent | Touch) {
      if (!this.isPainting) return;
      this.applyBlurEffect(event);
   }

   stopPainting() {
      this.isPainting = false;
   }

   private async applyBlurEffect(event: MouseEvent | Touch) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const brushSize = this.brushSize();
      const blurRadius = this.blurRadius();

      if (this.action === 'pixelate') {
         this.pixelateRect(x - brushSize / 2, y - brushSize / 2, brushSize, 20); // ou pixelSize dynamique
      } else {
         StackBlur.canvasRGB(canvas, x - brushSize / 2, y - brushSize / 2, brushSize, brushSize, blurRadius);
      }

      // 2. Compression destructive
      const finalBlob = await this.canvasToLowQualityBlob(canvas);
      return finalBlob;
   }

   pixelateRect(x: number, y: number, size: number, pixelSize: number) {
      const ctx = this.ctx;

      for (let yy = y; yy < y + size; yy += pixelSize) {
         for (let xx = x; xx < x + size; xx += pixelSize) {
            const imageData = ctx.getImageData(xx, yy, pixelSize, pixelSize);
            const data = imageData.data;

            let r = 0, g = 0, b = 0;
            const count = data.length / 4;

            for (let i = 0; i < data.length; i += 4) {
               r += data[i];
               g += data[i + 1];
               b += data[i + 2];
            }

            r = r / count;
            g = g / count;
            b = b / count;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(xx, yy, pixelSize, pixelSize);
         }
      }
   }

   private delay(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, ms));
   }

   // Conversion en qualité très basse
   private async canvasToLowQualityBlob(canvas: HTMLCanvasElement): Promise<Blob> {
      return new Promise((resolve) => {
         canvas.toBlob(
            (blob) => resolve(blob!),
            'image/png',
            0.4 // Qualité à 40%
         );
      });
   }
   private applyGlobalBlur(percentage: number) {
      this.saveState();

      const canvas = this.canvasRef.nativeElement;

      let blurRadius = 0;
      switch (percentage) {
         case 25:
            blurRadius = 25;
            break;
         case 50:
            blurRadius = 35;
            break;
         case 75:
            blurRadius = 65;
            break;
         case 100:
            blurRadius = 80;
            break;
      }

      StackBlur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, blurRadius);
   }


   downloadImage() {
      const canvas = this.canvasRef.nativeElement;

      // 1. Crée un lien temporaire
      const link = document.createElement('a');

      // 2. Convertit le canvas en URL de données (format PNG par défaut)
      const imageUrl = canvas.toDataURL('image/png');

      // 3. Configure le lien
      link.href = imageUrl;
      link.download = 'image-blur-' + new Date().getTime() + '.png'; // Nom unique

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
