import type { IconType } from "react-icons";

export type NavigationLink = {
  code: string;
  title: string;
  url: string;
  sublist?: SubNavigationList[];
};

export type SubNavigationList = {
  code: string;
  title: string;
  url: string
}

export type SectionsRebateForex = {
  code: string;
  id: string;
  name: string
}

export type NavSideDashboardItem = {
  key: string;
  label: string;
  path: string;
  icon: IconType;
};

export type NavSideDashboardSection = {
  title: string;
  items: NavSideDashboardItem[];
};