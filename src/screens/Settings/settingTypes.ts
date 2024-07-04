export type TabDesc = {
  id: string;
  label: string;
  component: React.FC<object>;
};

export type SettingDesc = {
  key: string;
  component: React.FC<object>;
};

export type SettingSection = {
  title: string;
  comingSoon?: boolean;
  data: SettingDesc[];
  footer?: string;
};
