<script setup>
import { defineProps, ref, computed, watch, onMounted, nextTick } from "vue";
import { useRootStore } from "../store/index.js";
import CardModal from "./Modal.vue";

const store = useRootStore();
const props = defineProps({
  mode: String,
  person: Object,
});

const mode = "card"

const open = ref(false);
const showModal = () => {
  open.value = !open.value;
};
const openModal = (value) => {
  open.value = value;
};

const favoriteData = computed(() => store.$state.favoriteData); // 原始資料
const isFavorite = ref(false);
const checkFavorite = () => {
  store.checkFavorite(props.person);
  const index = favoriteData.value.findIndex(
    (item) => item.cell === props.person.cell
  );
  isFavorite.value = index >= 0;
  nextTick(() => {
    isFavorite.value = !isFavorite.value;
  });
};
watch(
  () => store.favoriteData,
  () => {
    const index = favoriteData.value.findIndex(
      (item) => item.cell === props.person.cell
    );
    isFavorite.value = index >= 0;
  },
  { immediate: true }
);
</script>

<template lang="pug">
div(@click.stop="showModal")
  .py-3.flex.flex-col.items-center.rounded.overflow-hidden.shadow-lg.bg-stone-50.h-80(
    v-if="store.showMode === 'Card'"
  )
    img.w-40(:src="props.person.picture.large", :alt="person")
    button.text-red-500(class="hover:text-red-600", @click="checkFavorite")
      i(:class="isFavorite ? 'fas fa-heart' : 'far fa-heart'")
    .mb-2font-bold.text-xl {{ props.person.name.first }} {{ props.person.name.last }}
    .text-gray-700.text-base
    .px-3.py-1.flex.flex-row.rounded-full.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.email }}
    .px-3.py-1.flex.flex-row.rounded-full.text-sm.font-semibold.text-center.text-gray-700 {{ props.person.location.street.number }} {{ props.person.location.city }} {{ props.person.location.state }}
    
  .p-5.cursor-pointer.bg-white.shadow.flex.items-center.mb-5.rounded-lg(
    class="hover:bg-gray-200",
    v-if="store.showMode === 'List'"
  )
    div(class="w-1/2")
      .flex.items-center
        img.rounded-full(:src="props.person.picture.large", :alt="person")
        .ml-4
          span.capitalize.block.text-gray-800 {{ props.person.name.first }}
          span.text-sm.block.text-gray-600 {{ props.person.email }}
    div(class="w-1/4")
      span.capitalize.text-gray-600.text-sm {{ props.person.gender }}
    div(class="w-1/4")
      span.capitalize.text-gray-600.text-sm {{ props.person.location.city }}
    div(class="w-1/4")
      span.text-gray-600.text-sm {{ props.person.phone }}
    div(class="w-1/4")
      span.text-gray-600.text-sm {{ props.person.registered.date.split("T")[0] }}
    button.text-red-500(class="hover:text-red-600", @click="checkFavorite")
      i(:class="isFavorite ? 'fas fa-heart' : 'far fa-heart'")
card-modal(
  v-if="open",
  :open="open",
  :person="props.person",
  @openModal="openModal"
)
</template>