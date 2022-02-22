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
  PageServiceProxy,
  PageDto
} from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edit-page-dialog.component.html'
})
export class EditPageDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  page = new PageDto();
  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;

  @Output() onSave = new EventEmitter<any>();
  id: string;
  Pages: import("c:/Users/daly/Desktop/medpfe/7.0.1/angular/src/shared/service-proxies/service-proxies").PageDto[];

  constructor(
    injector: Injector,
    public _pageService: PageServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }
  

  ngOnInit(): void {
    this._pageService.get(this.id).subscribe((result) => {
      this.page = result;

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


    this._pageService.update(this.page).subscribe(
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
