<template>
  <div>
    <div class="fs-15">Tasks</div>
    <task-item v-for="task of tasks" :key="task.id" :task="task" :user="user" @changeStatus="changeStatus"
               @deleteTask="deleteTask" @saveTask="saveTask"></task-item>
    <div v-if="user" class="mt-1">
      <button @click="createTask" class="btn btn-fill-green">Create task</button>
    </div>
    <error-list :errors="errors"></error-list>
  </div>
</template>

<script>
import taskItem from "@/components/Tasks/taskItem";
import {getTasks} from "@/api";
import errorList from "@/components/errorList";
import {createTask, deleteTask, sendTask, subscribeToTasks} from "@/socket";

export default {
  name: "taskList",
  components: {taskItem, errorList},
  props: ['user'],
  data() {
    return {
      tasks: [],
      editedTask: {},
      errors: [],
      idCount: 0
    }
  },
  created() {
    getTasks().then(tasks => {
      if (tasks.error)
        return this.errors.push(tasks.error);
      this.tasks = tasks;
    });
    subscribeToTasks((event, data) => {
      switch (event) {
        case 'verify-error':
          this.viewError('Verify error. Please login or register');
          this.$emit('logout');
          break;
        case 'update-task':
          this.updateTask(data)
          break;
        case 'delete-task':
          this.tasks = this.tasks.filter(task => task.id !== data);
          break;
        case 'add-task':
          this.tasks.push(data);
          break;
        case 'error':
          this.viewError(data.error);
          break;
      }
    });
  },
  methods: {
    changeStatus(id) {
      const task = this.findTask(id);
      this.editedTask = {...task};
      task.is_completed = !task.is_completed;
      const result = sendTask(task);
      this.viewError(result.error);
    },
    deleteTask(id) {
      if (id < 0)
        return this.tasks = this.tasks.filter(task => task.id !== id);
      const result = deleteTask(id);
      this.viewError(result.error);
    },
    saveTask(taskData) {
      const task = this.findTask(taskData.id);
      task.title = taskData.title;
      task.message = taskData.message;
      const result = createTask(task);
      this.viewError(result.error);
      this.deleteTask(taskData.id);
    },
    viewError(error) {
      this.errors = [];
      if (error) {
        this.errors.push(error);
        if (this.editedTask.id)
          this.updateTask(this.editedTask);
      }
    },
    updateTask(updatedTask) {
      let task = this.findTask(updatedTask.id);
      task.is_completed = updatedTask.is_completed;
      task.user = updatedTask.user;
      task.title = updatedTask.title;
      task.message = updatedTask.message;
    },
    findTask(id) {
      return this.tasks.find(task => task.id === id);
    },
    createTask() {
      this.idCount -= 1;
      this.tasks.push({
        id: this.idCount,
        title: 'new task',
        message: '',
        is_completed: false,
        user: this.user
      });
    }
  }
}
</script>

<style scoped>

</style>