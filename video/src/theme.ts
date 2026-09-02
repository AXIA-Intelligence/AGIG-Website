import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Load only the weights the brand permits, latin subset only.
const fraunces = loadFraunces("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const inter = loadInter("normal", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const FRAUNCES = fraunces.fontFamily;
export const INTER = inter.fontFamily;

// Brand constants — do not deviate.
export const COLORS = {
  navy: "#0B1520", // primary background
  navyPanel: "#0F1E2E", // secondary panels
  copper: "#C08A5E", // accent
  body: "#B8B0A3", // body text
  white: "#FFFFFF", // highlighted text
};

// Hairline rules: 0.5px, copper at 40% opacity.
export const HAIRLINE_COLOR = "rgba(192, 138, 94, 0.40)";
export const COPPER_STROKE = "rgba(192, 138, 94, 0.85)";
export const COPPER_FAINT = "rgba(192, 138, 94, 0.30)";
