import { Component, Injector } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { PageDto, PageDtoPagedResultDto, PageServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreatePageDialogComponent } from './create-page/create-page-dialog.component';
import { EditPageDialogComponent } from './edit-page/edit-page-dialog.component';
class PagedPagesRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  animations: [appModuleAnimation()],
  styles: [
  ]
})
export class PagesComponent extends PagedListingComponentBase<PageDto> {
  pages: PageDto[] = [];
  keyword = '';
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _pageService: PageServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createPage(): void {
    this.showCreateOrEditPageDialog();
  }

  editPage(page: PageDto): void {
    this.showCreateOrEditPageDialog(page.id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(
    request: PagedPagesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._pageService
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
      .subscribe((result: PageDtoPagedResultDto) => {
        this.pages = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(page: PageDto): void {
    abp.message.confirm(
      this.l('PageDeleteWarningMessage', page.code),
      undefined,
      (result: boolean) => {
        if (result) {
          this._pageService.delete(page.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  

  private showCreateOrEditPageDialog(id?: string): void {
    let createOrEditPageDialog: BsModalRef;
    if (!id) {
      createOrEditPageDialog = this._modalService.show(
        CreatePageDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditPageDialog = this._modalService.show(
        EditPageDialogComponent,
        {
          class: 'modal-lg',
           initialState: {
             id: id,
          },
        }
      );
    }
    
      

    createOrEditPageDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}

