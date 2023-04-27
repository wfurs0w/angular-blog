import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../models/article-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://panel.7-price.com/ru/Blog/GetAllArticles';
  private data = new BehaviorSubject<string>('initial value');
  data$ = this.data.asObservable();
  public articleSlug: string = '';

  setData(data: string) {
    this.data.next(data);
  }

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticleBySlug(slug: string, lang: string): Observable<Article> {
    const headers = {
      'accept-language': lang
    };
    const apiUrl = `https://panel.7-price.com/Blog/GetBySlug?slug=${slug}`;
    return this.http.get<Article>(apiUrl, { headers });
  }
}
