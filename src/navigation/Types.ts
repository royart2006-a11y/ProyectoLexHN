// src/navigation/types.ts

export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  ArticleDetail: { articleId: string };
};

export type TabsParamList = {
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};