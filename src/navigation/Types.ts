export type RootStackParamList = {
  Login: undefined;               // Login no recibe parámetros
  Register: undefined;
  Tabs: undefined;
  ArticleDetail: { articleId: string }; // ArticleDetail SÍ necesita saber qué artículo mostrar
};

export type TabsParamList = {
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};