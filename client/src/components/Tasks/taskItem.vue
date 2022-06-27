<template>
  <div class="task p-05 mt-1">
    <div class="task-title d-flex pb-05">
      <div v-if="!is_new"><span class="fs-15 fw-b">{{ task.title }}</span> - {{ task.user.username }}</div>
      <div v-else><input type="text" class="text-input" v-model="title"> - {{ task.user.username }}</div>
      <div v-if="!is_new">
        <button class="btn ml-05" :class="status.btn" :disabled="!user" @click="changeStatus">{{ status.text }}</button>
        <button v-if="user" class="btn btn-border-red ml-05" @click="deleteTask">Delete</button>
      </div>
    </div>
    <div v-if="!is_new" class="task-message mt-1">{{ task.message }}</div>
    <div v-else class="task-message mt-1">
      <div><input type="text" class="text-input w-100" v-model="message"></div>
      <button class="btn btn-fill-blue mt-05" @click="saveTask">Save</button>
      <button class="btn btn-fill-red mt-05 ml-05" @click="deleteTask">Cancel</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "taskItem",
  props: ['task', 'user'],
  data() {
    return {
      title: this.task.title,
      message: this.task.message
    }
  },
  computed: {
    status() {
      if (this.task.is_completed)
        return {text: 'Completed', btn: 'btn-fill-green'};
      return {text: 'In process', btn: 'btn-fill-red'};
    },
    is_new() {
      return this.task.id < 0;
    }
  },
  methods: {
    changeStatus() {
      this.$emit('changeStatus', this.task.id);
    },
    deleteTask() {
      this.$emit('deleteTask', this.task.id);
    },
    saveTask() {
      this.$emit('saveTask', {id: this.task.id, title: this.title, message: this.message});
    }
  }
}
</script>

<style scoped>
.task {
  border-radius: 0.5rem;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 0.2);
}

.task-title {
  border-bottom: 1px solid black;
  align-items: flex-end;
  justify-content: space-between;
}

.task-message {
  word-break: break-all;
}
</style>