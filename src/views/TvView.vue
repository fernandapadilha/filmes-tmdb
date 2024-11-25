<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre'

const genreStore = useGenreStore();
const tvShows = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});

const listTvShows = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tvShows.value = response.data.results
  isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
</script>

<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item">
        {{ genre.name }} 
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-list">
      <div v-for="tvShow in tvShows" :key="tv.id" class="tv-card">
              
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <div class="tv-details">
          <p class="tv-title">{{ movie.title }}</p>
          <p class="tv-release-date">{{ formatDate(movie.release_date) }}</p>
          <p class="tv-genres">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
              
      </div>
    </div>
</template>
  
  <style scoped>
    .genre-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
      list-style: none;
      padding: 0;
    }
  
    .genre-item {
      background-color: #5d6424;
      border-radius: 1rem;
      padding: 0.5rem 1rem;
      align-self: center;
      color: #fff;
      display: flex;
      justify-content: center;
    }
  
    .genre-item:hover {
      cursor: pointer;
      background-color: #7d8a2e;
      box-shadow: 0 0 0.5rem #5d6424;
    }
  </style>