<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  showQuantity: Number,
});
const emit = defineEmits(["changeShowQuantity", "changeShowTab"]);

const showQuantity = ref(props.showQuantity);
const currentTab = ref("All");
const selectOptions = ref([{ value: 10 }, { value: 30 }, { value: 50 }]);

const changeQuantity = () => {
  emit("changeShowQuantity", showQuantity.value);
};
const changeTab = (value) => {
  currentTab.value = value;
  emit("changeShowTab", currentTab.value);
};

watch(
  () => props.showQuantity,
  (value) => {
    showQuantity.value = value;
  }
);
</script>

<template lang="pug">
.p-10.flex.items-center.justify-between.h-14.w-screen.bg-amber-50
  .flex.items-center.justify-between.w-32
    a.transition.duration-300.text-yellow-900.text-xl(
      class="focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500",
      :class="{ 'text-yellow-500 underline': currentTab === 'All' }",
      style="text-underline-offset: 8px",
      href="#",
      @click="changeTab('All')"
    ) All
    a.transition.duration-300.text-yellow-900.text-xl(
      class="focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500",
      :class="{ 'text-yellow-500 underline': currentTab === 'Favorite' }",
      style="text-underline-offset: 8px",
      href="#",
      @click="changeTab('Favorite')"
    ) Favorite
  .flex.items-center.justify-between.w-32
    select.p-3.bg-white-600.text-gray-400.border-slate-400.inline-block.rounded.leading-tight(
      v-model="showQuantity",
      @click="changeQuantity"
    )
      option(v-for="option in selectOptions", :value="option.value") {{ option.value }}
    .w-5.h-5.bg-pink-400
    .w-5.h-5.bg-pink-200
</template>