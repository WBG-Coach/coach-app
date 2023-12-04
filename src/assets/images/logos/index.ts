import TabletLogoSL from './tablet_logo_sl.png';
import LoginLogoSL from './login_logo_sl.png';
import TabletLogoNP from './tablet_logo_np.png';
import LoginLogoNP from './login_logo_np.png';

import {COUNTRY} from '@env';

export const TabletLogo = COUNTRY === 'np' ? TabletLogoNP : TabletLogoSL;
export const LoginLogo = COUNTRY === 'np' ? LoginLogoNP : LoginLogoSL;

export {default as SessionDefault} from './session_default.png';
