<template>
<div class="main">
    <Modal :active="isModalActive">
        <template>
            <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button @click="isModalActive = false" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button @click="isModalActive = false" class="button">Cancel</button>
            </footer>
        </div>
        </template>
    </Modal>
    <NavBar @urlSended = "urlSended" :userPermLevel="userPerm" :pageLoading="isPageLoading" @menuSended="menuSended"></NavBar>
    <Notification v-bind:notify="this.notificationObject" v-bind:trigger="this.notificationTrigger"></Notification>
    <div class="room">
        <div class="container">
            <div class="columns">
                <div class="column is-three-fifths">
                    <div class="skaleton-parent" @mouseover="playerControlsToggle(true)" @mouseleave="playerControlsToggle(false)" @dblclick="playerToggleFS">
                        <div v-show="this.isPageLoading === true" class="skaleton-child"></div>
                        <div :class="{'main-video' : userPerm !== 0}">
                            <vue-plyr :options="plyr_options" ref="plyr">
                                <video :poster="empty_plyr_poster" src="video.mp4">
                                    <source :src="plyr_options.blankVideo" type="video/mp4" size="720">
                                </video>
                            </vue-plyr>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <nav class="panel">
                        <p class="panel-heading">
                            Playlist
                        </p>
                        <div v-show="!this.videoList.length && this.isPageLoading !== true" class="columns empty-plist is-gapless has-text-centered is-vcentered is-centered">
                            Empty
                        </div>
                        <div v-show="this.isPageLoading === true" class="panel-main-scroll" style="border-bottom: 1px solid #dbdbdb">
                             <a class="panel-block">
                                <div class="media-left">
                                    <div class="skaleton-parent"><div class="skaleton-child"></div><span class="image-skeleton"></span></div>
                                </div>
                                <div class="skaleton-parent full-wh"><div class="skaleton-child"></div><span class="title-skeleton"></span></div>
                            </a>
                            <a class="panel-block">
                                <div class="media-left">
                                    <div class="skaleton-parent"><div class="skaleton-child"></div><span class="image-skeleton"></span></div>
                                </div>
                                <div class="skaleton-parent full-wh"><div class="skaleton-child"></div><span class="title-skeleton"></span></div>
                            </a>
                            <a class="panel-block">
                                <div class="media-left">
                                    <div class="skaleton-parent"><div class="skaleton-child"></div><span class="image-skeleton"></span></div>
                                </div>
                                <div class="skaleton-parent full-wh"><div class="skaleton-child"></div><span class="title-skeleton"></span></div>
                            </a>
                        </div>
                        <div v-show="this.videoList.length && this.isPageLoading !== true" class="panel-main-scroll">
                            <a v-for="(video, index) in videoList" v-bind:key="index" v-on:click="changeCurrentVideo(video)" :class="{'panel-block' : true, 'is-active': playlistUiActive(video)}">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                        <img :src="video.thumbnail" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-6">{{ video.title }}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div v-show="this.videoList.length && this.userPerm <= 1 && this.isPageLoading !== true" class="panel-block buttons" style="border-top: 1px solid #dbdbdb">
                            <button class="button is-link is-outlined" @click="clearPlaylist">
                            clear playlist
                            </button>
                            <button class="button is-danger is-outlined is-hidden" @click="deleteFromPlaylist">
                            delete selected
                            </button>
                        </div>
                    </nav>
                    <nav class="panel">
                        <p class="panel-heading">
                            Users
                        </p>
                        <div v-show="this.isPageLoading === true">
                            <a class="panel-block user-block is-block">
                            <div class="skaleton-parent"><div class="skaleton-child user-title-skaleton"></div><span></span><div class="skaleton-child"></div></div>
                            </a>
                            <a class="panel-block user-block is-block">
                                <div class="skaleton-parent"><div class="skaleton-child user-title-skaleton"></div><span></span><div class="skaleton-child"></div></div>
                            </a>
                            <a class="panel-block user-block is-block">
                                <div class="skaleton-parent"><div class="skaleton-child user-title-skaleton"></div><span></span><div class="skaleton-child"></div></div>
                            </a>
                        </div>
                        <div v-show="this.isPageLoading !== true">
                            <UserListItem v-for="(user, index) in userList" v-bind:key="index"
                                v-bind:list = "user" 
                                v-bind:isActive = "user.clientId === socketClientId"
                                @changeNick = "changeNick"
                                v-bind:userPermLevel = "userPerm"
                                @makeAdmin = "makeAdmin"
                                @kickUser = "kickUser"
                            >
                            </UserListItem>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>   
</div>
</template>

<script>
import io from "socket.io-client";
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import UserListItem from '../components/UserListItem';
import Modal from '../components/Modal';
import ApiKeys from '../../api-keys';
import UserNames from '../assets/usernames';

const getVideoId = require('get-video-id');
const axios = require('axios');

