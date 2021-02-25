<template>
    <div class="notif-container">
        <div v-for="(item, index) in this.notifArray" v-bind:key="index" class="notification notif-custom" :class="['is-' + item.type, item.customClass]">
            <button v-if="item.closeButton" @click="del(index)" class="delete"></button>
            <div v-if="item.htmlTags" v-html="item.bodyMessage"></div>
            <div v-else>{{ item.bodyMessage }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'Notification',
    props: ['notify', 'trigger'],
    data (){
        return {
            notifArray : []
        }
    },
    methods : {
        del : function (index){
            this.$delete(this.notifArray, index);
        },
        push : function(data){
            this.notifArray.push(data);
            if(data.duration != -1){
                setTimeout(function () {
                    this.notifArray.pop();
                }.bind(this), data.duration);
            }
        }
    },
    watch : {
        notify : function(val){
            this.push(val)
        },
        trigger : function(val2){
            if(val2){
                this.notifArray.pop();
            }
        }
    }
}
</script>

<style>
    .notif-container{
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 2;
        margin-right: 20px;
        margin-bottom: 20px;
    }
</style>