<template>
<div class="main">
    <NavBar @urlSended = "urlSended"></NavBar>
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
                            <!---<a class="panel-block is-active">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-5">John Smith</p>
                                        <p class="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                            </a>--->
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
                        <a class="panel-block user-block is-block is-active">
                            melih <span class="tag is-success perm-tag">You</span>
                            <span class="tag is-info perm-tag">Owner</span>
                            <div class="user-buttons is-pulled-right">
                                <div class="buttons">
                                    <div class="tooltip">
                                        <span class="tooltiptext">Make Admin</span>
                                        <a class="button is-small tooltip-trigger">
                                            <span class="icon is-small">
                                                <i class="lni-key"></i>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="tooltip">
                                        <span class="tooltiptext">Edit Username</span>
                                        <a class="button is-small tooltip-trigger">
                                            <span class="icon is-small">
                                                <i class="lni-pencil"></i>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="tooltip">
                                        <span class="tooltiptext">Kick</span>
                                        <a class="button is-small tooltip-trigger">
                                            <span class="icon is-small">
                                                <i class="lni-exit"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <a class="panel-block is-block">
                            some_user123 <span class="tag is-light perm-tag">Admin</span>
                        </a>
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

const getVideoId = require('get-video-id');
const axios = require('axios');

const YOUTUBE_API_KEY = 'AIzaSyAC7Fwlehe6_yjOxG1zVYtWhD9gEID0FME';

export default {
    name: 'room',
    components:{
        NavBar
    },
    data : function() {
        return{
            roomId : this.$route.params.id,
            socket : {},
            videoList : [],
            test : null,
            videoId : '',
            loading: true,
            errored: false,
            info: {},
            videoState : null,
            playingVideo : {},
            debug : null
        }
    },
    methods : {
        clearPlaylist : function(){
            this.videoList = [];
            this.clearPlayer();
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
        },
        fetchVideoInfo : function(videoUrl){
            var video_id = getVideoId(videoUrl).id;
            axios
                .get('https://www.googleapis.com/youtube/v3/videos?id='+ video_id +'&key='+ YOUTUBE_API_KEY +'&part=snippet,contentDetails,statistics,status')
                .then(response => {
                    this.videoList.push({url: videoUrl, v_id: video_id, title: response.data.items[0].snippet.title, thumbnail:response.data.items[0].snippet.thumbnails.default.url})
                    
                    //playlist has a only 1 item load to player
                    if(this.videoList.length === 1){
                        this.addToPlaylist({url: videoUrl})
                    }
                    
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
            }else if(this.videoList.length == 1){
                this.addToPlaylist(this.videoList[0]);
            }else if(this.videoList.length == index){
                this.addToPlaylist(this.videoList[index-1]);
            }else{
                this.addToPlaylist(this.videoList[index+1]);
            }
        },
        isInPlaylist(video){
            for(var i=0; i<this.videoList.length; i++){
                if(video === this.videoList[i].url){
                    return true;
                }
            }
            return false;
        }
    },
    created (){ 
        this.socket = io("http://192.168.0.31:3000")
    },
    mounted(){
        this.socket.on('test', data => {
            console.log(data)
        });
        //this.player.on('statechange', event => {
        //    //console.log(event.detail);
        //});
        this.player.on('pause', event => {
            console.log(event);
        });
        this.player.once('ready', event =>{ //player init
            this.clearPlayer();
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

    .perm-tag{
        margin-left: 5px;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
        border:1px solid #dbdbdb;
        background-color: gray;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        
        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
        margin-top: 32px;
    }

    .tooltip:hover .tooltiptext{
        visibility: visible;
    }

    .tooltip{
        margin-left: 4px;
    }
    
    .user-buttons{
        visibility: hidden;
    }

    .user-block:hover .user-buttons{
        visibility: visible;
    }

</style>
