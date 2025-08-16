export interface IEnvironment {
  production: boolean;
  ssoUri: string;
  apiUri: string;
  debounceTime: number;
  iconsUri?: string;
  accessTokenMapBox?: string;
  apiUriMapbox?: string;
  apiUriGoogle?: string;
  apiKeyGoogle?: string;
  storageUri?: string;
  baseURL?:string;
}
