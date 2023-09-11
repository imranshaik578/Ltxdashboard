import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../api/service.service';
import { UserTableComponent } from '../user-table/user-table.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  names: string[] = ["Sravya", "Shilpa", "Jayanth","Lokesh", "Aashish", "Imran", "Sandeep" ,"Prasanthi" ,"Sneha","Rama","Shaheen","Pradnya"];
  devices: string[] = ["SLC","SLB","EMG 7500","EMG 8500","E214","E218","E228", "EDS3016PR","EDS3016PS","EDS-MD8","EDS-MD16","G527","G528","G526","G526RP", "Spider" ,"X300","X303", "X304","Xportedge" ,"Xpico 240","Xpico 250","Xpico 270", "Bolero43","Bolero45","Fox3","SM24TBT2DPA" ,"SM24TBT2DPB" ,"SISPM1040-582-LRT","SISPM1040-284-LRT", "SISPM1040-384-LRT","SISPM1040-362-LRT", "SM8TAT2SA","SM16TAT2SA","SM24TAT2SA","SISPM1040-3166-L","SM24TAT4XB","SM48TAT4XA-RP","SISPM1040-3166-L3","SISPM1040-3248-L","LSS2200-8P-Eland Board 1"];
  cfl: string[] = ["Picked" ,"Working", "Not yet Done", "No release yet"];
  lpms: string[] = ["Picked" ,"Working", "Not yet Done","No release yet"];
  vms: string[] = ["Picked" ,"Working", "Not yet Done","No release yet"];
  productform! : FormGroup;

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  actionbtn : string = "Save"

  constructor (private formBuilder: FormBuilder, private api : ServiceService,
    @Inject(MAT_DIALOG_DATA) public editdata : any,
     private dialogRef: MatDialogRef<AddUserComponent>, private toast:NgToastService) {}

  ngOnInit(): void{
    this.productform = this.formBuilder.group({
      names : ["",Validators.required ],
      date:["",Validators.required],
      dname: ["",Validators.required],
      prodver : ["",Validators.required],
      tesver: ["",Validators.required],
      cf:["",Validators.required],
      lpm:["",Validators.required],
      vm:["",Validators.required],
      cmt:["",Validators.required]
    });


    if(this.editdata){
      this.actionbtn = 'Update'
      this.productform.controls['names'].setValue(this.editdata.names);
      this.productform.controls['date'].setValue(this.editdata.date);
      this.productform.controls['dname'].setValue(this.editdata.dname);
      this.productform.controls['prodver'].setValue(this.editdata.prodver);
      this.productform.controls['tesver'].setValue(this.editdata.tesver);
      this.productform.controls['cf'].setValue(this.editdata.cf);
      this.productform.controls['lpm'].setValue(this.editdata.lpm);
      this.productform.controls['vm'].setValue(this.editdata.vm);
      this.productform.controls['cmt'].setValue(this.editdata.cmt);
    }

    
   

    
  }
  save(){
    if(!this.editdata){
      if(this.productform.valid){
        this.api.postuser(this.productform.value)
        .subscribe({
          next:async (res:any)=>{
            this.toast.success({detail:"Success Message", summary:"User added Successfully",duration:2000})
            this.productform.reset();
            this.dialogRef.close('save');
            await this.delay(1000);
            window.location.reload();
            
            
            
            
          },
          error:()=>{
            this.toast.error({detail:"Error Message", summary:"Error while adding the user!",duration:2000})
          }
        })
      }
        }else{
          this.updateuser()
        }
    }



    updateuser(){
      this.api.putuser(this.productform.value,this.editdata.id)
      .subscribe({
        next:async (res:any)=>{
          this.toast.success({detail:"Success Message", summary:"User Updated Successfully",duration:7000})
          this.productform.reset()
          this.dialogRef.close('updated');
          await this.delay(1000);
          window.location.reload();
          
        },
        error:()=>{
          this.toast.error({detail:"Error Message", summary:"Error while updating the user!",duration:7000})

        }
      })

     

    }

    close(){
      this.dialogRef.close()
    }
   

   
    


    

    



}
