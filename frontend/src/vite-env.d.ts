/// <reference types="vite/client" />

declare namespace google.accounts.id {
  type CredentialResponse = {
    credential: string;
  };

  type Configuration = {
    client_id: string;
    callback: (response: CredentialResponse) => void;
  };

  type ButtonConfiguration = {
    theme?: "outline" | "filled_blue" | "filled_black";
    size?: "small" | "medium" | "large";
    width?: number;
    text?: "signin_with" | "signup_with" | "continue_with";
    shape?: "rectangular" | "pill" | "circle" | "square";
  };

  function initialize(configuration: Configuration): void;
  function renderButton(
    parent: HTMLElement,
    configuration: ButtonConfiguration,
  ): void;
}

declare interface Window {
  google?: {
    accounts: {
      id: typeof google.accounts.id;
    };
  };
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
