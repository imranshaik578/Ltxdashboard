import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dbdata from 'db.json';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }



  postuser(data:any){
    return this.http.post<any>("http://localhost:3000/productForm/",data);
  }
  public getuser(){
    return this.http.get<any>("http://localhost:3000/productForm/");
}
  putuser(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/productForm/"+ id,data);

  }
  deleteuser(id:number){
    return this.http.delete<any>("http://localhost:3000/productForm/"+id);

  }

  getjsondata():any{
    return this.http.get("http://localhost:3000/productForm/")
  }




 
}
 

