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
