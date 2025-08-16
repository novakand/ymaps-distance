import { Injectable } from "@angular/core";

@Injectable()
export class MapSearchService {

    public getDetails(places: any): any {
        return places?.features?.map((item: any) => ({ placeName: item.place_name, countryCode: item.context[item.context.length - 1].short_code || '' }))
    }

}