import { Language, Theme, Tab } from './common';
import { TrajetInfo } from './trajet';
import { VLilleStation } from './transport';

export interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  themeFile: any;
}

export interface SettingsViewProps {
  theme: Theme;
  lang: Language;
  trajets: TrajetInfo[];
  themeFile: any;
  onChangeTheme: (theme: Theme) => void;
  onAddTrajet: () => void;
  onDeleteTrajet: (trajetId: string) => void;
  onUpdateTrajetName: (trajetId: string, newName: string) => void;
  onLangChange: (lang: Language) => void;
}

export interface SearchViewProps {
  lang: Language;
  themeFile: any;
  setBoxType: (datas: any) => void;
  setBoxname: (datas: any) => void;
  setBoxId: (datas: any) => void;
  setBoxCity: (datas: any) => void;
  setBoxDisplay: (datas: any) => void;
}

export interface VLilleViewProps {
  stations: VLilleStation[];
  isLoading: boolean;
  onStartAddToTrajet: (station: VLilleStation) => void;
}

export interface SearchProps {
  allStops: string[];
  onSearch: (stopName: string) => void;
}

export interface CountdownProps {
  targetDate: Date;
  txt: string;
  style2: any;
}
