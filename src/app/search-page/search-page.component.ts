import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-search-page',
  providers: [PhotoService],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(private photoService: PhotoService) { }
  
  photos = [];

  picUrl(farmId, server, pictureId, secret): string {
    let url =  "https://farm"+ 
                   farmId +
                   ".staticflickr.com/"+
                   server+ "/"+
                   pictureId+"_"+
                   secret+".jpg";
    
    return url; 
  }

  onSubmit(searchForm: NgForm) {
    console.log(searchForm.value.seachtext);
    this.photoService.getPhotos(searchForm.value.seachtext)
                     .subscribe(
                       photos => { this.photos = photos.photos.photo},
                       err => console.log(err),
                       () => console.log('done getting photos')
                    )
  }
  ngOnInit() {
  }

}
