<template>
  <div id="app" :class="`${status.appClass || ''}`">
    <audio class="audio-player" id="audio-player__start" src="./assets/start.wav"></audio>
    <audio class="audio-player" id="audio-player__pause" src="./assets/pause.wav"></audio>
    <div
      class="chan"
      :class="`${status.fontClass || ''}`"
      @click="trigger"
    >
      <div
        class="task-name"
        v-if="status.value === STATE.DOING.value"
      >
        {{ task.name }}
      </div>
      {{ status.alias }}
      <start-task-modal
        :visible.sync="startModalVisible"
        class="start-modal"
        @begin="onBegin"
        @cancel="onCancelBegin"
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
  BEFORE_DOING: {
    alias: '禅',
    value: 'BEFORE_DOING',
    appClass: 'app__before-doing',
    fontClass: 'dropdown font__before-doing'
  },
  DOING: {
    alias: '休',
    value: "DOING",
    appClass: 'app__doing',
    fontClass: 'font__doing'
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
      STATE,
      status: STATE.START,
      startModalVisible: false,
      task: null,
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
      if(this.status.value === STATE.START.value) {
        this.beforeStart();
        return;
      }
      if(this.status.value === STATE.DOING.value) {
        this.pause();
        return;
      }
      if(this.status.value === STATE.PAUSED.value) {
        this.start();
        return;
      }
    },
    beforeStart() {
      this.startModalVisible = true;
      this.status = STATE.BEFORE_DOING;
    },
    start() {
      document.getElementById('audio-player__start').play();
      this.status = STATE.DOING;
    },
    pause() {
      document.getElementById('audio-player__pause').play();
      this.status = STATE.PAUSED;
    },
    onBegin({ task }) {
      this.task = task;
      this.start();
    },
    onCancelBegin() {
      this.startModalVisible = false;
      this.status = STATE.START;
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
  transition: background 0.2s ease-in-out;

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
    &.font__before-doing {
      color: white;
    }
    &.font__doing {
      color: white;
    }
  }

  .task-name {
    position: absolute;
    padding: 20px;
    line-height: 1;
    font-size: 50px;
    border: 4px solid black;
    top: -20px;
    left: 50%;
    transform: translate(-50%, -100%);
    border-radius: 10px;
    color: black;
    white-space: nowrap;
  }

  &.app__before-doing {
    background: grey;
  }
  &.app__doing {
    background: grey;
  }
}
#audio-player {
  visibility: hidden;
}
</style>
