import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { HttpClientService } from '../../../services/http-client.service';

type LngLat = [number, number];

export interface RouteListItem {
  id: string;
  order?: number;
  color?: string;
  durationText?: string;
  distanceText?: string;
  startAddress?: string;
  endAddress?: string;
  coordinates?: LngLat;
}

type FeaturePoint = {
  type: 'Feature';
  id?: string | number;
  geometry?: { type: 'Point'; coordinates: LngLat };
  properties?: any;
};
type FeatureCollectionPoint = { type: 'FeatureCollection'; features: FeaturePoint[] };

@Injectable({ providedIn: 'root' })
export class RoutesService {
  private readonly BASE = 'assets/data';
  private readonly ROUTES_DIR = `${this.BASE}/routes`;
  private readonly ROUTES_LIST = `${this.BASE}/routes-list.json`;

  constructor(private _http: HttpClientService) {}

  /** Весь список из FeatureCollection */
  findAll(): Observable<RouteListItem[]> {
    return this._http.get<any>(this.ROUTES_LIST).pipe(
      map(this.parseAnyPayload),            // стрелочная функция ниже — контекст сохранится
      catchError(err => {
        console.warn('routes list load failed:', err);
        return of([] as RouteListItem[]);
      }),
      shareReplay(1)
    );
  }

  /** Полный GeoJSON по id */
  getById(routeId: string): Observable<any> {
    return this._http.get<any>(`${this.ROUTES_DIR}/${routeId}.json`).pipe(shareReplay(1));
  }

  // ------- helpers -------

  private toLngLat = (v: any): LngLat | undefined => {
    if (Array.isArray(v) && v.length >= 2) {
      const lon = Number(v[0]), lat = Number(v[1]);
      if (Number.isFinite(lon) && Number.isFinite(lat)) return [lon, lat];
    }
    return undefined;
  };

  /** Поддержка нового формата (FeatureCollection). Всегда возвращает массив. */
  private parseAnyPayload = (payload: any): RouteListItem[] => {
    if (payload && payload.type === 'FeatureCollection' && Array.isArray(payload.features)) {
      const fc = payload as FeatureCollectionPoint;
      return fc.features
        .filter(f => f?.geometry?.type === 'Point' && this.toLngLat(f.geometry?.coordinates))
        .map((f): RouteListItem => {
          const p = f.properties ?? {};
          return {
            id: String(p?.id ?? f.id ?? ''),
            order: typeof p?.order === 'number' ? p.order : undefined,
            color: p?.color,
            durationText: p?.durationText,
            distanceText: p?.distanceText,
            startAddress: p?.start?.addressComponent?.address,
            endAddress:   p?.end?.addressComponent?.address,
            coordinates: this.toLngLat(f.geometry!.coordinates),
          };
        });
    }

    // на всякий случай — если прилетело что-то иное
    return [];
  };
}