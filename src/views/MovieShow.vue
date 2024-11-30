<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const props = defineProps(['id']);
const movieDetails = ref({});
const anoLancamento = ref('')

const showMovie = async (movieId) => {
  const response = await api.get(`movie/${movieId}`, {
    params: {
      series_id: movieId,
      language: 'pt-BR'
    }
  });
  movieDetails.value = response.data;
  anoLancamento.value = (movieDetails.value.release_date).slice(0, 4)
}

onMounted(async () => {
  await showMovie(props.id); 
});

</script>

<template>

    <main class="corpo">
      <img class="poster" :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`" alt="Poster do Filme">

      <section class="informacoes">
        <div class="cabecalho">
          <h1>{{ movieDetails.title }} <span>({{ anoLancamento }})</span></h1>
          <p>{{ (movieDetails.genres || []).map(genre => genre.name).join(', ') }}</p>
        </div>

        <div class="avaliacao">
          <p><span>{{ Math.floor(movieDetails.vote_average * 10) + '%' }}</span></p>
          <p>Avaliação</p>
        </div>

        <div class="sinopse" v-if="movieDetails.overview">
          <h5>{{ movieDetails.tagline }}</h5>
          <h2>Sinopse</h2>
          <p>{{ movieDetails.overview }}</p>
        </div>
        
        <!-- <div class="criador">
          <div v-for="creator in movieDetails.created_by || []" :key="creator.id">
            <h6>{{ creator.name }}</h6>
            <p>Criador(a)</p>
          </div>
        </div> -->

        <div class="status">
          <h6>Status:</h6>
          <p v-if="movieDetails.in_production">Em produção</p>
          <p v-else>Finalizado</p>
        </div>
      </section>     
    </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.corpo {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  padding: 1.5rem 2rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right top;
}

.poster {
  border-radius: 10px;
  width: 100%;
}

.informacoes {
  display: grid;
  align-content: center;
}

.cabecalho {
  margin-bottom: 1rem;

  & h1 {
    font-weight: 700;
    font-size: 2.2rem;
  }

  & h1 > span {
    color: var(--vt-c-text-dark-2);
  }
}

.avaliacao {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 1rem;
  margin-bottom: 1rem;

  & p > span {
    font-size: 1.2rem;
    font-weight: 600;
    border: 4px solid var(--cor-verde);
    padding: .7rem .5rem;
    border-radius: 100%;
  }

  & p {
    font-size: 1.2rem;
    font-weight: 500;
  }
}

.sinopse {
  & h5 {
    font-size: 1rem;
    font-style: italic;
    color: var(--vt-c-text-dark-2);
  }

  & h2 {
    font-weight: 600;    
  }
}

/* .criador {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  & div > h6 {
    font-size: 1.1rem;
    font-weight: 600;
  }

  & div > p {
    font-size: .8rem;
  }
} */

.status {
margin: 1rem 0;

  & h6 {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>