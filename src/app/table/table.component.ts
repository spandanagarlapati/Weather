import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from 'src/services/table.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'city', 'averageRainfall', 'averageTemperature', 'year'];
  data: any = [];
  dataSource= new MatTableDataSource(this.data);
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private tableService: TableService){

  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.tableService.getTableData().subscribe(data => {
      this.dataSource = data;
  })
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
