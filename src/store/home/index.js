import JikanService from "../../services/jikan.service";

// action types
export const GET_TOP_ANIME = 'getTopAnime';

// mutation types
export const SET_TOP_ANIME = 'setTopAnime';
export const SET_TOTAL = 'setTotal';

const state = {
  animeList: [],
  total: 0
};

const getters = {
  animeList(state) {
      return state.animeList;
  },
  total(state) {
      return state.total;
  }
};

const actions = {
  [GET_TOP_ANIME](context, payload) {
      new Promise(resolve => {
        JikanService.get('http://localhost:3000/animelist?page=' + payload.page + '&limit=' + payload.limit ).then((response) => {
            context.commit(SET_TOP_ANIME, response.top);
            context.commit(SET_TOTAL, response.total)
            resolve('OK');
        })
      })
  }
};

const mutations = {
  [SET_TOP_ANIME](state, animeList) {
      state.animeList = animeList;
  },
  [SET_TOTAL](state, total) {
      state.total = total;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
