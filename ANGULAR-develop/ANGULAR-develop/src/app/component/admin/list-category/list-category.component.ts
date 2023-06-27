import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import * as toastr from 'toastr';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent {
  categorys: any = []
  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCat().subscribe(data => {
      this.categorys = data
      console.log(this.categorys);
    })
  }
  HandleRemove(id: any) {
    const ok = confirm("Bạn có muốn xóa danh mục ?")
    if (ok == true) {
      this.categoryService.RemoveCat(id).subscribe(data => {
        this.categorys = this.categorys.filter((c: any) => c._id !== id)
        toastr.success(' Xoa thành công danh mục !')
      })
    }else{
      toastr.error(' Xoa thất bại !')
    }

  }
}
