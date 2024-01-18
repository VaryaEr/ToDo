<template>
  <div class="modal-container">
    <div class="modal-content">
      <div class="confirm_container">
        <div class="simple-text">Выполнить действие?</div>
        <div class="confirm_btn">
          <button @click="succsessModal()" class="btn-primary">Да</button>
          <button @click="closeModal()" class="btn-base">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    /**
     * Закрывает модальное окно
     * 
     * @return {undefined}
     */
    closeModal(): void {
      this.$emit("closeModal");
    },

    /**
     * Возвращает метод согласия из диалогового окна
     * 
     * @return {undefined}
     */
    succsessModal(): void {
      this.$emit("succsessModal");
    },
  },
});
</script>

<style scoped>
.confirm_btn {
  display: flex;
}

.confirm_container {
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 4px;
  padding: 20px;
}

.confirm_btn {
  display: flex;
  justify-content: space-between;
}
</style>