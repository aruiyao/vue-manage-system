<template>
  <div class="header-div">
    <div class="l-content">
      <el-button type="info" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current!==null">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      userImg: require("../assets/images/user.png")
    };
  },
  computed: {
    ...mapState({
      current: state => state.menu.currentMenu
    })
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    }
  }
};
</script>

<style lang="scss" scoped>
.header-div {
  background-color: #474747;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .l-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-breadcrumb {
  margin-left: 20px;
}
</style>
<style lang="scss">
.el-header {
  padding: 0;
}
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #ffffff;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>