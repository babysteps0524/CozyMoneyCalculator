import type { AttributifyAttributes } from "@unocss/preset-attributify";

declare global {
  namespace astroHTML.JSX {
    interface HTMLAttributes extends AttributifyAttributes {
      leading?: string;
      top?: string;
      "translate-y"?: string;
    }
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT_CALCULATOR?: string;
  readonly PUBLIC_ADSENSE_SLOT_TOOL?: string;
}
