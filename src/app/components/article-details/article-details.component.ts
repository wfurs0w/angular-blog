import { Component, OnInit } from '@angular/core';
import { ArticleContentService } from 'src/app/services/article-content.service';
import { ArticleService } from '../../services/article.service';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/article-model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
})
export class ArticleDetailsComponent implements OnInit {
  articleContent: string = '';

  constructor(
    private articleContentService: ArticleContentService,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.getStoredArticleContent();

    this.articleService.data$.subscribe(() => {
      const slug = this.articleService.articleSlug;
      this.getFullArticle(slug);
    });
  }

  getFullArticle(slug: string) {
    const lang = localStorage.getItem('lang') || 'en-US';
    this.articleService
      .getArticleBySlug(slug, lang)
      .pipe(take(1))
      .subscribe((article: Article) => {
        const content = article.Content;
        this.articleContentService.setArticleContent(content);
        this.articleContentService.getArticleContent().subscribe((content: string) => {
          this.articleContent = this.parseArticleContent(content);
          this.storeArticleContent();
        });
      });
  }

  parseArticleContent(articleContent: string): string {
    const contentObj = JSON.parse(articleContent);
    let html = '';

    for (const block of contentObj.blocks) {
      if (block.type === 'header') {
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
      } else if (block.type === 'paragraph') {
        html += `<p>${block.data.text}</p>`;
      } else if (block.type === 'image') {
        const imageUrl = block.data.file.url;
        const imageAlt = block.data.file.fileName;
        const imageWidth = '300px';
        const imageHeight = '300px';

        html += `<img src="${imageUrl}" alt="${imageAlt}" width="${imageWidth}" height="${imageHeight}" />`;
      }
    }
    return html;
  }

  storeArticleContent() {
    localStorage.setItem('articleContent', this.articleContent);
  }

  getStoredArticleContent() {
    const storedContent = localStorage.getItem('articleContent');
    if (storedContent) {
      this.articleContent = storedContent;
    }
  }
}

