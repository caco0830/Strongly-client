import config from '../config.js';

const TokenService = {
    getAuthToken(){
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    hasAuthToken(){
        return !!TokenService.getAuthToken();
    }

}

export default TokenService;