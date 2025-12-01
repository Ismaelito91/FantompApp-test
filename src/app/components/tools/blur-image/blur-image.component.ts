import {
   animate,
   keyframes,
   state,
   style,
   transition,
   trigger,
} from "@angular/animations";
import {
   afterNextRender,
   Component,
   effect,
   ElementRef,
   HostListener,
   inject,
   OnDestroy,
   signal,
   ViewChild,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSliderModule } from "@angular/material/slider";
import { TranslatePipe } from "@ngx-translate/core";
import * as StackBlur from "stackblur-canvas";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../design-system/button/button.component";
import { UtilsService } from "../../../service/utils.service";

type Action = "blur" | "pixelate";

export const fadeInWithDelay = trigger("fadeInWithDelay", [
   transition(":enter", [
      style({
         opacity: 0,
      }),
      animate(
         "200ms 800ms ease-out",
         style({
            opacity: 1,
         })
      ),
   ]),
]);

export const moveFromTo = trigger("moveFromTo", [
   state("inactive", style({ transform: "translate(-44px, -10px)" })),
   state("active", style({ transform: "translate(0,0)" })),
   transition("inactive => active", [
      animate(
         "800ms ease-out",
         keyframes([
            style({ transform: "translate(0, 0)", offset: 0.7 }),
            style({ transform: "translate(5px, 3px)", offset: 0.85 }),
            style({ transform: "translate(0, 0)", offset: 1 }),
         ])
      ),
   ]),
]);

@Component({
   selector: "app-blur-image",
   imports: [
      ButtonBackComponent,
      MatButtonModule,
      ButtonComponent,
      MatIconModule,
      MatMenuModule,
      MatSliderModule,
      TranslatePipe,
   ],
   templateUrl: "./blur-image.component.html",
   styleUrl: "./blur-image.component.scss",
   animations: [fadeInWithDelay, moveFromTo],
})
export class BlurImageComponent implements OnDestroy {
   private readonly utilsService = inject(UtilsService);
   @ViewChild("canvas") canvasRef!: ElementRef<HTMLCanvasElement>;
   @ViewChild("closeButton", { read: ElementRef })
   closeButtonRef!: ElementRef<HTMLButtonElement>;

   // Reactive properties
   brushSize = signal(70);
   blurRadius = 10;
   canvasSize = signal({ width: 0, height: 0 });
   private isPainting = false;
   private ctx!: CanvasRenderingContext2D;
   historyStack: ImageData[] = [];
   redoStack: ImageData[] = [];

   action: Action = "blur";
   blurPercentages = signal([100, 75, 50, 25]);
   blurPercentage: number | null = null;
   showBrushSizer: boolean = false;
   showTutorial: boolean = true;
   showControls: boolean = true;
   handAnimationState = "inactive";
   modificationAlertVisible = signal(false);
   private modificationAlertTimeout: ReturnType<typeof setTimeout> | null =
      null;
   private hasModifiedDuringStroke = false;

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

