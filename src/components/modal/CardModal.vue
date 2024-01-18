<template>
  <div class="modal-container">
    <div class="modal-content">
      <CreatCardForm :cardType="cardType" @closeModal="closeModal()" @addCard="addCard" @changeCard="changeCard"
        :cardItem="cardItem"></CreatCardForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useCardStore } from "../../stores/card";
import { Card as CardInterface } from "../../types/card";
import CreatCardForm from "../visual/creatCardForm.vue";

interface State {
  item: Object | null;
}
export default defineComponent({
  props: {
    cardType: {
      type: String as PropType<string>,
      required: true,
    },
    cardItem: {
      type: Object as PropType<CardInterface>,
      required: false,
    },
  },
  component: { CreatCardForm },
  data(): State {
    return {
      item: null,
    };
  },
  mounted() {
    if (this.cardItem) {
      this.item = this.cardItem;
    }
  },
  methods: {
    /**
     * Знакрывает модальное окно
     * 
     * @return {undefined}
     */
    closeModal(): void {
      this.$emit("closeModal");
    },
    /**
     * Добавляет карточку
     *
     * @param {Object} item
     * 
     * @return {undefined}
     */
    addCard<T extends CardInterface>(item: T): void {
      this.cardStore.createCard(item);
      this.closeModal();
    },
    /**
     * Обновляет картоку
     *
     * @param {object} item
     * 
     * @return {undefined}
     */
    changeCard<T extends CardInterface>(item: T): void {
      this.cardStore.changeCard(item);
      this.closeModal();
    },
  },
  computed: {
    cardStore: () => {
      return useCardStore();
    },
  },
  components: { CreatCardForm }
});
</script>

<style scoped>
:deep(.project-select_button) {
  background: #f0f3f8;
}

:deep(.project-select) {
  width: 100%;
}
</style>