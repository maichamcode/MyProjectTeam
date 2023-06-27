import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  users: any = []
  constructor(private userService: UserService) {
    this.userService.getAllUserByRole().subscribe(data => {
      this.users = data
    })
  }
  HandleRemove(id: any) {
    console.log(id);
    const ok = confirm('Bạn muốn xóa user này ?')
    if (ok == true) {
      this.userService.RemoveUser(id).subscribe(data => {
        this.users = this.users.filter((c: any) => c._id !== id)
        toastr.success('Xóa thành công!')
      })
    }
  }
}
