export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Tabs: undefined;
  EssentialCodes: undefined;
  FullCodes: undefined;
  PdfViewer: { codigoId: string; codigoNombre: string }; // nuevo
  Search: { codigoId: string; codigoNombre: string };
  ArticleDetail: { articleId: string };
};

export type TabsParamList = {
  Home: undefined; // antes era "Search"
  Favorites: undefined;
  Profile: undefined;
};