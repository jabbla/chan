<template>
  <transition name="fade">
    <div
      class="start-task-modal"
      @click="onClick"
    >
      <h3 class="title">开始你的任务</h3>
      <md-field class="field">
        <label>任务</label>
        <md-input v-model="task.name"></md-input>
      </md-field>
      <div class="button-group">
        <md-button class="">开始</md-button>
        <md-button class="md-accent">取消</md-button>
      </div>
    </div>
  </transition>
</template>

<script>
function createEmptyTask() {
  return {
    name: ''
  };
}

export default {
  name: 'StartTaskModal',
  data() {
      return {
          task: createEmptyTask(),
      };
  },
  methods: {
    onClick(e) {
      e.stopPropagation();
    }
  }
}
</script>

<style lang="scss" scoped>
.start-task-modal {
  width: 300px;
  background: #ffffff;
  border-radius: 20px;
  padding: 0 20px;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 10px;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
    border-bottom: 10px solid #ffffff;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  .title {
    font-size: 16px;
    color: #999999;
    font-weight: normal;
    margin-top: 15px;
    margin-bottom: 0;
    text-align: center;
  }

  .field {
    margin-bottom: 10px;
  }

  .button-group {
    line-height: 0;
    text-align: center;
  }
}
</style>