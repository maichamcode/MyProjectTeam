import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent {
  category: ICategory= {
    name: "",
    
  }
  constructor(private categoryService: CategoryService, private route:Router, private param:ActivatedRoute) {
    this.param.paramMap.subscribe(data=>{
      const id = String(data.get('id'))
      this.categoryService.getOneCat(id).subscribe((data:any)=>{
        this.category=data
      })
    })

  }
  HandleEdit() {
    this.categoryService.updateCategory(this.category).subscribe(category => {
      console.log(category);
      this.route.navigate(['/admin/category'])
      toastr.success('Thêm thành công danh mục !!')
    })
  }
}
