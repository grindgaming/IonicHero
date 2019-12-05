import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)},
    {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)},
    {path: 'registration', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)},
    { path: 'class-select', loadChildren: () => import('./class-select/class-select.module').then(m => m.ClassSelectPageModule) },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule) },
    { path: 'tutorial', loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialPageModule) }
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