      localStorage.getItem("blur-tutorial") === "true"
         ? (this.showTutorial = false)
         : (this.showTutorial = true);
      this.utilsService.setBackgroundInert(this.showTutorial);
   }

   onFadeInDone() {
      // Déclenche l'animation de la main après la fin du fadeIn
      this.handAnimationState = "active";
      // Met le focus sur le bouton de fermeture
      this.closeButtonRef.nativeElement.focus();
   }

   @HostListener("document:keydown.escape", ["$event"])
   handleEscapeKey(event: KeyboardEvent) {
      if (this.showTutorial) {
         this.onCloseTutorial();
      }
   }

   onCloseTutorial() {
      localStorage.setItem("blur-tutorial", "true");
      this.showTutorial = false;
      this.utilsService.setBackgroundInert(false);
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

         const currentState = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
         );
         this.redoStack.push(currentState); // Save current before undo

         const prevState = this.historyStack.pop()!;
         ctx.putImageData(prevState, 0, 0);
      }
   }

   redo() {
      if (this.redoStack.length > 0) {
         const canvas = this.canvasRef.nativeElement;
         const ctx = this.ctx;

         const currentState = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
         );
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
      this.ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
   }

   startPainting(event: MouseEvent | Touch) {
      this.showControls = false;
      this.hasModifiedDuringStroke = false;
      this.saveState();
      this.isPainting = true;
      this.applyBlurEffect(event);
   }

   paint(event: MouseEvent | Touch) {
      if (!this.isPainting) return;
      this.applyBlurEffect(event);
   }

   stopPainting() {
      this.showControls = true;
      this.isPainting = false;
      if (this.hasModifiedDuringStroke) {
         this.showModificationAlert();
         this.hasModifiedDuringStroke = false;
      }
   }

   private async applyBlurEffect(event: MouseEvent | Touch) {
      const canvas = this.canvasRef.nativeElement;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;
      const brushSize = this.brushSize();
      // const brushSizeX = brushSize * Math.floor(scaleX);
      // const brushSizeY = brushSize * Math.floor(scaleY);

      if (this.action === "pixelate") {
         this.pixelateRect(x - brushSize / 2, y - brushSize / 2, brushSize, 20); // ou pixelSize dynamique
      } else {
         StackBlur.canvasRGB(
            canvas,
            x - brushSize / 2,
            y - brushSize / 2,
            brushSize,
            brushSize,
            this.blurRadius
         );
      }

      this.hasModifiedDuringStroke = true;
      // 2. Compression destructive
      const finalBlob = await this.canvasToLowQualityBlob(canvas);
      return finalBlob;
   }

   private pixelateRect(x: number, y: number, size: number, pixelSize: number) {
      const ctx = this.ctx;

      for (let yy = y; yy < y + size; yy += pixelSize) {
         for (let xx = x; xx < x + size; xx += pixelSize) {
            const imageData = ctx.getImageData(xx, yy, pixelSize, pixelSize);
            const data = imageData.data;

            let r = 0,
               g = 0,
               b = 0;
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

   // Conversion en qualité très basse
   private async canvasToLowQualityBlob(
      canvas: HTMLCanvasElement
   ): Promise<Blob> {
      return new Promise((resolve) => {
         canvas.toBlob(
            (blob) => resolve(blob!),
            "image/png",
            0.9 // Qualité à 90%
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

      StackBlur.canvasRGB(
         canvas,
         0,
         0,
         canvas.width,
         canvas.height,
         blurRadius
      );
      this.showModificationAlert();
   }

   downloadImage() {
      const canvas = this.canvasRef.nativeElement;

      // 1. Crée un lien temporaire
      const link = document.createElement("a");

      // 2. Convertit le canvas en URL de données (format PNG par défaut)
      const imageUrl = canvas.toDataURL("image/png");

      // 3. Configure le lien
      link.href = imageUrl;
      link.download = "image-blur-" + new Date().getTime() + ".png"; // Nom unique

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

         // Dimensions maximales basées sur le viewport (en pourcentages)
         const MAX_WIDTH = Math.floor(window.innerWidth * 0.95); // 95% de la largeur de l'écran (plus large)
         const MAX_HEIGHT = Math.floor(window.innerHeight * 0.8); // 80% de la hauteur de l'écran (plus haut)

         // Calculer le ratio de redimensionnement pour respecter les limites
         const widthRatio = MAX_WIDTH / imgBitmap.width;
         const heightRatio = MAX_HEIGHT / imgBitmap.height;
         
         // Prendre le plus petit ratio pour que l'image tienne dans les deux dimensions
         const scale = Math.min(widthRatio, heightRatio, 1); // Ne jamais agrandir (max 1)

         const finalWidth = Math.floor(imgBitmap.width * scale);
         const finalHeight = Math.floor(imgBitmap.height * scale);

         this.canvasSize.set({
            width: finalWidth,
            height: finalHeight,
         });

         const canvas = this.canvasRef.nativeElement;
         canvas.width = finalWidth;
         canvas.height = finalHeight;
         this.ctx.imageSmoothingEnabled = true;
         this.ctx.imageSmoothingQuality = "high";
         this.ctx.drawImage(imgBitmap, 0, 0, finalWidth, finalHeight);

         // Réinitialiser l'historique pour la nouvelle image
         this.historyStack = [];
         this.redoStack = [];
         this.saveState();

         console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
         console.log(`Image redimensionnée de ${imgBitmap.width}x${imgBitmap.height} à ${finalWidth}x${finalHeight}`);
      } catch (error) {
         console.error("Error loading image:", error);
      }
   }

   private showModificationAlert() {
      this.modificationAlertVisible.set(true);
      if (this.modificationAlertTimeout) {
         clearTimeout(this.modificationAlertTimeout);
      }
      this.modificationAlertTimeout = window.setTimeout(() => {
         this.modificationAlertVisible.set(false);
      }, 4000);
   }

   ngOnDestroy() {
      if (this.modificationAlertTimeout) {
         clearTimeout(this.modificationAlertTimeout);
      }
   }
}
