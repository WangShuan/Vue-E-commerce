<template>
  <div>
    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a
            class="page-link"
            href="#"
            @click.prevent="getPages(pages.current_page - 1)"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="item in pages.total_pages"
          :key="item"
          :class="{ active: pages.current_page === item }"
        >
          <a class="page-link" href="#" @click.prevent="getPages(item)">{{
            item
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a
            class="page-link"
            href="#"
            @click.prevent="getPages(pages.current_page + 1)"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // 這個 pages = Admin.vue > pagination 變數
  props: ["pages"],
  methods: {
    getPages(num) {
      // event = Admin.vue > @event
      // @event 在 Admon.vue 指向 getProducts
      this.$emit("event", num);
    },
  },
};
</script>