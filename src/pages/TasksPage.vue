<template>
  <main style="min-height: 50vh; margin-top: 2rem;">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <!-- Add new Task -->
          <div class="relative">
            <input type="text" class="form-control form-control-lg padding-right-lg"
                   placeholder="+ Add new task. Press enter to save."/>
          </div>
          <!-- List of tasks -->
          <div class="card mt-2">
            <ul class="list-group list-group-flush">
                <Task v-for="task in tasks" :task="task" :key="task.id" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
//onMounted là một hàm hook của Vue được sử dụng để thực thi một hàm khi component được gắn kết (mounted) lên DOM.
import {onMounted, ref} from "vue";
//Dòng này sử dụng để import hàm allTasks từ module "@/http/task-api". Module chứa hàm allTasks để gửi yêu cầu lấy danh sách các task từ API.
import {allTasks} from "@/http/task-api";
import Task from "@/components/tasks/Task.vue";


const tasks = ref([])


//Đây là một hàm callback được truyền vào onMounted. Nó sẽ được gọi khi component được gắn kết lên DOM. Hàm callback này là một hàm async, cho phép sử dụng từ khóa await để đợi kết quả của một Promise.
onMounted(async () => {
  //gọi hàm allTasks để lấy danh sách các task từ API. Khi Promise được giải quyết, kết quả trả về được gán vào biến {data}
  const {data} = await allTasks()
  tasks.value = data.data
})

</script>

<style scoped>

</style>