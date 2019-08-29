<template>
<div class="main">
    <NavBar @urlSended = "urlSended"></NavBar>
    <Notification v-bind:notify="this.notificationObject"></Notification>
    <div class="room">
        <div class="container">
            <div class="columns">
                <div class="column is-three-fifths">
                    <vue-plyr ref="plyr">
                        <div class="plyr__video-embed">
                            <iframe
                            src="https://www.youtube.com/embed/?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
                            allowfullscreen allowtransparency >
                            </iframe>
                        </div>
                    </vue-plyr>
                </div>
                <div class="column">
                    <nav class="panel">
                        <p class="panel-heading">
                            Playlist
                        </p>
                        <div v-show="this.videoList.length === 0" class="columns empty-plist is-gapless has-text-centered is-vcentered is-centered">
                            Empty
                        </div>
                        <div v-show="this.videoList.length != 0" class="panel-main-scroll">
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
                        <div v-show="this.videoList.length != 0" class="panel-block custom1 buttons">
                            <button class="button is-link is-outlined" @click="clearPlaylist">
                            clear playlist
                            </button>
                            <button class="button is-danger is-outlined" @click="deleteFromPlaylist">
                            delete selected
                            </button>
                        </div>
                    </nav>
                    <nav class="panel">
                        <p class="panel-heading">
                            Users
                        </p>
                        <UserListItem v-for="(user, index) in userList" v-bind:key="index"
                            v-bind:list = "user" 
                            v-bind:isActive = "user.userId === socketClientId"
                            @changeNick = "changeNick"
                            v-bind:userPermLevel="userList[socketClientId].permission_level"
                            @makeAdmin = "makeAdmin"
                            @kickUser = "kickUser"
                        >
                        </UserListItem>
                    </nav>
                </div>
            </div>
        </div>
    </div>   
</div>
</template>

<script>
//import io from "socket.io-client";
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import UserListItem from '../components/UserListItem';
import ApiKeys from '../../api-keys';
import UserNames from '../assets/usernames';

const getVideoId = require('get-video-id');
const axios = require('axios');

const YOUTUBE_API_KEY = ApiKeys.youtube;

export default {
    name: 'room',
    components:{
        NavBar,
        Notification,
        UserListItem
    },
    data : function(){
        return{
            roomId : this.$route.params.id,
            roomCreate : this.$route.params.create,
            socket : {},
            socketClientId : null,
            videoList : [],
            loading: true,
            errored: false,
            videoState : null,
            playingVideo : {url: null},
            notificationObject : {},
            nickName : UserNames.getRandomName(),
            userList : []
        }
    },
    methods : {
        clearPlaylist : function(){
            this.videoList = [];
            this.playingVideo = {url: null};
            this.clearPlayer();
            this.updatePlaylist();
        },
        alert_test : (a) => {
            alert(a)
        },
        clearPlayer : function(){
            this.player.source = {
                type: 'video',
                title: 'Playlist Empty',
                sources: [
                    {
                        src: './assets/blank.mp4',
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
            if(!this.playlistUiActive(video)){
                this.addToPlaylist(video);
            }
            this.updatePlaylist();
        },
        fetchVideoInfo : function(videoUrl){
            var video_id = getVideoId(videoUrl).id;
            axios
                .get('https://www.googleapis.com/youtube/v3/videos?id='+ video_id +'&key='+ YOUTUBE_API_KEY +'&part=snippet,contentDetails,statistics,status')
                .then(response => {
                    this.videoList.push({url: videoUrl, v_id: video_id, title: response.data.items[0].snippet.title, thumbnail:response.data.items[0].snippet.thumbnails.default.url})
                    this.notificationObject = {type : 'warning', closeButton : true, bodyMessage : response.data.items[0].snippet.title, duration : -1, htmlTags: false, customClass: ''};
                    //playlist has a only 1 item load to player
                    if(this.videoList.length === 1){
                        this.addToPlaylist({url: videoUrl})
                    }
                    this.updatePlaylist();
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        //When the url came from navbar get the video infos from youtube api
        urlSended : function(data){
            if(this.isInPlaylist(data) === false){
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
            var index = this.videoList.indexOf(this.playingVideo); //find playing item index from videoList
            this.videoList.splice(index, 1); //remove found item from videoList
            if(this.videoList.length == 0){
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
        },
        isInPlaylist : function(video){
            for(var i=0; i<this.videoList.length; i++){
                if(video === this.videoList[i].url){
                    return true;
                }
            }
            return false;
        },
        pushNotification : function(obj){
            this.testNotification = obj;
        },
        join_room : function(room){
            this.socket.emit('join room', {roomId: room}, {nickName : this.nickName});
        },
        create_room : function(room){
            this.socket.emit('create room', {roomId: room}, {nickName : this.nickName});
        },
        leave_room : function(room){
            this.socket.emit('leave room', {roomId: room});
        },
        room_emit : function(room, topic, msg){
            this.socket.to(room).emit(topic, msg);
        },
        changeNick : function(nnick){
            this.socket.emit('change nickname', this.roomId, nnick);
        },
        makeAdmin : function(u_id){
            this.socket.emit('give admin perm', this.roomId, u_id);
        },
        kickUser : function(u_id){
            this.socket.emit('kick user', u_id);
        },
        updatePlaylist : function(){
            this.socket.emit('playlist update', this.roomId, {playing: this.playingVideo, playlist: this.videoList});
        }
    },
    created (){ 
        this.socket = {};
        this.socket = io.connect("http://192.168.0.28:3300", {
            reconnection : false
        });
        //var data = this.isRoomExist();
        if(this.roomCreate === true){
            this.create_room(this.roomId);
        }else{
            this.join_room(this.roomId);
        }
    },
    mounted(){
        this.socket.on('connect', () => {
            this.socketClientId = this.socket.id;
        });

        this.socket.on('disconnect', (reason) => {
            this.$router.push({name: 'home'});
            alert('You are Kicked! ' + reason);
        });

        this.socket.on('users update', data => {
            //console.log(data);
            this.userList = data.users;
        });

        this.socket.on('playlist update', data =>{
            console.log(data);
            this.videoList = data.playlist;

            if((data.playing.url != this.playingVideo.url) && data.playing.url != null){
                this.addToPlaylist(data.playing);
            }else if((data.playing.url != this.playingVideo.url) && data.playing.url === null){ 
                this.clearPlayer();
            }
            this.playingVideo = data.playing;
        });

        //this.player.on('statechange', event => {
        //    //console.log(event.detail);
        //});
        this.player.on('pause', event => {
            console.log(event);
        });
        this.player.once('ready', event =>{ //player init
            if(this.playingVideo.url === null){
                this.clearPlayer();
            }else{
                this.addToPlaylist(this.playingVideo);
            }
        });

        this.player.on('progress', event =>{
            this.videoState = event
        });

        this.player.on('pause', event => {
            this.videoState = 'Paused'
        });

        this.player.on('seeked', event => {
            this.videoState = 'Seeked'
        });

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

    .users{
        margin-top: 20px;
    }

    .custom1{
        border-top: 1px solid #dbdbdb;
    }

    .empty-plist{
        border-left: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        height: 250px;
        margin-bottom: 0 !important;
    }

    .test{
        opacity: 0.5;
    }

</style>
