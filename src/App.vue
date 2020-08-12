<template>
  <div id="app">
    <audio class="audio-player" id="audio-player__start" src="./assets/start.wav"></audio>
    <audio class="audio-player" id="audio-player__pause" src="./assets/pause.wav"></audio>
    <div
      class="chan"
      :class="{ dropdown: startModalVisible }"
      @click="trigger"
    >
      {{ status.alias }}
      <start-task-modal
        v-if="startModalVisible"
        class="start-modal"
      />
    </div>
  </div>
</template>

<script>
import StartTaskModal from './components/StartTaskModal';

/**
 * 用户状态
 * START: 刚开始状态
 * DOING: 正在进行
 * PAUSED: 暂停中
 */
const STATE = {
  START: {
    alias: '禅',
    value: "START"
  },
  DOING: {
    alias: '休',
    value: "DOING"
  },
  PAUSED: {
    alias: '修',
    value: "PAUSED"
  }  
};


export default {
  name: 'App',
  components: {
    StartTaskModal,
  },
  data() {
    return {
      status: STATE.START,
      startModalVisible: false,
    };
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if(e.keyCode === 32) {
        this.trigger();
      }
    });
  },
  methods: {
    trigger() {
      if(this.status.value === 'START') {
        this.start();
        return;
      }
      if(this.status.value === 'DOING') {
        this.pause();
        return;
      }
      if(this.status.value === 'PAUSED') {
        this.start();
        return;
      }
    },
    start() {
      document.getElementById('audio-player__start').play();
      this.status = STATE.DOING;
      // this.startModalVisible = true;
    },
    pause() {
      document.getElementById('audio-player__pause').play();
      this.status = STATE.PAUSED;
    }
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  background-color: #E5E5E5;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  .chan {
    position: absolute;
    line-height: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 111px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: white;
    }
    &.dropdown {
      transform: translate(-50%, -150%);
      .start-modal {
        position: absolute;
        left: 50%;
        top: calc(100% + 20px);
        transform: translateX(-50%);
      }
    }
  }
}
#audio-player {
  visibility: hidden;
}
</style>
