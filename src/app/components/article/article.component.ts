import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article-model';
import { LocalStorageService } from '../../services/local-storage.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articles: Article[] = [];
  showCount = 9;
  isLoading = false;
  isMobileView = false;

  constructor(
    public articleService: ArticleService,
    private localStorageService: LocalStorageService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getChangeArticles();

    this.articleService.data$.subscribe(() => {
      this.getChangeArticles();
    });
  }

  getChangeArticles() {
    const lang = localStorage.getItem('lang');
    if (!lang) return;

    this.articleService.getArticles()
      .pipe(take(1))
      .subscribe((data: Article[]) => {
        this.articles = data.filter((article) => article.LocaleString === lang);
        this.cdRef.detectChanges();
      });

    this.localStorageService.subscribe('lang')
      .pipe(take(1))
      .subscribe((newLang) => {
        this.articleService.getArticles()
          .pipe(take(1))
          .subscribe((data: Article[]) => {
            this.articles = data.filter((article) => article.LocaleString === newLang);
            this.cdRef.detectChanges();
          });
      });
  }

  loadMoreArticles() {
    if (this.isLoading || this.showCount >= this.articles.length) return;

    this.isLoading = true;
    setTimeout(() => {
      this.showCount += 9;
      this.isLoading = false;
    }, 1000);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.isMobileView = window.innerWidth <= 768;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isMobileView && this.isScrolledToBottom()) {
      this.loadMoreArticles();
    }
  }

  isScrolledToBottom(): boolean {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    return windowBottom >= documentHeight;
  }
}
