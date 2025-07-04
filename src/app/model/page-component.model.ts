import { ComponentStatus } from "./enum/component-status.enum";
import { ComponentType } from "./enum/component-type.enum";
import PageComponentTranslationModel from "./page-component-translation.model";

export default interface PageComponentModel {
   id?: number;
   type?: ComponentType;
   code?: string | null;
   status?: ComponentStatus;
   position?: number;
   next?: PageComponentModel;
   parent?: PageComponentModel;
   children: PageComponentModel[];
   translations: PageComponentTranslationModel[];
}
