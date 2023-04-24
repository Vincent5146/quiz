import { defineStore } from "pinia";
import axios from "axios";

export const useRootStore = defineStore("rootStore", {
    state: () => {
        return {
            loading: true,
            peopleData: [],
            favoriteData: [],
        };
    },
    getters: {},
    actions: {
        getPeopleData() {
            axios
                .get(`https://randomuser.me/api/?results=3010`)
                .then((response) => {
                    this.peopleData = response.data.results;
                    this.loading = false;
                });
        },
        checkFavorite(person) {
            const index = this.favoriteData.findIndex(item => item.cell === person.cell)
            if (index >= 0) {
                this.favoriteData.splice(index, 1);
            } else {
                this.favoriteData.push(person);
            }
        }
    },
});
