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
                        <div class="panel-main-scroll">
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
                            <a v-for="(video, index) in videoList" v-bind:key="index" v-on:click="addToPlaylist(video.v_id)" class="panel-block">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                        <img :src="video.thumbnail" alt="Placeholder image">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-6">{{ video.title }}</p>
                                        <p class="subtitle is-6"></p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="panel-block custom1">
                            <button class="button is-link is-outlined" @click="clearPlaylist">
                            clear playlist
                            </button>
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
            info: {}
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
            this.player.source = {
                type: 'video',
                sources: [
                    {
                        src: video,
                        provider: 'youtube',
                    },
                ],
            };
        },
        fetchVideoInfo : function(videoUrl){
            var video_id = getVideoId(videoUrl).id;
            axios
                .get('https://www.googleapis.com/youtube/v3/videos?id='+ video_id +'&key='+ YOUTUBE_API_KEY +'&part=snippet,contentDetails,statistics,status')
                .then(response => {
                
                    this.videoList.push({url: videoUrl, v_id: video_id, title: response.data.items[0].snippet.title, thumbnail:response.data.items[0].snippet.thumbnails.default.url})
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        urlSended : function(data){
            if(this.videoList.length === 0){
                this.addToPlaylist(data)
            }
            this.fetchVideoInfo(data)
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
        this.player.once('ready', event =>{
            this.clearPlayer();
        })
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
        overflow: auto;
    }

    .users{
        margin-bottom: 20px;
    }

    .custom1{
        border-top: 1px solid #000;
    }
</style>
