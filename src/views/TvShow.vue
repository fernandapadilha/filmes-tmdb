<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useGenreStore } from '@/stores/genre';

const props = defineProps(['id']);
const genreStore = useGenreStore();
const tvDetails = ref([]);

const showTvShow = async (tvId) => {
  const response = await api.get(`tv/${tvId}`, {
    params: {
      series_id: tvId,
      language: 'pt-BR'
    }
  });
  tvDetails.value = response.data;
}

onMounted(() => {
    tvDetails.value = showTvShow(props.id)
});

</script>

<template>
    <h1>{{ tvDetails.name }}</h1>

    <section>

        <p v-for="creator in tvDetails.created_by" :key="creator.id">{{ creator.name }}</p>
        <p>
            <span v-for="genre_id in tvDetails.genre_ids" :key="genre_id">
              {{ genreStore.getGenreName(genre_id) }}
            </span>
        </p>
        {{ tvDetails.genres }}
        {{ tvDetails.adult }}
        {{ tvDetails.poster_path }}
        {{ tvDetails.in_production }}
        {{ tvDetails.languages }}
        {{ tvDetails.number_of_episodes }}
        {{ tvDetails.number_of_seasons }}
        {{ tvDetails.vote_average }}
        {{ tvDetails.vote_count }}
    </section>

    <!-- {{ tvDetails }} -->
</template>

<style scoped></style>