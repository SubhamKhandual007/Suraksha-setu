// Type declarations for Firebase v11 subpath imports
// Firebase v11 uses package.json "exports" which requires moduleResolution "bundler" or "node16"
// Since CRA uses TS 4.9 with "node" resolution, we declare the modules here.

declare module 'firebase/app' {
  export function initializeApp(config: Record<string, any>): any;
  export function getApps(): any[];
  export function getApp(name?: string): any;
}

declare module 'firebase/auth' {
  export function getAuth(app?: any): any;
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function signInWithRedirect(auth: any, provider: any): Promise<void>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, callback: (user: any) => void): () => void;
  export class GoogleAuthProvider {
    constructor();
    addScope(scope: string): GoogleAuthProvider;
  }
}

declare module 'firebase/analytics' {
  export function getAnalytics(app?: any): any;
  export function logEvent(analytics: any, eventName: string, eventParams?: Record<string, any>): void;
}
