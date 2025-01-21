import { exposeThemeContext } from "./theme/theme-context";
import { exposeVideoContext } from "./video/video.context";
import { exposeWindowContext } from "./window/window-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeVideoContext();
}
