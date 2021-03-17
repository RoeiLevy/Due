<template>
  <div class="header">
    <div class="flex column top-navigation">
      <img class="logo" src="@/assets/imgs/logo.png" />
      <router-link to="/board">Boards</router-link>
      <router-link to="/board">notifications</router-link>
      <router-link to="/board">Inbox</router-link>
    </div>
    <div class="flex column bottom-navigation">
      <button>myWeek</button>
      <button>Invite</button>
      <button>Search</button>
      <button>Help</button>
      <button>userComponent</button>
   <font-awesome-icon icon="user-secret" />
    </div>
  </div>
</template>

<script>

export default {};

</script>
