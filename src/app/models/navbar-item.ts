export interface NavbarItem {
  icon: string;
  infoTitle: string;
  link?: string;
  action?: (value?: any) => void;
  isDisplayed: boolean;
}