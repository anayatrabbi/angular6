import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistraionComponent } from "../auth/registraion.component";
import { AppPaginationComponent } from './component/app-pagination/app-pagination.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AppPaginationComponent],
  exports: [CommonModule , AppPaginationComponent],
})
export class SharedModule {}
