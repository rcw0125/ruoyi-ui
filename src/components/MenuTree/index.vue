<template>
  <div>
    <template v-for="menu in this.menuData">
      <el-submenu :key="menu.id" :index="menu.id+''" v-if="menu.children">
          <template slot="title">
              <i :class="menu.icon"></i>
              <span slot="title">{{menu.name}}</span>
          </template>
          <menu-tree :menuData="menu.children"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.id" :index="menu.id+''" v-else>
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>
  
<script>
export default {
  props: ['menuData'],
  name: 'MenuTree'
}
</script>