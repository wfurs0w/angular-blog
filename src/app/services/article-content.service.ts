import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleContentService {
  private articleContent = new BehaviorSubject<string>('');

  setArticleContent(content: string) {
    this.articleContent.next(content);
  }

  getArticleContent() {
    return this.articleContent.asObservable();
  }
}