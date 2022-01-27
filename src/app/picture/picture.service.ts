import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  ImageOptions,
  Photo,
} from '@capacitor/camera';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { QimgImage } from '../models/qimgImage';

/**
 * Service to take pictures and upload them to the qimg API.
 */
@Injectable({ providedIn: 'root' })
export class PictureService {
  constructor(private http: HttpClient) {}

  /**
   * Takes a picture, uploads it to the qimg API, and returns the created image.
   *
   * Returns an observable that will emit the created QimgObject if the picture
   * has been taken and successfully uploaded to the qimg API. An error may be
   * emitted instead if the user does not take a picture of if the upload fails.
   */
  takeAndUploadPicture(): Observable<QimgImage> {
    // Take a picture.
    // This creates an observable of picture data.
    return this.takePicture().pipe(
      // Once the picture has been taken, transform it as a base64 string representation.
      switchMap((photo) => this.readAsBase64(photo)),
      // With the base64 representation of the image, upload it to the qimg API.
      // This returns a new observable of the resulting QimgImage object.
      switchMap((data) => this.uploadPicture(data)),
      // Once the picture has been uploaded, log a message to the console
      // indicating that all went well.
      // This does not change the observable stream and you can delete this
      // if you don't want to log the URL to the image
      tap((image) =>
        console.log(`Successfully uploaded picture to ${image.url}`)
      )
    );
  }

  /**
   * Launches the camera to take a picture.
   *
   * Returns an observable that will emit the raw picture data as a string
   * once the picture has been taken. An error may be emitted instead if the
   * user does not take a picture.
   */
  private takePicture(): Observable<Photo> {
    // Prepare camera options.
    const options: ImageOptions = {
      quality: 50,
      resultType: CameraResultType.Uri,
      // You could also user Photos (to select from the gallery)
      // or Prompt to let the user decide. Your choice.
      source: CameraSource.Camera,
    };

    // Start taking a picture.
    // The promise will be resolved when the user has snapped and validated the picture.
    // It may be rejected if the user does not take a picture.
    const pictureDataPromise = Camera.getPhoto(options);

    // Convert the promise to an observable and return it.
    return from(pictureDataPromise);
  }

  /**
   * Uploads raw picture data to the qimg API.
   *
   * Returns an observable that will emit the created QimgImage object.
   * An error may be emitted instead if the upload fails.
   */
  private uploadPicture(base64: string | ArrayBuffer): Observable<QimgImage> {
    const requestBody = {
      data: base64,
    };

    const requestOptions = {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${environment.qimgSecret}`,
      },
    };

    return this.http.post<QimgImage>(
      `${environment.qimgUrl}/images`,
      requestBody,
      requestOptions
    );
  }

  private readAsBase64(photo: Photo): Observable<string | ArrayBuffer> {
    // Fetch the photo, read as a blob, then convert to base64 format
    return from(
      fetch(photo.webPath)
        .then((response) => response.blob())
        .then((blob) => this.convertBlobToBase64(blob))
    );
  }

  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }
}