<template>
    <div class="footer-container">
        <div class="footer-title">
            <span><strong>Created by: </strong></span>
            <span> Ernesto Alonso Magaña Palacios</span>
        </div>
        <div class="footer-content">
            <div class="grid-container">
                <div class="footer-social-media">
                    <ul class="social-media-list">
                        <!-- <li class="social-media-item"><a href=""><ion-icon name="logo-facebook"></ion-icon></a></li> -->
                        <li class="social-media-item"><a href="https://twitter.com/TheNeto06" target="_blank"><ion-icon name="logo-twitter"></ion-icon></a></li>
                        <li class="social-media-item"><a href="https://www.instagram.com/elneto06/" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a></li>
                        <li class="social-media-item"><a href="https://www.linkedin.com/in/ernesto1998/" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                        <li class="social-media-item"><a href="https://github.com/ernesto-1998" target="_blank"><ion-icon name="logo-github"></ion-icon></a></li>
                    </ul>
                    <div class="quote-text">
                        <span>“Don’t pass up something that’s attractive today because you think you will find something better tomorrow.”</span><br>
                        <span class="warren">--Warren Buffet</span>
                    </div>
                </div>
                <div class="info-list">
                    <div class="info-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Hielo.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-container">
            <span>© 2022 Ernesto Magaña. All rights reserved.</span>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .footer-container {
        background-color: var(--main-color);
        margin-top: 30px;
        /* padding-top: 30px; */
    }

   .footer-title{
        color: var(--text-color);
        text-align: center;
        font-size: 1.5rem;
        padding-top: 30px;
    }

    .footer-content {
        width: 100%;
        margin-top: 30px;
        padding-bottom: 30px;
    }

    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .footer-social-media {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 2px solid var(--text-color);
    }

    .social-media-list {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .social-media-item a ion-icon {
        font-size: 1.95rem;
        margin: 0 0.5rem;
    }

    .social-media-item a ion-icon:hover {
        cursor: pointer;
    }

    .quote-text {
        color: var(--text-color);
        padding: 0 20px;
        margin-top: 10px;
    }

    .quote-text span:nth-child(1) {
        font-size: 1.25rem;
    }

    .quote-text .warren {
        font-weight: bold;
        font-size: 1.35rem;
    }

    .info-list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .info-container {
        width: 200px;
    }

    .info-container img {
        animation-name: girando;
        animation-duration: 6s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .copyright-container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        background-color: var(--second-color);
    }

    .copyright-container span {
        color: var(--text-color);
    }

    @keyframes girando {
        from {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }

    @media (max-width: 767px) {
        .grid-container {
            grid-template-columns: 1fr;
        }

        .info-list {
            margin-top: 25px;
        }

        .footer-social-media {
            border-right: none;
        }
    }
</style>