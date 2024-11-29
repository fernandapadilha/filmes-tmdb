import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugins/axios';

export const useGenreStore = defineStore('genre', () => {
  const state = reactive({
    genres: [],
  });

  const genres = computed(() => state.genres);
  const getGenreName = (id) =>
    state.genres.find((genre) => genre.id === id).name;

  const getAllGenres = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    state.genres = response.data.genres;
  };

  // function pegarModeloPorId(id) {
  //   // Modelo universal
  //   for (let tvShow of modelos.value) {
  //     if (tvShow.id == id) {
  //       return tvShow
  //     }
  //   }
  //   return {}
  // }

  return { genres, getAllGenres, getGenreName };
});