<template>
  <div>
    <mcv-topbar/>
    <router-view/>
  </div>
</template>

<script>

import McvTopbar from '@/components/Topbar';
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  },
  mounted() {
    console.log('hello app')
    this.$store.dispatch(actionTypes.getCurrentUser)
  }

}
</script>

