<template>
    <div class="home">
        <div class="recommend">
            <div v-for="item in items">
                <card :content="item"/>
            </div>
        </div>
        <div class="typing">Welcome To My Blog...</div>
    </div>
</template>
<script>
import card from './card';
import {recommended} from './../../../api/aplist'
export default {
    name:'home',
    data(){
        return{
            items:[]
        }
    },
    methods:{
        async recommend(){
            const result = await recommended();
            if(result.data.code === 1){
                this.items = result.data.content
                console.log(result)
            }
        }
    },
    created(){
        this.recommend();
    },
    components:{
        card:card
    }    
}
</script>
<style lang="scss" scoped>
.home{
    width: 76%;
    margin: 0px auto;
}
.recommend{
    width: 80%;
    height: 580px;
    margin: 60px auto;
}
.typing{
    font-family: "Times New Roman", Times, serif;
    width: 288px;
    height: 35px;
    font-size: 30px;
    line-height: 35px;
    position: fixed;
    left: 50%;
    bottom: 10%;
    margin-left: -144px;
    white-space: nowrap;
    overflow: hidden;
    -webkit-animation: dy 3s steps(60,end) normal;
    animation: dy 3s steps(60,end) normal;
}
@-webkit-keyframes dy{
    from{width:0}
    to{width: 200}
}
@keyframes dy {
    from{width:0}
    to{width:200}
}
</style>
