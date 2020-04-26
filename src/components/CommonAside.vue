<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <!-- <h3>{{systemName}}</h3> -->
    <el-menu-item
      :index="item.path"
      v-for="(item,index) in noChildren"
      :key="'noChildren'+index"
      @click="chooseMenu(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu :index="item.label" v-for="(item,index) in hasChildren" :key="'hasChildren'+index">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem,index) in item.children" :key="'children'+index">
        <el-menu-item :index="subItem.path" @click="chooseMenu(subItem)">
          <i :class="subItem.icon"></i>
          <span>{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "el-icon-s-home"
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理",
          icon: "el-icon-video-play"
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "el-icon-user"
        },
        {
          label: "其他",
          icon: "el-icon-user",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "el-icon-setting"
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "el-icon-setting"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isCollapse: state => state.menu.isCollapse,
      systemName: state => state.menu.systemName
    }),
    noChildren() {
      return this.asideMenu.filter(item => {
        return !item.children;
      });
    },
    hasChildren() {
      return this.asideMenu.filter(item => {
        return item.children;
      });
    }
  },
  methods: {
    chooseMenu(menu) {
      this.$router.push({
        name: menu.name
      });
      this.$store.commit("selectMenu", menu);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
    overflow: hidden;
    white-space: nowrap
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>