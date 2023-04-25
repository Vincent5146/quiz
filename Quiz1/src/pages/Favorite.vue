<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";
import { useRootStore } from "../store/index.js";

const store = useRootStore();

const favoriteData = computed(() => store.$state.favoriteData); // 原始資料

const pageData = ref([]); // 當前頁面顯示的資料
const currentPage = ref(1); // 當前頁面No.

const totalDataLength = ref(3010); // 總資料數量
const showMode = computed(() => store.$state.showMode); // 當前顯示樣式Card or List
const showQuantity = ref(store.$state.showQuantity); // 當前單頁的顯示數量

// 切換頁數滑動至頂
const content = ref(null);
const scrollToTop = () => {
  content.value.scrollIntoView({ behavior: "smooth" });
};
// 接收emits資料
const changeShowQuantity = (value) => {
  showQuantity.value = value;
};
// 畫面資料渲染
const filterPageData = () => {
  pageData.value = [];
  if (favoriteData.value.length > 0) {
    totalDataLength.value = favoriteData.value.length;
  } else {
    totalDataLength.value = 1;
  }
  if (currentPage.value === 1) {
    pageData.value = favoriteData.value.slice(0, 0 + showQuantity.value);
  } else {
    let index = (currentPage.value - 1) * showQuantity.value;
    pageData.value = favoriteData.value.slice(
      index,
      index + showQuantity.value
    );
  }
  scrollToTop();
};
onMounted(async () => {
  await store.getPeopleData();
  await filterPageData();
});
watch(
  [
    () => currentPage.value,
    () => store.$state.showMode,
    () => store.$state.showQuantity,
    () => store.$state.peopleData,
    () => store.$state.favoriteData,
  ],
  () => {
    filterPageData();
  },
  { deep: true }
);
</script>

<template lang="pug">
.flex.flex-col.items-center(ref="content")
  Navbar(
    :showQuantity="showQuantity",
    @changeShowQuantity="changeShowQuantity"
  )
  .p-10.grid.grid-cols-1.gap-5.w-screen.bg-amber-200(
    v-if="store.$state.loading"
  ) loading...
  .p-10.grid.grid-cols-1.gap-5.w-screen.bg-amber-200(
    v-else-if="showMode === 'Card'",
    class="sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5"
  )
    Card(v-for="(person, index) in pageData", :key="person", :person="person")
  .p-10.w-screen.bg-amber-200(v-else-if="showMode === 'List'")
    .flex.items-center.px-5.py-2
      span.text-center(class="w-1/5") 
      span(class="w-1/2")
        span.text-xs.uppercase.text-gray-600.font-bold Contact Info
      span(class="w-1/4")
        span.text-xs.uppercase.text-gray-600.font-bold Gender
      span(class="w-1/4")
        span.text-xs.uppercase.text-gray-600.font-bold City
      span(class="w-1/4")
        span.text-xs.uppercase.text-gray-600.font-bold Phone
      span(class="w-1/4")
        span.text-xs.uppercase.text-gray-600.font-bold Created At
    Card(v-for="(person, index) in pageData", :key="person", :person="person")
  vue-awesome-paginate.pt-2(
    :total-items="totalDataLength",
    :items-per-page="showQuantity",
    :max-pages-shown="5",
    v-model="currentPage"
  )
</template>

<style scope>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>