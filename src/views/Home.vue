<template>
    <div class="main">
        <Modal :active="isModalActive" @close="isModalActive = false" >
            <template>
                <div class="modal-card modalMargin">
                    <div class="box">
                        <div class="field">
                            <label class="label">Room Code</label>
                            <div class="control">
                                <input v-model="roomId" class="input" type="text" placeholder="">
                            </div>
                        </div>
                        <div class="field is-grouped is-grouped-right">
                            <p class="control">
                                <a @click="this.joinRoom" class="button is-primary">
                                Join
                                </a>
                            </p>
                            <p class="control">
                                <a class="button is-light" @click="isModalActive = false">
                                Cancel
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </template>
        </Modal>
        <NavBar @menuSended="menuSended" ></NavBar>
        <section class="hero is-primary is-bold">
        <div class="hero-body">
            <div class="container">
            <h1 class="title">
                Watch Youtube with your friends together!
            </h1>
            <h2 class="subtitle">
                Youtube sync
            </h2>
            </div>
        </div>
        </section>
        <section class="main-buttons">
            <div class="container" v-show="!join">
                <div class="columns is-centered" >
                    <div class="column is-one-quarter">
                        <a @click="createRoom" class="box has-text-centered">
                            Create Room
                        </a>
                    </div>
                    <div class="column is-one-quarter">
                        <a class="box has-text-centered" @click="join_room">
                            Join Room
                        </a>
                    </div>
                </div>
            </div>
            <div class="container" v-show="join">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <div class="box">
                            <div class="field">
                                <label class="label">Room Code</label>
                                <div class="control">
                                    <input v-model="roomId" class="input" type="text" placeholder="">
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-right">
                                <p class="control">
                                    <a @click="this.joinRoom" class="button is-primary">
                                    Join
                                    </a>
                                </p>
                                <p class="control">
                                    <a class="button is-light" @click="join = false">
                                    Cancel
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import NavBar from '../components/NavBar'
import Modal from '../components/Modal'

export default {
    name: 'home',
    components:{
        NavBar,
        Modal
    },
    data : function() {
        return{
            join : false,
            roomId : null,
            guid : null,
            isModalActive : false
        }
    },
    methods : {
        join_room : function(){
            this.join = true
        },
        S4 : function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        },
        guidCalc : function(){
            //from : http://guid.us/GUID/JavaScript
            this.guid = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + 
                            this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
        },
        createRoom : function(){
            this.guidCalc();
            this.$router.push({ name: 'room', params: { id : this.guid, create: true}});
        },
        joinRoom : function(){
            this.$router.push({ name: 'room', params: { id: this.roomId, create: false}});
        },
        menuSended : function(opt){
            if(opt === 'create'){
                this.createRoom();
            }else if(opt === 'join'){
                this.isModalActive = true;
            }
        }
    }
}
</script>

<style>
    .main-buttons{
        padding-top: 50px;
    }

    .main{
        flex: 1;
    }

    .modalMargin{
        margin-bottom: 20%;
    }
</style>
