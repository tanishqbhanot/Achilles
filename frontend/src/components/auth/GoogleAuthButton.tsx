import { useEffect, useRef } from "react";

type GoogleAuthButtonProps = {
  onCredential: (credential: string) => void;
  onError: (message: string) => void;
};

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleScriptId = "google-identity-services";

export default function GoogleAuthButton({
  onCredential,
  onError,
}: GoogleAuthButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);

  onCredentialRef.current = onCredential;
  onErrorRef.current = onError;

  useEffect(() => {
    if (!googleClientId) {
      onErrorRef.current("Google sign-in is not configured.");
      return;
    }

    const renderButton = () => {
      if (!buttonRef.current || !window.google) {
        return;
      }

      buttonRef.current.replaceChildren();
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          onCredentialRef.current(response.credential);
        },
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: buttonRef.current.clientWidth || 400,
        text: "continue_with",
        shape: "rectangular",
      });
    };

    const existingScript = document.getElementById(
      googleScriptId,
    ) as HTMLScriptElement | null;

    if (window.google) {
      renderButton();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    script.id = googleScriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderButton);

    if (!existingScript) {
      document.head.appendChild(script);
    }

    return () => {
      script.removeEventListener("load", renderButton);
    };
  }, []);

  return <div ref={buttonRef} className="flex min-h-10 justify-center" />;
}
