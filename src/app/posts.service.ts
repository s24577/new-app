import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string){
    const postData: Post = {title: title, content: content};
    this.http
      .post<{ name: string }>('https://first-project-c5fcf-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe(responseData =>{console.log(responseData)});
  }

  fetchPosts(){
    return this.http.get<{[key: string]: Post}>('https://first-project-c5fcf-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData  => {
          const postsArray: Post[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        })
      )
  }

  deletePosts(){
    return this.http.delete('https://first-project-c5fcf-default-rtdb.europe-west1.firebasedatabase.app/posts.json');
  }
}
