import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) {
  }

  private chartUrl = 'https://38e294c9-f70a-4f31-a771-f90667e8e320.mock.pstmn.io/data';

  getTableData(){
    return this.httpClient.get<any>(this.chartUrl);      
  }
}
