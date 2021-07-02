<template>
  <div class="SearchInput">
    <form v-on:submit.prevent="onSubmitSearch()">
      <input
        type="text"
        class="form-control text-muted form-rounded p-4 shadow-sm rounded-pill"
        :placeholder="placeholderLabel"
        autocomplete="off"
        v-model="search"
      />
    </form>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        search: this.defaultValue,
      };
    },
    props: {
      placeholderLabel: {
        type: String,
      },
      defaultValue: {
        type: String,
      },
    },
    methods: {
      onSubmitSearch() {
        this.$emit('onSubmit', this.search);
      },
    },
  });
</script>

<style lang="scss">
  .SearchInput {
    .form-control:focus {
      box-shadow: none;
      border-color: inherit;
    }

    .form-rounded {
      border-radius: 2rem;
    }
  }
</style>
