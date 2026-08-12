import { Component, Input } from '@angular/core';
import { Photo } from '../../model/model';
import dotenv from 'dotenv';

dotenv.config();

@Component({
  selector: 'app-photo-spotlight',
  imports: [],
  templateUrl: './photo-spotlight.html',
  styleUrl: './photo-spotlight.css'
})
export class PhotoSpotlight {
  @Input() photo!: Photo;
  photoUrl?: string = process.env['API_BASE_URL'];
}
