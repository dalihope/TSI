import { Component, Injector} from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DelegationDto, DelegationDtoPagedResultDto, DelegationServiceProxy, PageDto, PageServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateDelegationDialogComponent } from './create-delegation/create-delegation-dialog.component';
import { EditDelegationDialogComponent } from './edit-delegation/edit-delegation-dialog.component';
class PagedDelegationsRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-delegations',
  templateUrl: './delegations.component.html',
  animations: [appModuleAnimation()],
  styles: [
  ]
})
export class DelegationsComponent extends PagedListingComponentBase<DelegationDto> {
  delegations: DelegationDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;
  Page: PageDto;
  pagesLibelle: []= [];

  constructor(
    injector: Injector,
    private _delegationService: DelegationServiceProxy,
    private _pageService: PageServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
    
  }
  GetPagesLibelle() {

    this.delegations.forEach(
      d => {
        this.GetPage(d.pageId, d.id);
        
      });
  }
  GetPage(pageId:string, delegationId:string){
 
    this._pageService.get(pageId).subscribe((data) => {
      this.pagesLibelle[delegationId] = data.libelle;
     
        },
  
  
          err => {
            console.log("Error", err)
          }
    );
  }


  createDelegation(): void {
    this.showCreateOrEditDelegationDialog();
    
  }

  editDelegation(delegation: DelegationDto): void {
    this.showCreateOrEditDelegationDialog(delegation.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedDelegationsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._delegationService
      .getAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: DelegationDtoPagedResultDto) => {
        this.delegations = result.items;
        this.showPaging(result, pageNumber);
        this.GetPagesLibelle();
      });
      
      
  }

  protected delete(delegation: DelegationDto): void {
    abp.message.confirm(
      this.l('DelegationDeleteWarningMessage', delegation.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._delegationService.delete(delegation.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
  private showCreateOrEditDelegationDialog(id?: string): void {
    let createOrEditDelegationDialog: BsModalRef;
    if (!id) {
      createOrEditDelegationDialog = this._modalService.show(
        CreateDelegationDialogComponent,
        {
          class: 'modal-lg',
        }
      );
     } else {
      createOrEditDelegationDialog = this._modalService.show(
        EditDelegationDialogComponent,
         {
      class: 'modal-lg',
           initialState: {
            id: id,
             
           },
         }
      );
  }
  
  

    
  
  createOrEditDelegationDialog.content.onSave.subscribe(() => {
    this.refresh();
  
  });
  
}
// ngOnInit(): void {
//   this.list;

//   // this._pageService.getAll().subscribe((result) => {
//   //   this. = result.items;
//   //   this.setInitialRolesStatus();
//   // });
// }
 }



