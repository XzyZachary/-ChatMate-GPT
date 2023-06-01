export namespace IState {
  export interface State {
    app: AppState
  }
  export interface AppState {
    name?: string
    deviceInfo?: {
      brand: string
      bundleId: string
      deviceName: string
      model: string
      phoneNum: string
      systemName: string
      uniqueId: string
      userAgent: string
      systemVersion: string
    }
    version: {
      version: string
      buildId?: string
      buildNumber?: string
    }
    latestVersion?: {
      version: string
      buildId: string
      features: string
    }
    aboutUs: {
      author?: string
      email?: string
      site?: string
      github?: string
      wechat?: string
      twitter?: string
      discord?: string
      copyright?: string
    }
    errorMessage?: Error[]
  }
}
