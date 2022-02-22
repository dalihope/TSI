import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  DelegationServiceProxy,
  DelegationDto,
  RoleDto,
  PageServiceProxy
} from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edit-delegation-dialog.component.html'
})
export class EditDelegationDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  delegation = new DelegationDto();
  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;

  @Output() onSave = new EventEmitter<any>();
  id: string;
  Pages: import("c:/Users/daly/Desktop/medpfe/7.0.1/angular/src/shared/service-proxies/service-proxies").PageDto[];

  constructor(
    injector: Injector,
    public _delegationService: DelegationServiceProxy,
    public bsModalRef: BsModalRef,
    public _pageService : PageServiceProxy
  ) {
    super(injector);
    this.GetPageList();
  }
  title = 'bind-dropdownlist';
  Page = "";
  onSubmit() {
    alert(' PageID: ' + this.Page);
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
    this._delegationService.get(this.id).subscribe((result) => {
      this.delegation = result;

    //   this._delegationService.getRoles().subscribe((result2) => {
    //     this.roles = result2.items;
    //     this.setInitialRolesStatus();
    //   });
    });
  }

  setInitialRolesStatus(): void {
    _map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    // return _includes(this.delegation.roleNames, normalizedName);
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


    this._delegationService.update(this.delegation).subscribe(
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
