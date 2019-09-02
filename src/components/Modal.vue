<template>
  <div class="modal" :class="{'is-active' : this.active}">
    <div @click="$emit('close')" class="modal-background"></div>
    <slot></slot>
    </div>
</template>

<script>
export default {
    name : 'Modal',
    props : ['active'],
    data () {
        return {
            
        }
    }
}
</script>

<style>

</style>