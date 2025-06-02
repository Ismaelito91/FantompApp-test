import PageComponentTranslationModel from "./page-component-translation.model";

export default interface PageComponentModel {
   id: number;
   type?: string | null;
   code?: string | null;
   next?: PageComponentModel,
   translations: PageComponentTranslationModel[]
}
