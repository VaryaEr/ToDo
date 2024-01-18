<template>
  <div class="card-container">
    <input class="deleted-input" v-model="cardItem.isDelete" type="checkbox" name="is-delete">
    <div class="card-el">
      <div class="card_content">
        <div class="card_head">
          <div class="card_name">{{ cardItem.title }}</div>
          <img @click="showModal = true" class="card_edit" src="../assets/images/icons/NoteEdit.svg" />
          <img class="card_delete" @click="showModalDeleted = true" src="../assets/images/icons/Garbage.svg" />
        </div>
      </div>
      <CardModal :cardType="cardItem.stage" :cardItem="cardItem" v-if="showModal" @closeModal="closeModal()"></CardModal>
      <Confirm v-if="showModalDeleted" @closeModal="closeModal()" @succsessModal="removeCard()"></Confirm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Card as CardInterface } from "../types/card";
import { useCardStore } from "../stores/card";
import CardModal from "./modal/CardModal.vue";
import Confirm from "../components/modal/Confirm.vue";

interface State {
  showModal: boolean;
  showModalDeleted: boolean;
}

export default defineComponent({
  components: { CardModal, Confirm },
  props: {
    cardItem: {
      type: Object as PropType<CardInterface>,
      required: true,
    },
  },
  data(): State {
    return {
      showModal: false,
      showModalDeleted: false,
    };
  },
  methods: {
    removeCard() {
      this.showModalDeleted = false
      this.cardStore.removeCard(this.cardItem);
      this.closeModal()
    },
    /**
     * Знакрывает модальное окно
     * 
     * @return {undefined}
     */
    closeModal(): void {
      this.showModal = false;
    },
  },
  computed: {
    cardStore: () => {
      return useCardStore();
    },
  },
});
</script>

<style scoped>
.card-el {
  display: flex;
  padding: 12px 0px;
  min-height: 70px;
  background: white;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;
}

.card_content {
  padding: 0 12px;
  margin-right: 8px;
  display: flex;
  flex-direction: column;
}

.card_head {
  margin-bottom: 8px;
  display: flex;
}

.card_name {
  color: #38393d;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-right: 8px;
}

.card_head img {
  width: 17px;
  height: 17px;
  cursor: pointer;
}

.card_edit {
  margin-right: 4px;
}

.card_menu {
  padding: 0 8px;
}

.card_delete {
  width: 16px;
  height: 16px;
}

.card-container {
  display: flex;
}

.deleted-input {
  margin-right: 10px;
  display: none;
}

.deleted-mode .deleted-input {
  display: block;
}
</style>