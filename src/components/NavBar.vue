<template>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">
            <h3 class="title is-3">Youtube-Sync</h3>
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            <router-link :to="{ name: 'home' }" class="navbar-item" exact>
                Home
            </router-link>

            <router-link :to="{ name: 'about' }" class="navbar-item">
                About
            </router-link>
            </div>
            <div v-if="this.$route.name === 'room'" v-show="this.userPermLevel <= 1" class="navbar-start queue-input">
                <div v-show="this.pageLoading === true" class="navbar-item">
                    <div class="skaleton-parent">
                        <div class="skaleton-child"></div><span class="url-bar-skeleton"></span>
                    </div>
                </div>
                <div v-show="this.pageLoading !== true" class="field has-addons navbar-item">
                    <div class="control">
                        <input v-model="video_url" v-on:keyup.enter="sendUrl" :class="{'is-danger' : !urlValid}" class="input" type="text" placeholder="add video to queue">
                    </div>
                    <div class="control">
                        <a class="button is-dark" @click="sendUrl">
                        Add
                        </a>
                    </div>
                </div>
            </div>
            <div v-if="this.$route.name !== 'room'" class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                    <a @click="sendMenu('create')" class="button is-primary">
                        <strong>Create Room</strong>
                    </a>
                    <a @click="sendMenu('join')" class="button is-link">
                        <strong >Join Room</strong>
                    </a>
                    </div>
                </div>
            </div>
            <div v-if="this.$route.name === 'room'" class="navbar-end">
                <div v-show="this.pageLoading === true" class="navbar-item">
                    <div class="skaleton-parent">
                        <div class="skaleton-child"></div><span class="bar-button"></span>
                    </div>
                </div>
                <div v-show="this.pageLoading === true" class="navbar-item">
                    <div class="skaleton-parent">
                        <div class="skaleton-child"></div><span class="bar-button"></span>
                    </div>
                </div>
                <div v-show="this.pageLoading !== true" class="navbar-item">
                    <input v-show="false" type="text" :value="roomId" id="copyElement">
                    <div class="buttons">
                    <a @click="inviteFriend" class="button is-info">
                        <strong>Invite Friend</strong>
                    </a>
                    <a @click="sendMenu('exit')" class="button is-danger">
                        <strong v-show="this.userPermLevel === 0">Close Room</strong>
                        <strong v-show="this.userPermLevel !== 0">Exit Room</strong>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        </nav>
</template>

<script>
var url = require('url');

export default {
    name : 'NavBar',
    props: ['videoUrl', 'userPermLevel', 'pageLoading'],
    data : function() {
        return{
            video_url : null,
            urlValid : true,
            copied : false,
            roomId : this.$route.params.id
        }
    },
    methods : {
        isActive: function () {
            return 'is-active';
        },
        sendUrl : function(){
            var q = url.parse(this.video_url, true);

            if(q.host != null && ((q.host === 'www.youtube.com') && (q.pathname === '/watch') || (q.host === 'youtube.com') && (q.pathname === '/watch'))){
                this.urlValid = true;
                this.$emit('urlSended', this.video_url);
                this.video_url = null;
                
            }else{
                this.urlValid = false;
                this.video_url = null;
            }
        },
        sendMenu : function(opt){
            this.$emit('menuSended', opt);
        },
        inviteFriend : function(){
            var copyText = document.getElementById("copyElement");

            /* Select the text field */
            copyText.select();

            /* Copy the text inside the text field */
            document.execCommand("copy");
        }
    }
}
</script>

<style>
    .navbar{
        border-top: 1px solid #00D1B2;
        border-bottom: 4px solid #dbdbdb;
    }

    .queue-input{
        flex-grow: 1; 
        justify-content: center !important;
    }

    .queue-input input{
        width: 300px;
    }

    .url-bar-skeleton{
        width: 354px;
        height: 29px;
    }

    .bar-button{
        width: 110px;
        height: 29px;
    }

</style>
