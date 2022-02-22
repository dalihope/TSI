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
import { HttpClientModule } from '@angular/common/http';
import {
  PageServiceProxy,
  PageDto,
  RoleDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
@Component({
  selector: 'app-create-page-dialog',
  templateUrl: './create-page-dialog.component.html',
  styles: [
  ]
})
export class CreatePageDialogComponent extends AppComponentBase
implements OnInit {
saving = false;
page = new PageDto();
roles: RoleDto[] = [];
checkedRolesMap: { [key: string]: boolean } = {};
defaultRoleCheckedStatus = false;


@Output() onSave = new EventEmitter<any>();

constructor(
  injector: Injector,
  public _pageService: PageServiceProxy,
  public bsModalRef: BsModalRef
) {
  super(injector);
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



  this._pageService.create(this.page).subscribe(
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


