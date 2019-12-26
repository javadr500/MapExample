
import httpClient,{BaseApi} from '../HttpClient';
import UrlHelper from '../UrlHelper';

class LocationTypeApi {

    get() {
        return httpClient.get(`${UrlHelper.LocationType}/list`);
    }

  
}

export default new LocationTypeApi();

