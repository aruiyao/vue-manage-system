<template>
  <div class="tags">
    <el-tag
      size="small"
      v-for="tag in tagList"
      :key="tag.name"
      :closable="tag.name!=='home' && $route.name!==tag.name"
      :type="tag.type"
      :effect="$route.name===tag.name?'dark':'plain'"
      @close="handleClose(tag)"
      @click="selectTag(tag)"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tagList: state => state.menu.tagList
    })
  },
  methods: {
    ...mapMutations({
      closeTag: "closeTag"
    }),
    handleClose(tag) {
      this.closeTag(tag);
    },
    selectTag(tag) {
      this.$router.push({ name: tag.name });
      this.$store.commit("selectMenu", tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
</style>