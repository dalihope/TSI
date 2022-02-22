import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  DelegationServiceProxy,
  DelegationDto,
  RoleDto,
  PageDto,
  PageServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { HttpClient, HttpClientModule, HttpHeaders,HttpClientJsonpModule, HttpResponse } from '@angular/common/http';
import { resolve } from 'path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-create-delegation-dialog',
  templateUrl: './create-delegation-dialog.component.html',
  styles: [
  ]
})

export class CreateDelegationDialogComponent extends AppComponentBase
implements OnInit {
saving = false;
delegation = new DelegationDto();
roles: RoleDto[] = [];
checkedRolesMap: { [key: string]: boolean } = {};
defaultRoleCheckedStatus = false;
Pages: {};


@Output() onSave = new EventEmitter<any>();

constructor(
  injector: Injector,
  public _delegationService: DelegationServiceProxy,
  public _pageService : PageServiceProxy,
  public bsModalRef: BsModalRef,
  private http:HttpClient
) {
  super(injector);
  this.GetPageList();
}
title = 'bind-dropdownlist';
  Page = "";
  onSubmit() {
    alert(' PageID: ' + this.Page);
  } 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    })
  };
  getAllPages(): Observable<PageDto[]> {
    return this.http.get<PageDto[]>('https://localhost:44311/api/services/app/Page/GetAll');
  }
  
  
  GetPageList(){
    // this.getAllPages().subscribe(
    //   (res: any[])=> {
    //   let keys = res.keys
    //   this.Pages = this.GetPageList;
    //   console.log('Pages', this.Pages);
    //   console.log('keys:', keys);
   
    //   },


    //     err => {
    //       console.log("Error", err)
    //     }
    //   ); 
    this._pageService.getAll("Libelle", 0,100 ).subscribe(data =>
      {this.Pages= data.items;
        console.log('Pages', this.Pages);
        
     
        },
  
  
          err => {
            console.log("Error", err)
          }
    );
  }

  

ngOnInit(): void {

  // this._pageService.getAll().subscribe((result) => {
  //   this. = result.items;
  //   this.setInitialRolesStatus();
  // });
}


setInitialRolesStatus(): void {
  _map(this.roles, (item) => {
    this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
      item.normalizedName
    );
  });
}

isRoleChecked(normalizedName: string): boolean {
  // just return default role checked status
  // it's better to use a setting
  return this.defaultRoleCheckedStatus;
}

onRoleChange(role: RoleDto, $event) {
  this.checkedRolesMap[role.normalizedName] = $event.target.checked;
}

getCheckedRoles(): string[] {
  const roles: string[] = [];
  _forEach(this.checkedRolesMap, function (value, key) {
    if (value) {
      roles.push(key);
    }
  });
  return roles;
}

save(): void {
  this.saving = true;



  this._delegationService.create(this.delegation).subscribe(
    () => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    },
    () => {
      this.saving = false;
    }
  );
}
}
