<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const props = defineProps(['id']);
const tvDetails = ref({});
const anoLancamento = ref('')

const showTvShow = async (tvId) => {
  const response = await api.get(`tv/${tvId}`, {
    params: {
      series_id: tvId,
      language: 'pt-BR'
    }
  });
  tvDetails.value = response.data;
  anoLancamento.value = (tvDetails.value.first_air_date).slice(0, 4)
}

onMounted(async () => {
  await showTvShow(props.id); 
});

</script>

<template>

    <main class="corpo">
      <img class="poster" :src="`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`" alt="Poster do Programa de TV">

      <section class="informacoes">
        <div class="cabecalho">
          <h1>{{ tvDetails.name }} <span>({{ anoLancamento }})</span></h1>
          <p>{{ (tvDetails.genres || []).map(genre => genre.name).join(', ') }}</p>
        </div>

        <div class="avaliacao">
          <p>{{ Math.floor(tvDetails.vote_average * 10) + '%' }}</p>
          <p>Avaliação</p>
        </div>

        <div class="sinopse" v-if="tvDetails.overview">
          <h2>Sinopse</h2>
          <p>{{ tvDetails.overview }}</p>
        </div>
        
        <div class="criador">
          <div v-for="creator in tvDetails.created_by || []" :key="creator.id">
            <h6>{{ creator.name }}</h6>
            <p>Criador(a)</p>
          </div>
        </div>

        <div class="status">
          <h6>Status:</h6>
          <p v-if="tvDetails.in_production">Em produção</p>
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
</style>