export default interface SettingModel {
   version: string;
   urlApp: string;
   sso: SSOSettingModel;

}


export interface SSOSettingModel {
   issuer: string;
   clientID: string;
}

