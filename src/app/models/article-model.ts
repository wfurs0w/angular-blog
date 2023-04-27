export interface Article {
  Id: number;
  ParentId: number;
  Title: string;
  Description: string;
  Content: string;
  Slug: string;
  Keywords: string;
  Locale: number;
  LocaleString: string;
  MainImgUri: string;
  MainImage: string;
  SimilarArticles: any;
  ViewCounter: number;
  CreatedOn: string;
  UpdatedOn: string;
}