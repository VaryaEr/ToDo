
<template>
  <main>
    <div :class="{ 'deleted-mode': isDeleteMode }" class="content-container container-fluid">
      <div class="header-block">
        <div class="page-title">Главная страница</div>
        <button @click="setDeletedMode()" class="add-card btn-primary">
          Режим удаления
        </button>
      </div>
      <Table></Table>
      <div class="deleted-block">
        <button @click="showModal = true" class="delete-cards btn-primary">
          Удалить выбранные
        </button>
      </div>
      <Confirm v-if="showModal" @closeModal="closeModal()" @succsessModal="removeSelectedCards()"></Confirm>
    </div>
  </main>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Table from "./components/Table.vue";
import { useCardStore } from "./stores/card";
import Confirm from "./components/modal/Confirm.vue";

interface State {
  isDeleteMode: boolean,
  showModal: boolean,
}

export default defineComponent({
  components: { Table, Confirm },
  data(): State {
    return {
      isDeleteMode: false,
      showModal: false,
    }
  },
  mounted() {
    this.cardStore.resetCardsOptions()
  },
  methods: {
    /**
     * Закрывает модальное окно
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * Сохранение изменений после соглашения с даилоговым окном
     */
    removeSelectedCards(): void {
      this.showModal = false
      this.cardStore.removeCards()
      this.closeModal();
    },
    setDeletedMode() {
      this.isDeleteMode = !this.isDeleteMode
      if (this.isDeleteMode == false) {
        this.cardStore.resetCardsOptions()
      }
    }
  },
  computed: {
    cardStore: () => {
      return useCardStore();
    },
  },
});
</script>
<style scoped>
.container-fluid {
  padding: 50px 20px;
  max-width: 1440px;
  margin: auto;
}

main {
  background: #e5e9ef;
  min-height: 100vh;
}

.header-block {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  justify-content: space-between;
}

.deleted-block {
  justify-content: center;
  margin-top: 50px;
  display: none;
}

.deleted-mode .deleted-block {
  display: flex;
}
</style>
