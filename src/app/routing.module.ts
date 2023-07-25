import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BikeRentalComponent } from "./bike-rental/bike-rental.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { SuccessComponent } from "./success/success.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./authentication/auth/auth.guard";
import { AuthComponent } from "./authentication/auth/auth.component";


const routes: Routes = [
    {
      path: '',
      redirectTo: 'ballinastoe',
      pathMatch: 'full',
    },
    {
      path: 'ballinastoe',
      component: BikeRentalComponent,
      data: { town: 'ballinastoe' },
    },
    {
      path: 'ticknock',
      component: BikeRentalComponent,
      data: { town: 'ticknock' },
    },
    {
      path: 'cart',
      canActivate:[AuthGuard],
      component: ConfirmationComponent,
    },
    {
      path: 'success',
      component: SuccessComponent,
    },
    {
      path: 'not-found',
      component: NotFoundComponent,
    },
    {
      path:'auth',
      component:AuthComponent
    },
    {
      path: '**',
      redirectTo: 'not-found',
    },
  ];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class RoutingModule{

}