import { Component, Input } from '@angular/core';
import { Photo } from '../../model/model';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-photo-spotlight',
  imports: [],
  templateUrl: './photo-spotlight.html',
  styleUrl: './photo-spotlight.css'
})
export class PhotoSpotlight {
  @Input() photo!: Photo;
  photoUrl?: string = environment['API_BASE_URL'];
}
