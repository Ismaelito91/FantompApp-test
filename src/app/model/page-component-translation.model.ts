import { Device } from "./enum/device.enum";
import { CountryRegion } from "./enum/country-region.enum";

export default interface PageComponentTranslationModel {
   id: number
   countryRegion?: keyof typeof CountryRegion
   device?: Device
   firstTitle?: string | null;
   secondTitle?: string | null;
   description?: string | null;
   image?: string | null;
}
