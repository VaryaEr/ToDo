<template>
  <div>
    <form class="form_block">
      <div class="form_header-container simple-text">
        <div class="form_header">
          <div class="form_title" v-if="!!cardItem == false">Добавление</div>
          <div class="form_title" v-if="!!cardItem">Просмотр/Редактирование</div>
          <img @click="closeModal()" class="form_close" src="../../assets/images/icons/CloseBig.svg" />
        </div>
      </div>

      <div class="form_name form-el">
        <div class="form_name-title simple-text">Заголовок *:</div>
        <input type="text" v-model="title" maxlength="70" class="input-primary" />
      </div>
      <div class="form_name form-el">
        <div class="form_name-title simple-text">Описание:</div>
        <textarea type="text" v-model="description" maxlength="150" class="input-primary"></textarea>
      </div>
      <div class="form_btn-container">
        <button v-if="!!cardItem == false" @click.prevent="addCard()" class="add-card btn-primary">
          Добавить
        </button>
        <button v-if="!!cardItem" @click.prevent="changeCard()" class="add-card btn-primary">
          Сохранить
        </button>

        <button v-if="!!cardItem" @click.prevent="showModal = true" class="add-card btn-base">
          Удалить
        </button>
      </div>
    </form>
    <Confirm v-if="showModal" @closeModal="closeModalDeleted()" @succsessModal="removeCard()"></Confirm>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useCardStore } from "../../stores/card";
import { useListStore } from "../../stores/listCard";
import { Card as CardInterface } from "../../types/card";
import Confirm from "../../components/modal/Confirm.vue";

interface State {
  title: string | null;
  stage: string | null;
  id: number | null;
  description: string | null;
  showModal: boolean;
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
  components: { Confirm },
  data(): State {
    return {
      title: null,
      id: null,
      stage: null,
      description: null,
      showModal: false,
    };
  },
  mounted() {
    if (this.cardItem) {
      this.title = this.cardItem.title;
      this.id = this.cardItem.id;
      this.description = this.cardItem.description;
    }
    this.stage = this.cardType
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
     * Валидация формы
     * 
     * @return {boolean}
     */
    validation(): boolean {
      let res = this.title && this.title?.length > 0;
      return !!res;
    },
    /**
     * Добавляет карточку
     * 
     * @return {undefined}
     */
    addCard(): void {
      if (this.validation()) {
        let item = {
          title: this.title,
          description: this.description,
          stage: this.stage,
          isDelete: false,
        };
        this.$emit("addCard", item);
      }
    },
    /**
     * Удаляет карточку
     * 
     * @return {undefined}
     */
    removeCard(): void {
      this.showModal = false;
      if (this.cardItem) {
        this.cardStore.removeCard(this.cardItem);
        this.closeModal()
      }
    },
    /**
     * Обновляет картоку
     * 
     * @return {undefined}
     */
    changeCard(): void {
      if (this.validation()) {
        let item = {
          title: this.title,
          id: this.id,
          description: this.description,
          stage: this.stage,
          isDelete: false,
        };
        this.$emit("changeCard", item);
      }
    },
    /**
     * Закрывает модальное окно
     * 
     * @return {undefined}
     */
    closeModalDeleted(): void {
      this.showModal = false
    },
  },
  computed: {
    cardStore: () => {
      return useCardStore();
    },
    listStore: () => {
      return useListStore();
    },
  },
});
</script>

<style scoped>
.simple-text {
  flex-direction: column;
}

.form_btn-container {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 4px;
}

.input-primary {
  margin-top: 4px;
}

textarea.input-primary {
  height: 70px;
  resize: none;
}
</style>