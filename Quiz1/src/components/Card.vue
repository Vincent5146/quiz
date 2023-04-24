<script setup>
import { defineProps, ref, computed, watch, onMounted } from "vue";
import { useRootStore } from "../store/index.js";
import CardModal from "./Modal.vue";

const store = useRootStore();
const props = defineProps({
  person: Object,
});
const isFavorite = ref(false);
const favoriteData = computed(() => store.$state.favoriteData); // 原始資料

const checkFavorite = () => {
  store.checkFavorite(props.person);
};
const open = ref(false)
const showModal = () => {
  open.value = !open.value
}
const openModal = (value) => {
  open.value = value
}
watch(
  () => favoriteData.value,
  () => {
    const index = favoriteData.value.findIndex(
      (item) => item.cell === props.person.cell
    );
    if (index >= 0) {
      isFavorite.value = true;
    } else {
      isFavorite.value = false;
    }
  }, 
  {deep: true}
);
</script>

<template lang="pug">
div(@click.stop="showModal")
  .py-3.flex.flex-col.items-center.rounded.overflow-hidden.shadow-lg.bg-stone-50.h-80
    img.w-40(:src="props.person.picture.large", :alt="person")
    button.text-red-500(class="hover:text-red-600", @click="checkFavorite")
      i(:class="isFavorite.value ? 'fas fa-heart' : 'far fa-heart'")
    .mb-2font-bold.text-xl {{ props.person.name.first }} {{ props.person.name.last }}
    .text-gray-700.text-base
    .px-3.py-1.flex.flex-row.rounded-full.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.email }}
    .px-3.py-1.flex.flex-row.rounded-full.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.location.street.number }} {{ props.person.location.city }} {{ props.person.location.state }}
CardModal(v-if="open" :open="open" :person="props.person" @openModal="openModal")
</template>