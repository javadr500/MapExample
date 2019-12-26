
import httpClient, { BaseApi } from '../HttpClient';
import UrlHelper from '../UrlHelper';
import axios from 'axios';

class FileApi {


    upload(file) {
        let data = new FormData();
        data.append('file', file);

        // body: formData,

        return axios({
            url: `/api/v1/${UrlHelper.File}/upload`,
            method: 'post',
            data: {
                data
            },
        })


    }

}

export default new FileApi();

