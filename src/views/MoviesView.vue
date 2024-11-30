<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router';

const router = useRouter();
const genreStore = useGenreStore();
const movies = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});

function visualizar(id) {
  router.push(`/filmes/${id}`) //template string
};

const listMovies = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
  isLoading.value = false;
};

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
</script>

<template>
  <h1>Filmes</h1>

  <main class="corpo">
    <ul class="genre-list">
      <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item">
        {{ genre.name }} 
      </li>
    </ul>

    <loading v-model:active="isLoading" is-full-page />

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
              
        <img @click="visualizar(movie.id)" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <div class="movie-details">
          <p @click="visualizar(movie.id)" class="movie-title">{{ movie.title }}</p>
          <p>{{ formatDate(movie.release_date) }}</p>
          <p class="movie-genres">
            <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
              {{ genreStore.getGenreName(genre_id) }}
            </span>
          </p>
        </div>
              
      </div>
    </div>
  </main>
  
</template>

<style scoped>
h1 {
  margin: 1rem 0 0 1rem;
}

.corpo {
  display: grid;
  grid-template-columns: 1fr 11fr;
}

.genre-list {
  display: flex;
  flex-direction: column;
  row-gap: .5rem;
  list-style: none;
  margin-top: 5rem;
}

.genre-item {
  background-color: var(--cor-azul);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: var(--vt-c-white);
}

.genre-item:hover {
  cursor: pointer;
  filter: grayscale(60%);
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 5rem 0;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: normal;
  margin: .5rem 0;
  cursor: pointer;
}   

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: .5rem;
}

.movie-genres span {
  background-color: var(--cor-azul);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: var(--vt-c-white);
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  filter: grayscale(60%);
}
</style>