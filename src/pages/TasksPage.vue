<template>
  <main style="min-height: 50vh; margin-top: 2rem;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <NewTask @added="handleAdded"/>
          <!-- List of uncompleted tasks -->
          <Tasks :tasks="uncompletedTasks"
                 @updated="handleUpdatedTask"
                 @completed="handleCompletedTask"
                 @removed="handleRemovedTask"

          />

          <!-- Show toggle button -->
          <div class="text-center my-3" v-show="showToggleCompletedBtn">
            <!--            khi click vào nút Show completed tasks thì sẽ hiển thị completedTasks-->
            <button class="btn btn-sm btn-secondary"
                    @click="$event => showCompletedTasks = !showCompletedTasks">
              <span v-if="!showCompletedTasks">Show completed</span>
              <span v-else>Hide completed</span>
            </button>
          </div>

          <!--          list of completed tasks-->
          <Tasks :tasks="completedTasks"
                 :show="completedTasksIsVisible && showCompletedTasks"
                 @updated="handleUpdatedTask"
                 @completed="handleCompletedTask"
                 @removed="handleRemovedTask"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
//onMounted là một hàm hook của Vue được sử dụng để thực thi một hàm khi component được gắn kết (mounted) lên DOM.
import {computed, onMounted, ref} from "vue";
import {allTasks, createTask, updateTask, completeTask, removeTask} from "@/http/task-api";
import Tasks from "@/components/tasks/Tasks.vue";
import NewTask from "@/components/tasks/NewTask.vue";


const tasks = ref([])


onMounted(async () => { //Đây là một hàm callback được truyền vào onMounted. Nó sẽ được gọi khi component được gắn kết lên DOM. Hàm callback này là một hàm async, cho phép sử dụng từ khóa await để đợi kết quả của một Promise.
  const {data} = await allTasks()  //gọi hàm allTasks để lấy danh sách các task từ API. Khi Promise được giải quyết, kết quả trả về được gán vào biến {data}
  tasks.value = data.data
})

const uncompletedTasks = computed(() => tasks.value.filter(task => !task.is_completed)) //nếu is_completed = false thì sẽ được đưa vào mảng uncompletedTasks


const completedTasks = computed(() => tasks.value.filter(task => task.is_completed)) //nếu is_completed = true thì sẽ được đưa vào mảng completedTasks

const showToggleCompletedBtn = computed(
    () => completedTasks.value.length > 0 && uncompletedTasks.value.length > 0) //nếu completedTasks và uncompletedTasks có phần tử thì sẽ hiển thị nút Show completed tasks

const completedTasksIsVisible = computed(
    () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0) //nếu uncompletedTasks không có phần tử hoặc completedTasks có phần tử thì sẽ hiển thị completedTasks

const showCompletedTasks = ref(false) //biến showCompletedTasks được sử dụng để quyết định xem completedTasks có được hiển thị hay không.


const handleAdded = async (newTask) => {
  const {data: createdTask} = await createTask(newTask) //gọi hàm createTask để tạo task mới
  tasks.value.unshift(createdTask.data) //thêm task mới vào đầu mảng tasks
}

const handleUpdatedTask = async (task) => {
  const {data: updatedTask} = await updateTask(task.id, {
    name: task.name
  })
  const currentTask = tasks.value.find(item => item.id === task.id)
  currentTask.name = updatedTask.data.name

}
const handleCompletedTask = async (task) => {
  const {data: updatedTask} = await completeTask(task.id, {
    is_completed: task.is_completed
  })
  const currentTask = tasks.value.find(item => item.id === task.id)
  currentTask.is_completed = updatedTask.data.is_completed

}


const handleRemovedTask = async (task) => {
  await removeTask(task.id)
  const index = tasks.value.findIndex(item => item.id === task.id)
  tasks.value.splice(index, 1)
}

</script>


<style scoped>

</style>