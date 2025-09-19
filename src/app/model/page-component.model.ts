import { ComponentStatus } from "./enum/component-status.enum";
import { ComponentType } from "./enum/component-type.enum";
import PageComponentTranslationModel from "./page-component-translation.model";
import {SocialMedias} from "./enum/socialMedias.enum";

export default interface PageComponentModel {
   id?: number;
   type?: ComponentType;
   code?: string | null;
   status?: ComponentStatus;
   position?: number;
   nextId?: number;
   next?: PageComponentModel;
   parentId?: number;
   childrenIdList?: number[];
   children?: PageComponentModel[];
   translations: PageComponentTranslationModel[];
   socialMedia?: SocialMedias;

   showPasswordCheckBtn?: boolean;
}
