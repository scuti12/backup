import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Request } from 'src/app/models/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit 
{
  message: string='';
  rows: Request[] = [];
  constructor(private MainService: MainService) { }
  rqID:any='0';



  ngOnInit(): void 
  {
    this.rebind();
  }
  rebind() 
  {
    this.MainService.getLoadData("Request/reqdata?ProID=1&UserID=-1&prm1=-1&prm2=-1&prm3=''&prm4=''")
    .then((x: Request[]) => {
                            this.rows = x;
                        })
    .catch(e => {
                  console.log(e);
                })
    .finally();
  }
}
