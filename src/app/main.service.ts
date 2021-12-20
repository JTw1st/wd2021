import {HostListener, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private readonly _size: Number
  public sizeWindow: Number;
  private url: string = "https://newsapi.org/v2/everything?q=tesla&from=2021-11-20&sortBy=publishedAt&apiKey=c4fdfa04a86e4dcc964e4fa16217e0d4";
  private data: any = []
  public currentNews:any={}
  public dataList: any = []
  public count:number=0

  constructor(private http: HttpClient) {
    this.sizeWindow = window.innerWidth;
    this._size = 765;
  }

  getDataJson() {
    let temp: any[] = [];
    this.http.get(this.url).subscribe((res) => {
      this.data = res
      this.data.articles.map((item: any, index: number) => {
        if (index <15 && index>11) {
          temp.push(item)
        }
      })
      console.log(temp)
      this.dataList = temp
    })

  }

  changeNws(index:number){
    let temp:any=[];
    this.dataList.map((item:any)=>{
      temp.push(item)
    })
    this.dataList=[]
    this.dataList.push(temp[index])
    for (let i = 0; i < 3; i++) {

      if(i!==index){
        this.dataList.push(temp[i])
      }
    }
  }

  get size(): Number {
    return this._size;
  }
}
