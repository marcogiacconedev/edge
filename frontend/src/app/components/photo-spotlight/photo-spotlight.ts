import { Component, Input } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';

@Component({
  selector: 'app-photo-spotlight',
  imports: [],
  templateUrl: './photo-spotlight.html',
  styleUrl: './photo-spotlight.css'
})
export class PhotoSpotlight {

  @Input() photo!: Photo;

  constructor(
    private supabase: Supabase
  ) {}

  getPhotoImageUrl(coverImageFilePath: string): string {
    let coverImageUrl: string = '';
    coverImageUrl = this.supabase.getImagePublicUrl(coverImageFilePath);

    return coverImageUrl;
  }
}
