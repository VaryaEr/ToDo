import { defineStore } from "pinia";
import { Card as CardInterface } from "../types/card";
import { useListStore } from "./listCard";

type Filter = CardInterface[] | null;
type FinedIndex =
    | {
          index: number;
          isFind: true;
      }
    | {
          index: null;
          isFind: false;
      };

export const useCardStore = defineStore("card", {
    state: () => {
        return {
            cards: null as Filter,
            isInit: true as Boolean,
            id: 0 as number,
        };
    },
    persist: true,
    getters: {
        listStore() {
            return useListStore();
        },
    },
    actions: {
        /**
         * Сбрасывает параметры карточек
         *
         * @return {undefined}
         */
        resetCardsOptions(): void {
            this.cards?.forEach((el) => {
                el.isDelete = false;
            });
            this.listStore.setCardsToList(this.cards);
        },
        /**
         * Добавляет новую карточку
         *
         * @param {CardInterface} item
         *
         * @return {undefined}
         */
        createCard(item: CardInterface): void {
            let card: CardInterface = item;

            this.id++;
            card.id = this.id;
            card = card;
            if (this.cards) {
                this.cards?.push(item);
            } else {
                this.cards = [item];
            }
            this.listStore.createCard(item);
            this.listStore.setCardsToList(this.cards);
        },
        /**
         * Удаляет выбранную карточку
         *
         * @param {CardInterface} item
         *
         * @return {undefined}
         */
        removeCard<T extends CardInterface>(item: T): void {
            if (this.cards) {
                let cardIndex = this.findIndex(item);
                if (cardIndex.isFind) {
                    this.cards.splice(cardIndex.index, 1);
                    this.listStore.setCardsToList(this.cards);
                }
            }
        },
        /**
         * Удаляет выбранные карточки
         *
         * @return {undefined}
         */
        removeCards(): void {
            if (this.cards) {
                for (let i = 0; i < this.cards.length; i++) {
                    let el = this.cards[i];
                    if (el.isDelete) {
                        let cardIndex = this.findIndex(el);
                        if (cardIndex.isFind) {
                            this.cards?.splice(cardIndex.index, 1);
                            i--;
                        }
                    }
                }
                this.listStore.setCardsToList(this.cards);
            }
        },
        /**
         * Обновляет выбранную карточку
         *
         * @param {CardInterface} item
         *
         * @return {undefined}
         */
        changeCard<T extends CardInterface>(item: T): void {
            if (this.cards) {
                let cardIndex = this.findIndex(item);
                if (cardIndex.isFind) {
                    this.cards[cardIndex.index] = item;
                    this.listStore.setCardsToList(this.cards);
                }
            }
        },
        /**
         * Поиск index карточки
         *
         * @param {CardInterface} item
         *
         *
         * @return {FinedIndex}
         */
        findIndex<T extends CardInterface>(item: T): FinedIndex {
            let res: FinedIndex = {
                index: null,
                isFind: false,
            };

            if (this.cards) {
                let index = this.cards.findIndex((el) => el.id == item.id);
                if (index > -1) {
                    res = {
                        index: index,
                        isFind: true,
                    };
                    return res;
                }
            }
            return res;
        },
    },
});
