import { Component, OnInit} from '@angular/core';
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
  
  photos: Object[] = [];
  last: boolean = false;
  imageCount: number = 0;
  loading: boolean = false;
  lightBoxShow: Array<boolean> = [];

  
  imageLoaded() {
    this.imageCount++;

    if(this.imageCount === 10) {
      this.loading = false;
      this.last = true;
    }
  }

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
    this.last = false;
    this.imageCount = 0;
    this.loading = true;
    this.photoService.getPhotos(searchForm.value.seachtext)
                     .subscribe(
                       photos => { this.photos = photos.photos.photo},
                       err => console.log(err)
                    )
    searchForm.reset();
  }
  ngOnInit() {

  }

}