const YOUTUBE_API_KEY = ApiKeys.youtube;
const SOCKET_IP = "http://localhost:3300";
const EMPTY_PLAYING_VIDEO = {url: 0};
const PLYR_OPTIONS = {
                            invertTime : false,
                            blankVideo : '../assets/blank.mp4',
                            youtube  : { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
                        };
const PLYR_EMPTY_POSTER = 'https://cdn.pixabay.com/photo/2018/01/26/07/05/retro-3107950_960_720.png';

export default {
    name: 'room',
    beforeRouteLeave (to, from, next) {
        var answer = true;

        if(this.socket.connected && this.userPerm === 0){
            answer = window.confirm('Do you really want to leave the room? room will be destroyed')
        }

        if(answer){
            this.socket.disconnect();
            next()
        } else {
            next(false)
        }
    },
    components:{
        NavBar,
        Notification,
        UserListItem,
        Modal
    },
    data : function(){
        return{
            roomId : this.$route.params.id,
            roomCreate : this.$route.params.create,
            socket : {},
            socketClientId : null,
            videoList : [],
            playingVideo : EMPTY_PLAYING_VIDEO,
            notificationObject : {},
            nickName : UserNames.getRandomName(),
            userList : [],
            plyr_options : PLYR_OPTIONS, 
            empty_plyr_poster : PLYR_EMPTY_POSTER,
            userPerm : 2,
            isModalActive : false,
            isPageLoading : true,
            notificationTrigger : null
        }
    },
    methods : {
        clearPlaylist : function(){
            if(this.userPerm <= 1){
                this.videoList = [];
                this.playingVideo = EMPTY_PLAYING_VIDEO;
                this.clearPlayer();
                this.updatePlaylist();
            }
        },
        clearPlayer : function(){
            this.player.source = {
                type: 'video',
                title: 'Playlist Empty',
                poster : PLYR_EMPTY_POSTER,
                sources: [
                    {
                        src: PLYR_OPTIONS.blankVideo,
                        type: 'video/mp4',
                        size: 720,
                    }
                ]
            };
        },
        addToPlaylist : function(video){
            this.playingVideo = video;
            this.player.source = {
                type: 'video',
                sources: [
                    {
                        src: video.url,
                        provider: 'youtube',
                    },
                ],
            };
        },
        changeCurrentVideo : function (video){
            if(this.userPerm <= 1){
                if(!this.playlistUiActive(video)){
                    this.addToPlaylist(video);
                }
                this.updatePlaylist();
            }
        },
        fetchVideoInfo : function(videoUrl){
            var video_id = getVideoId(videoUrl).id;
            axios
                .get('https://www.googleapis.com/youtube/v3/videos?id='+ video_id +'&key='+ YOUTUBE_API_KEY +'&part=snippet,contentDetails,statistics,status')
                .then(response => {
                    this.videoList.push({url: videoUrl, v_id: video_id, title: response.data.items[0].snippet.title, thumbnail:response.data.items[0].snippet.thumbnails.default.url})
                    //this.notificationObject = {type : 'warning', closeButton : true, bodyMessage : response.data.items[0].snippet.title, duration : -1, htmlTags: false, customClass: ''};
                    //playlist has a only 1 item load to player
                    if(this.videoList.length && this.videoList.length === 1){
                        this.addToPlaylist({url: videoUrl})
                    }
                    this.updatePlaylist();
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                //.finally(() => console.log("Fetched"))
        },
        //When the url came from navbar get the video infos from youtube api
        urlSended : function(data){
            if(this.userPerm <= 1 && this.isInPlaylist(data) === false){
                this.fetchVideoInfo(data)
            }
        },
        //Compares currently loaded player data with the arg.data
        playlistUiActive : function(data){
            if(data.url === this.playingVideo.url || data.v_id === this.playingVideo.v_id){
                return true;
            }else{
                return false;
            }
        },
        deleteFromPlaylist : function(){
            if(this.userPerm <= 1){
                var index = this.videoList.indexOf(this.playingVideo); //find playing item index from videoList
                if(index !== -1){
                    this.videoList.splice(index, 1); //remove found item from videoList
                    
                    if(this.videoList.length){
                        this.clearPlayer();
                        this.playingVideo = {url: null};
                    }else if(this.videoList.length == 1){
                        this.addToPlaylist(this.videoList[0]);
                    }else if(this.videoList.length == index){
                        this.addToPlaylist(this.videoList[index-1]);
                    }else{
                        this.addToPlaylist(this.videoList[index+1]);
                    }
                    this.updatePlaylist();
                }
            }
        },
        isInPlaylist : function(video){
            //for(var i=0; i<this.videoList.length; i++){
            //    if(video === this.videoList[i].url){
            //        return true;
            //    }
            //}
            return false;
        },
        join_room : function(){
            this.socket.emit('join room', this.roomId, {nickName : this.nickName});
        },
        create_room : function(){
            this.socket.emit('create room', {nickName : this.nickName}, {roomId : this.roomId});
        },
        leave_room : function(){
            this.socket.disconnect();
        },
        changeNick : function(new_nick){
            this.socket.emit('change nick', this.roomId, new_nick);
        },
        makeAdmin : function(user_client_id){
            this.socket.emit('give admin', this.roomId, user_client_id);
        },
        kickUser : function(user_client_id){
            this.socket.emit('kick user', user_client_id);
        },
        updatePlaylist : function(){
            if(this.userPerm <= 1){
                this.socket.emit('playlist', this.roomId, {playing: this.playingVideo, list: this.videoList});
            }
        },
        playerControlsToggle : function(t){
            if(!this.player.fullscreen.active && this.player.playing){
                this.player.toggleControls(t);
            }
        },
        playerToggleFS : function(){
            this.player.fullscreen.toggle();
        },
        updatePlayer : function(ev){
            console.log(ev.type);
            this.socket.emit('player', this.roomId, { time: ev.timeStamp, type: ev.type, plyr : ev.detail.plyr.timers, currentTime : ev.detail.plyr.currentTime, buffered: ev.detail.plyr.buffered});
        },
        notificate : function(){
            this.notificationObject = {type : 'warning', closeButton : true, bodyMessage : "Connecting...", duration : -1, htmlTags: false, customClass: ''};
        },
        menuSended : function(opt){
            if(opt === 'exit'){
                this.leave_room();
            }
        },
        closePageDialog : function(){
            return true;
        }
    },
    created (){ 
        this.socket = io.connect(SOCKET_IP, {
            reconnection : false
        });

        if(this.roomCreate){
            this.userPerm = 0;
        };

        //window.onbeforeunload = this.closePageDialog;
    },
    mounted(){
        this.notificate();

        this.socket.on('connect', () => {
            this.socketClientId = this.socket.id;
            if(this.roomCreate){
                this.userPerm = 0;
                this.create_room();
            }else{
                this.join_room();
            }
            setTimeout(function (){
                this.isPageLoading = false;
                this.notificationTrigger = 'connect';
            }.bind(this), 1000)
        });

        this.socket.on('disconnect', (reason) => {
            this.$router.push({name: 'home'});
            console.log('Disconnected! '+ reason);
        });

        this.socket.on('users update', data => {
            this.userPerm = data[this.socketClientId].permLevel;
            this.userList = data;
        });


        this.socket.on('playlist update', data =>{
            if(data.hasOwnProperty('list')){
                this.videoList = data.list;
            }

            if((data.playing.url !== this.playingVideo.url) && data.playing.url !== 0){
                this.addToPlaylist(data.playing);
            }else if((data.playing.url !== this.playingVideo.url) && data.playing.url === 0){ 
                this.clearPlayer();
            }
            if(data.hasOwnProperty('playing')){
                this.playingVideo = data.playing;
            }
        });

        this.socket.on('player', data =>{
            if(data.type === 'play'){
                this.player.play();
            }else if(data.type === 'pause'){
                this.player.pause();
                this.player.currentTime = data.currentTime;
            }else{
                this.player.currentTime = data.currentTime;
            }
        });

        if(this.userPerm === 0){
            this.player.on('play', event =>{
                this.updatePlayer(event);
            });

            this.player.on('pause', event =>{
                this.updatePlayer(event);
            });

            this.player.on('seeked', event =>{
                this.updatePlayer(event);
            });

            this.player.on('seeking', event =>{
                if(this.player.paused){
                    this.updatePlayer(event);
                }
            });
        }
    },
    computed: {
        player () { return this.$refs.plyr.player }
    }
}
</script>

<style>
    .room{
        width: 960px;
        margin: 40px auto;
    }

    .panel-main-scroll{
        max-height: 250px;
        border-left: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        height: 250px;
        overflow: auto;
    }

    .empty-plist{
        border-left: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        height: 250px;
        margin-bottom: 0 !important;
    }

    .main-video{
        pointer-events: none !important;
    }

    .main-video .plyr__menu button{
        pointer-events: none !important;
    }

    .main-video [data-plyr=volume]{
        pointer-events: auto;
    }

    .main-video [data-plyr=fullscreen]{
        pointer-events: auto;
    }

    .main-video [data-plyr=mute]{
        pointer-events: auto;
    }

    iframe{
        pointer-events: none;
        position: absolute;
    }

    .skaleton-parent{
        position: relative;
        overflow: hidden;
    }

    .skaleton-parent > .skaleton-child{
        position: absolute;
        width: 100%;
        height : 100%;
        z-index: 4;
        background-color: #ddd;
    }

    .skaleton-parent > .skaleton-child::after{
        z-index: 5;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
        -webkit-animation: shimmer 2s infinite;
        animation: shimmer 2s infinite;
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
        content: '';
    }

    @-webkit-keyframes shimmer {
        100% {
            -webkit-transform: translateX(100%);
                    transform: translateX(100%);
        }
    }
    @keyframes shimmer {
        100% {
            -webkit-transform: translateX(100%);
                    transform: translateX(100%);
        }
    }

    .image-skeleton{
        position: relative;
        background-color: #dbdbdb;
        width: 64px;
        height: 48px;
    }

    .title-skeleton{
        position: relative;
        background-color: #dbdbdb;
        height: 100%;
        height: 100%;
    }

    .full-wh{
        width: 100%;
        height: 100%;
    }

    .user-title-skaleton{
        width: 40% !important;
    }

</style>
