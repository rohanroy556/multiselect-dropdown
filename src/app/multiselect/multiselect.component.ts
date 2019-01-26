import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  public unSelectedItems: string[] = ['Jobsite 1', 'Jobsite 2',
  'Jobsite 3', 'Jobsite 4', 'Jobsite 5'];
  public selectedItems: string[] = ['Jobsite 6'];
  private searchBox;
  private placeholder: Element;
  private textInBox: string;
  private searchItems: string[] = [];

  constructor() { }

  ngOnInit() {
    this.searchBox = document.getElementById("search-box");
    this.placeholder = document.getElementsByClassName("placeholder")[0];
    this.textInBox = "";
    this.searchItems = this.unSelectedItems;
    this.getFocus();
    this.searchBox.addEventListener('keypress', e => {
      var key = e.which || e.keyCode;
      if (key === 13) {
        if(this.searchItems.length > 0 && this.searchItems[0] !== 'Not Found'){
          this.addSelected(this.searchItems[0]);
          this.textInBox = "";
        }
        e.preventDefault();
      }
    });
  }
  getFocus(): void{ 
    if(this.textInBox.length > 0 || this.selectedItems.length > 0)
      this.placeholder.className += " focus";
    else
      this.placeholder.className = "placeholder";
  } 
  makeFocus(): void{
    this.searchBox.focus(); 
  }
  addSelected(item: string): void{
    this.unSelectedItems = this.unSelectedItems.filter(i => i !== item);
    this.selectedItems.push(item);
    this.textInBox = "";
    this.searchItems = this.unSelectedItems;
  }
  removeSelected(item: string): void{
    this.unSelectedItems.push(item);
    this.selectedItems = this.selectedItems.filter(i => i !== item);
    this.unSelectedItems = this.unSelectedItems.sort();
  }
  search(event): void{
    if(this.textInBox.length == 0)
      this.searchItems = this.unSelectedItems;
    else {
      this.searchItems = this.unSelectedItems.
        filter(i => i.toLowerCase().search(this.textInBox.toLowerCase()) != -1);
      if(this.searchItems.length == 0)
        this.searchItems.push("Not Found");
    }
  }
}
