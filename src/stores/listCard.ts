import { defineStore } from "pinia";
import { List as ListInterface } from "../types/listCard";
import { Card as CardInterface } from "../types/card";

type Filter = ListInterface[] | null;
type Card = CardInterface[] | null;

export const useListStore = defineStore("list", {
    state: () => {
        return {
            lists: [
                {
                    name: "Нужно сделать",
                    code: "need-do",
                    cards: null,
                },
                {
                    name: "В процессе",
                    code: "during",
                    cards: null,
                },
                {
                    name: "Сделано",
                    code: "complete",
                    cards: null,
                },
            ] as Filter,
            isInit: true as Boolean,
        };
    },
    persist: true,
    actions: {
        /**
         * Устанавливает значение списков
         *
         * @param {Filter} items
         *
         * @return {undefined}
         */
        setListItems(items: Filter): void {
            this.lists = items;
        },
        /**
         * Устанавливает значение карточек списков
         *
         * @param {Card} items
         *
         * @return {undefined}
         */
        setCardsToList(items: Card): void {
            this.lists?.forEach((el) => {
                el.cards = [];
            });
            items?.forEach((el) => {
                this.lists?.forEach((item) => {
                    if (item.code === el.stage) {
                        item.cards?.push(el);
                    }
                });
            });
        },
        /**
         * Добавляет новую карточку
         *
         * @param {CardInterface} card
         *
         * @return {undefined}
         */
        createCard<T extends CardInterface>(card: T): void {
            this.lists?.forEach((item) => {
                if (item.code === card.stage) {
                    item.cards?.push(card);
                }
            });
        },
    },
});
