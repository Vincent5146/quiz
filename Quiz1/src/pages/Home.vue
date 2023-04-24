<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";
import { useRootStore } from "../store/index.js";

const store = useRootStore();

const peopleData = computed(() => store.$state.peopleData); // 原始資料
const favoriteData = computed(() => store.$state.favoriteData); // 原始資料

const pageData = ref([]); // 當前頁面顯示的資料
const currentPage = ref(1); // 當前頁面No.

const totalDataLength = ref(3010); // 總資料數量
const showQuantity = ref(10); // 當前單頁的顯示數量
const showTab = ref("All"); // 當前顯示的Tab

// 切換頁數滑動至頂
const content = ref(null);
const scrollToTop = () => {
  content.value.scrollIntoView({ behavior: "smooth" });
};
// 接收emits資料
const changeShowQuantity = (value) => {
  showQuantity.value = value;
};
const changeShowTab = (value) => {
  showTab.value = value;
  currentPage.value = 1;
};
// 畫面資料渲染
const filterPageData = () => {
  pageData.value = [];
  if (showTab.value === "All") {
    totalDataLength.value = peopleData.value.length;
    if (currentPage.value === 1) {
      pageData.value = peopleData.value.slice(0, 0 + showQuantity.value);
    } else {
      let index = (currentPage.value - 1) * showQuantity.value;
      pageData.value = peopleData.value.slice(
        index,
        index + showQuantity.value
      );
    }
  } else if (showTab.value === "Favorite") {
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
  }
  scrollToTop();
};
onMounted(async () => {
  await store.getPeopleData();
  await filterPageData();
});
watch(
  [
    () => showQuantity.value,
    () => currentPage.value,
    () => showTab.value,
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
    @changeShowTab="changeShowTab",
    @changeShowQuantity="changeShowQuantity"
  )
  .p-10.grid.grid-cols-1.gap-5.w-screen.bg-amber-200(
    v-if="store.$state.loading",
    class="sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5"
  ) loading...
  .p-10.grid.grid-cols-1.gap-5.w-screen.bg-amber-200(
    v-else,
    class="sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5"
  )
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