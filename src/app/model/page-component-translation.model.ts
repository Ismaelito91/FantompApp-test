import { Device } from "./enum/device.enum";
import { Language } from "./enum/language.enum";

export default interface PageComponentTranslationModel {
   id: number
   language?: Language
   device?: Device
   firstTitle?: string | null;
   secondTitle?: string | null;
   description?: string | null;
   image?: string | null;
}
