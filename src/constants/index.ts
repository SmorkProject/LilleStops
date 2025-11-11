export * from './trajets';
export * from './lines';
export * from './languages';

import whiteTheme from '../../styles/theme/white';
import blackTheme from '../../styles/theme/black';

export const themes = {
  white: { default: whiteTheme },
  black: { default: blackTheme },
};

// Re-export with different names for backward compatibility
export { TRAJET_PRESETS } from './trajets';
export { COLOR_NAMES as colorNames } from './trajets';
export { TRANSLATIONS as translations } from './languages';
export { SUPPORTED_LANGUAGES as langs } from './languages';
export { LANGUAGE_FLAGS as flags } from './languages';
