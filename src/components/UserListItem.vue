<template>
  <a class="panel-block user-block is-block" :class="{'is-active': this.isActive}">
        <div v-show="editUsername" class="edit-username">
            <div class="field is-grouped">
                <div class="control">
                    <p class="control is-expanded">
                        <input v-model="nickInput" class="input is-small" type="text" :placeholder="list.nickName">
                    </p>
                </div>
                <div class="field is-grouped">
                    <p class="control">
                        <a @click="changeNick(nickInput)" class="button is-small">
                        Change
                        </a>
                    </p>
                    <p class="control">
                        <a @click="editUsername=false" class="button is-danger is-small">
                        Cancel
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div v-show="!editUsername" class="user-list-item">
            {{list.nickName}} <span v-if="this.isActive" class="tag is-success perm-tag">You</span>
            
            <span v-if="list.permLevel === 0" class="tag is-info perm-tag">Owner</span>
            <span v-else-if="list.permLevel === 1" class="tag is-warning perm-tag">Admin</span>
            <div class="user-buttons is-pulled-right">
                <div class="buttons">
                    <div v-if="this.isActive" class="tooltip">
                        <span class="tooltiptext">Edit Username</span>
                        <a @click="editUsername = true" class="button is-small tooltip-trigger">
                            <span class="icon is-small">
                                <i class="lni-pencil"></i>
                            </span>
                        </a>
                    </div>
                    <div v-if="this.userPermLevel === 0 && !this.isActive && list.permLevel != 0" class="tooltip">
                        <span v-if="list.permLevel === 2" class="tooltiptext">Make Admin</span>
                        <span v-else-if="list.permLevel === 1" class="tooltiptext">Take Admin</span>
                        <a @click="makeAdmin(list.clientId)" class="button is-small tooltip-trigger">
                            <span class="icon is-small">
                                <i class="lni-key"></i>
                            </span>
                        </a>
                    </div>
                    <div v-if="this.userPermLevel <= 1 && !this.isActive && list.permLevel != 0" class="tooltip">
                        <span class="tooltiptext">Kick</span>
                        <a @click="kickUser(list.clientId)" class="button is-small tooltip-trigger">
                            <span class="icon is-small">
                                <i class="lni-exit"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    name : 'UserListItem',
    props : ['list', 'isActive', 'userPermLevel'],
    data (){
        return {
            editUsername: false,
            nickInput : null
        }
    },
    methods : {
        changeNick(nick){
            this.$emit('changeNick', nick);
            this.nickInput = null;
            this.editUsername = false;
        },
        makeAdmin(u_id){
            this.$emit('makeAdmin', u_id);
        },
        kickUser(u_id){
            this.$emit('kickUser', u_id);
        }
    }
}
</script>

<style>
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

    .visible{
        visibility: visible;
    }
</style>