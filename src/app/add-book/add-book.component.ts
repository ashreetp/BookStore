import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface Article {
  id: number;
  title: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  title="";
  author="";
  price=0;
  date="";
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() { 
  }

  getVal(title, author, price, date){
    this.title=title;
    this.author=author;
    this.price=price;
    this.date=date;
    let arr = this.date.split('-')
    let newdate="";
    arr.reverse();
    arr.map(d=>{
      newdate+=d;
      newdate+='/'
    })

    newdate=newdate.substring(0, newdate.length - 1);
    console.log(newdate)
    this.httpClient.post("http://localhost:8080/add-book",{
      "book-data":{
          "title": title,
          "author": author,
          "price": price,
          "date": newdate
      },  
    }, {responseType: 'text'}).subscribe(data =>{
      alert(data);
      location.href='/add-book';
    },err=>{
      alert("Failed to add please check again and try");
    })
  }

}
