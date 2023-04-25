<script setup>
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { useRoute } from 'vue-router'
import { useRootStore } from "../store/index.js";

const store = useRootStore();
const route = useRoute();
const props = defineProps({
  showQuantity: Number,
});
const emit = defineEmits(["changeShowQuantity"]);

const currentTab = ref("All");
const showQuantity = ref(store.$state.showQuantity);
const selectOptions = ref([{ value: 10 }, { value: 30 }, { value: 50 }]);

const changeQuantity = () => {
  store.$state.showQuantity = showQuantity.value;
  emit("changeShowQuantity", store.$state.showQuantity);
};
const changeTab = (value) => {
  currentTab.value = value;
};
const changeMode = (value) => {
  store.$state.showMode = value;
};
watch(
  () => route.path,
  () => {
    if(route.path === "/favorite") {
      currentTab.value = "Favorite"
    }
  },
  {immediate:true}
)
</script>

<template lang="pug">
.p-10.flex.items-center.justify-between.h-14.w-screen.bg-amber-50
  .flex.items-center.justify-between.w-32
    router-link(to='/')
      button.transition.duration-300.text-yellow-900.text-xl(
        class="focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500",
        :class="{ 'text-yellow-500 underline': currentTab === 'All' }",
        style="text-underline-offset: 8px",
        @click="changeTab('All')"
      ) All
    router-link(to='/favorite')
      button.transition.duration-300.text-yellow-900.text-xl(
        class="focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500",
        :class="{ 'text-yellow-500 underline': currentTab === 'Favorite' }",
        style="text-underline-offset: 8px",
        @click="changeTab('Favorite')"
      ) Favorite
  .flex.items-center.justify-between.w-32
    select.p-3.bg-white-600.text-gray-400.border-slate-400.inline-block.rounded.leading-tight(
      v-model="showQuantity",
      @click="changeQuantity"
    )
      option(v-for="option in selectOptions", :value="option.value") {{ option.value }}
    .w-5.h-5.bg-pink-400(@click="changeMode('Card')")
    .w-5.h-5.bg-pink-200(@click="changeMode('List')")
</template>