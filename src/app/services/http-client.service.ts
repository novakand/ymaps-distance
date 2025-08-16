import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IRequestOptions } from '../interfaces/request-options.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private _http: HttpClient
  ) { }

  public get<T>(url: string, options?: IRequestOptions | null): Observable<T> {
    options = options || {};
    options.withCredentials = false;
    return this._http.get<T>(url, options);
  }


  public getBlob(url: string): Observable<Blob> {
    const headers = new HttpHeaders();
    return this._http.get(url, {
      responseType: 'blob',
      withCredentials: true
    });
  }

  public find<T>(url: string,options?: IRequestOptions): Observable<T> {
    return this.get<T>(url, options);
  }

  public post<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
    options = this._getDefaultOptions(options);

    return this._http.post<T>(url, body, options);
  }

  public put<T>(url: string, body: any, options?: IRequestOptions): Observable<T> {
    options = this._getDefaultOptions(options);

    return this._http.put<T>(url, JSON.stringify(body), options);
  }

  public delete(url: string, options?: IRequestOptions): Observable<any> {
    options = this._getDefaultOptions(options);
    return this._http.delete(url, options);
  }

  public upload<T>(url: string, formData: FormData): Observable<T> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this._http.post<T>(url, formData, {
      responseType: 'json',
      headers,
    });
  }

  public uploadImage(url, formData: FormData): Observable<any> {
    return this._http.post<FormData>(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public loadImageObjectUrl(url): Observable<string> {
    return this._http.get(url, { responseType: 'blob', withCredentials: true  }).pipe(
      map(blob => URL.createObjectURL(blob))
    );
  }

  private _getDefaultOptions(options?: IRequestOptions): IRequestOptions {
    options = options || {};
    options.headers = options.headers || new HttpHeaders({ 'Content-Type': 'application/json' });
    options.withCredentials = true;
    return options;
  }

}
