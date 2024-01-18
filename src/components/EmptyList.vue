<template>
  <div class="card-el zero-list">Список пуст</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.card-el {
  display: flex;
  padding: 12px 0px;
  height: 70px;
  background: white;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;
}

.zero-list {
  border-radius: 4px;
  border: 1px dashed #bac4d0;
  background: #d5dce5;
  color: #7d8ca1;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>