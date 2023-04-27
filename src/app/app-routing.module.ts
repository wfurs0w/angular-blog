import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { SlugComponent } from './pages/slug/slug.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { TariffsComponent } from './pages/tariffs/tariffs.component';


const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'tariffs', component: TariffsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'slug/:articleSlug', component: SlugComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
