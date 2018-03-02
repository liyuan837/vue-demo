<!--template下只能有一个直接子节点-->
<template>
    <div id="app">
        单价：<input type="text" v-model="price">*
        数量：<input type="text" v-model='num'>*
        折扣：<input type="text" v-model="discount">=
        {{sum}}
    </div>
</template>

<script>


export default{
    data(){
        return {
            price:0,num:0,discount:0
        }
    },
    computed:{
        sum(){
            //如果当函数内涉及到的this.相关属性发生改变之后触发，并返回一个值，可以是对象
            return this.price * this.num * this.discount
        }
    }
}
</script>

<style scoped>
</style>