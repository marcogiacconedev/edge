import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-photo-spotlight',
  imports: [],
  templateUrl: './photo-spotlight.html',
  styleUrl: './photo-spotlight.css'
})
export class PhotoSpotlight implements OnInit {
  @Input() photo!: Photo;
  photoUrl?: string;

  ngOnInit(): void {
    this.photoUrl = `${environment['API_BASE_URL']}/api/photos/${this.photo.id}/file`;
  }
}