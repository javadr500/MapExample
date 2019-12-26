
import httpClient,{BaseApi} from '../HttpClient';
import UrlHelper from '../UrlHelper';

class LocationApi {

    get() {
        return httpClient.get(`${UrlHelper.Location}/list`);
    }

    add(model) {
        return httpClient.post(UrlHelper.Location, model);
    }
    // edit(model) {
    //     return httpClient.put(UrlHelper.Ads, model);
    // }
    // delete(id) {
    //     return httpClient.delete(`${UrlHelper.Ads}/${id}`);
    // }
}

export default new LocationApi();

