export default interface SettingModel {
   version: string;

   sso: SSOSettingModel;

}


export interface SSOSettingModel {
   issuer: string;
   clientID: string;
}

