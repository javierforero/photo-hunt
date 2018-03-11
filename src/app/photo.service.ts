import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { API_KEY } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) { }

  getPhotos(text: string): Observable<any> {

    const searchText = text.split(' ').join('+');
    const url = "https://api.flickr.com/services/rest/?"+
     "method=flickr.photos.search"+
     `&text=${searchText}`+
     "&content_type=1" +
     "&safe_search=1" +
     "&format=json" +
     "&nojsoncallback=1" +
     `&api_key=${API_KEY}`;
    
    if(text.trim()) {
      return this.http.get(url);
    } else {
      return of([]);
    }
  }

}
