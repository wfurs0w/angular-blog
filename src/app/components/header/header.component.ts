import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedLanguage!: string;

  constructor(
    private translate: TranslateService,
    public articleService: ArticleService
  ) {
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }
    this.selectedLanguage = this.translate.currentLang;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.articleService.setData(lang);
    this.selectedLanguage = lang;
  }
}
