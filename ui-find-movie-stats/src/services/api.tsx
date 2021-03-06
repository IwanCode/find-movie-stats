import { BASE_URL, BASE_HOST } from '../constants';
import appConfig from '../appConfig.json';

class Api {
  interceptUrl(url: string) {
    let urlIsValid = true;

    try {
      new URL(url);
    }
    catch {
      urlIsValid = false;
    }
    finally {
      return new URL(urlIsValid ? `${url}` : `${BASE_URL}${url}`)
    }
  }

  generateFullUrl(url: string) {
    const urlObj = this.interceptUrl(url);

    if(urlObj.host === BASE_HOST) {
      urlObj.searchParams.set('api_key', appConfig.API_KEY);  
    }
    
    return urlObj.toString();
  }

  get = async (url: string) => {
    const response = await fetch(this.generateFullUrl(url));
    const data = await response.json();

    return data;
  };

  getAll = async (urls: string[]) => {
    return Promise.all(urls.map(url => {
      return fetch(this.generateFullUrl(url)).then(data => data.json())
    }))
  }
}

export default new Api();
