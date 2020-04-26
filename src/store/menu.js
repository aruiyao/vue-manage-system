export default {
  state: {
    systemName:"CRY管理系统",
    isCollapse: false,
    currentMenu: null,
    menu: [],
    tagList: [{
      path: "/",
      name: "home",
      label: "首页",
      icon: "el-icon-s-home"
    }]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== 'home') {
        let result = state.tagList.findIndex((item) => item.name === val.name);
        result === -1 ? state.tagList.push(val) : '';
        state.currentMenu = val
      }
    },
    closeTag(state, tag) {
      let result = state.tagList.findIndex((item) => item.name === tag.name);
      state.tagList.splice(result, 1);
    },
    collapseMenu(state) {
      state.systemName = state.isCollapse?'CRY管理系统':'CRY';
      console.log(state.systemName);
      
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {}
}