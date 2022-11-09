<template>
    <div class="card-container">
        <div class="card-img">
            <img :src="props.object.url" alt="">
        </div>
        <div class="card-body">
            <div class="card-title">
                <span>{{ props.object.telefono.modelo }}</span>
            </div>
            <div class="card-price-estado">
                <span>${{ props.object.telefono.precio }}</span>
                <span> {{ props.object.telefono.estado }} </span>
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({ object: Object })

</script>

<style scoped>

    .card-container {
       transition: 200ms ease-in-out;
       box-shadow: 0px 10px 13px -7px #000000;
       height: 100%;
       cursor: pointer;
    }

    .card-container:hover {
        transform: translateY(-10px);
        box-shadow: 5px 5px 15px 5px #000000;
    }

    .card-img {
        height: 250px;
    }
    
    .card-body {
        padding: 10px;
        /* height: 100%; */
    }

    .card-title {
        padding: 0 7px;
        font-size: 1.35rem;
        color: #000;
        height: 70px;
        overflow-y: hidden;
    }

    .card-price-estado {
        display: flex;
        justify-content: space-between;
        font-size: 1.25rem;
        color: var(--main-color);
        position: relative;
        bottom: 0;
    }
    .card-price-estado span:nth-child(1) {
        font-size: 1.5rem;
    }

    .card-price-estado span:nth-child(2) {
        font-weight: bold;
    }

</style>