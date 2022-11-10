<template>
  <div class="footer-container">
    <div class="footer-title">
      <span><strong>Integrantes:</strong></span>
    </div>
    <div class="footer-content">
      <div class="names-container">
        <span>Kevin Emmanuel Jiménez Martínez (JM17015)</span>
        <span>Anderson Edenilson Alvarado Gutiérrez (AG16044)</span>
      </div>
    </div>

    <div class="copyright-container">
      <span>© 2022 .All rights reserved.</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.footer-container {
  background-color: var(--third-color);
  margin-top: 30px;
  /* padding-top: 30px; */
}

.footer-title {
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

.names-container {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-color);
  font-size: 1rem;
}

.names-container span {
  border: 0.1rem solid var(--text-color);
  border-radius: 25px;
  padding: 0.5rem 0.7rem;
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