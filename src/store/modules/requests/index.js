import mutations from './mutations';
import actions from './actions';
import getters from './getters';


export default {
    namespaced: true,
    state(){
        return {
            requests: [],
        }
    },
    //可以給key value 也可以直接使用key 
    mutations,
    actions,
    getters,
}