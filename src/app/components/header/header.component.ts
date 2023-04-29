import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedLanguage: string = '';
  selectedLanguageText: string = '';

  constructor(
    private translate: TranslateService,
    public articleService: ArticleService
  ) {
    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    }
    this.selectedLanguage = this.translate.currentLang;

    const savedSelectedLanguageText = localStorage.getItem('selectedLanguageText');
    if (savedSelectedLanguageText) {
      this.selectedLanguageText = savedSelectedLanguageText;
    }
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.articleService.setData(lang);
    this.selectedLanguage = lang;

    if (lang === 'ua') {
      this.selectedLanguageText = 'UA';
    } else if (lang === 'en') {
      this.selectedLanguageText = 'EN';
    } else if (lang === 'ru') {
      this.selectedLanguageText = 'RU';
    }

    localStorage.setItem('selectedLanguageText', this.selectedLanguageText);
  }
}
