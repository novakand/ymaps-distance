import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

type BBox = [number, number, number, number];
type LonLat = [number, number];

export interface CityIndexItem {
    slug: string;
    name: string;
    id:string;
    region?: string;
    label: string;
    center?: LonLat;
    bbox?: BBox;

}

// минимальный тип FeatureCollection
export interface FeatureCollection {
    type: 'FeatureCollection';
    features: any[];
    bbox?: BBox;
}

@Injectable({ providedIn: 'root' })
export class CitiesService {
    private readonly BASE = 'assets/data';
    private readonly INDEX_URL = `${this.BASE}/cities.json`;
    private readonly POLYGONS_DIR = `${this.BASE}/polygons`;

    // кэшируем реестр городов
    private readonly cities$ = this.http.get<CityIndexItem[]>(this.INDEX_URL).pipe(
        map(list => list.map(c => ({ ...c, slug: c.label } as CityIndexItem))),
        shareReplay({ bufferSize: 1, refCount: true })
    );



    // кэш полигонов по slug
    private readonly polyCache = new Map<string, Observable<FeatureCollection>>();

    constructor(private http: HttpClient) { }

    /** Список всех городов (как в cities.json). */
    findAll(): Observable<CityIndexItem[]> {
        return this.cities$;
    }

    /** Найти город по slug. */
    getBySlug(slug: string): Observable<CityIndexItem | undefined> {
        return this.cities$.pipe(map(list => list.find(c => c.slug === slug)));
    }

    /** Поиск по названию/региону. */
    search(query: string): Observable<CityIndexItem[]> {
        const q = (query || '').toLowerCase().trim();
        if (!q) return this.cities$;
        return this.cities$.pipe(
            map(list =>
                list.filter(c =>
                    (c.name || '').toLowerCase().includes(q) ||
                    (c.region || '').toLowerCase().includes(q)
                )
            )
        );
    }

    /** Геометрия города (полигоны) из assets/data/polygons/<slug>.json */
    getPolygon(slugOrLabel: string): Observable<FeatureCollection> {
        const key = String(slugOrLabel);               // ожидаем, что это уже корректное имя
        if (this.polyCache.has(key)) return this.polyCache.get(key)!;

        const url = `${this.POLYGONS_DIR}/${key}.json`; // assets/data/polygons/<label>.json
        const req$ = this.http.get<FeatureCollection>(url).pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.polyCache.set(key, req$);
        return req$;
    }

}
