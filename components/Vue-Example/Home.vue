<!--
1. ràng buộc dữ liệu, building 2 chiều: data trên template thay đổi, dưới script thay đổi và ngược lại
2. scoped in style: dùng scoped thì chỉ áp dụng style cho chính components đó
3. Mounted: khi data được gắn vào html
4. v-bind: thêm thuộc tính vào thẻ
5. v-model: lien ket element vs priority
6. v-on: viet tat @
7. ref : Ánh xạ đến chính element
8. v-show: An/hien 1 element theo dieu kien
9. v-hide: nguoc lai
10. v-if: An/hien. the se bien mat, tao lai
11. v-else, v-else-if:
12.computed: tính toán dữ liệu trước khi hiển thị để tránh cồng kềnh ở phần hiển thị (trong template)
13. watch: theo dõi sự thay đổi của data
14. hooks. mounted: //chay dau tien khi vao,
15. props. du lieu day tu component cha => component con
-->
<template>
    <div class="container">
        <h1>Learn Vuejs ABC</h1>
        <input  type="text" v-model="message">
        <input type="checkbox" v-model="accept">Toi dong y yeu kien
        <Menu/>
        {{ message}}<br>
        Sử dụng computed để xử lý message rồi ms hiển thị: {{ reversedMessage }}
        <div>=============================================================</div>
        <div v-show="isShow">AN HIEN</div>
        <button @click="isShow = !isShow">AN/HIEN</button>
        <div>=============================================================</div>
        <div v-bind:id="id">Gan id bang V bind (v-bind: thêm thuộc tính vào thẻ)</div>
        <div :disabled="isDisabled">(v-bind: thêm thuộc tính vào thẻ) - viet tat</div>
        <div>=============================================================</div>
        <div :class="{gan_class: selected, gan_class_2: selected_2}">gan class</div>
        <button @click="selected = !selected">Gan Class/Bo Gan Class</button>
        <div>=============================================================</div>
        <input type="text" v-model="channelName">
        <div>{{channelName}}</div>
        <div>=============================================================</div>
        <div>event</div>
        <input type="text" v-model="dataEvent">
        <button @click="dataEvent = 'song vay' ">Click</button>
        <div>=============================================================</div>
        <form action="/">
            <div>ngăn submit form</div>
            <input type="text" v-model="dataEvent">
            <button @click.prevent="">Click</button>
        </form>
        <div>=============================================================</div>
        <div>ref : Ánh xạ đến chính element (this.$ref.dataRef)</div>
        <input ref="dataRef" type="text" v-model="dataRef">
        <div>=============================================================</div>
        <div v-for="(task, index) in tasks" :key="index+100">
            <input type="checkbox" v-model="task.done" >
            <span :class="{done: task.done}">{{task.content}}</span>
        </div>
        <input type="text" v-model="newTask">
        <button @click="addTask()">Them</button>
        <div>=============================================================</div>
        <div>Task import tu compontent ngoai</div>
        <div>Truyen data tu cha sang con</div>
        <Task v-for="(task, index) in tasks" :key="index" :taskData="task"/>
        <div>=============================================================</div>
        <div>Truyền  data từ con lên cha</div>
        <div>hiện ở Cha: {{dataShareChild}}</div>
        <TagSelector :dataShareChild="dataShareChild" @dataShareUpdate="updateDataShareFromChild" />
        <!--@dataShareUpdate="updateDataShareFromChild": lắng nghe con thay đổi bằng function-->
        <div>=============================================================</div>
        <div>Using Store</div>
        <div>lay data tu store vuex: </div>
        <button @click="logDataStore()">Log Get Data From Store</button>
        <button @click="setDataStore()">Log New Data Store After Set</button>
    </div>
</template>

<script>
import Menu from './Menu';
import Task from './Task';
import TagSelector from "./TagSelector";

export default {
    components: {
        TagSelector,
        Menu,
        Task
    },
    data() {
        return {
            message: 'người đông bến đợi thuyền xuôi ngược',
            accept: true,
            isShow: true,
            id: "id_gan",
            isDisabled: true,
            selected: true,
            selected_2: true,
            channelName: 'Lap Trinh Vien',
            dataEvent: 'lap trinh',
            dataSome: 'data some',
            dataRef: 'data ref',
            tasks: [
                {content: 'an', done: false},
                {content: 'choi', done: false},
                {content: 'ngu', done: true}
            ],
            newTask: '',
            dataShareChild: 'Data share child'
        }
    },
    created() {
        // chạy sau khi một đối tượng(data) được khởi tạo
        //Lí do vì sao không dùng JQuery được ở created:
        //Vì ở created là ta mới chỉ có DOM ảo được tạo ra, mà jquery thì chỉ thao tác được với DOM thật,
        // do đó nên nếu muốn dùng JQuery ta cần làm ở mounted (khi DOM ảo đã được đồng bộ với DOM thật)
        //thường dùng để gọi API lấy dữ liệu từ server, khởi tạo websocket, lắng nghe event Laravel Echo,... miễn là ta không động gì vào DOM thật là được
    },
    beforeMount: function () {
        // được gọi sau khi component đã được compile và trước lần render đầu tiên. Ở giai đoạn này khi các bạn truy cập đến các phần tử trong DOM vẫn sẽ báo lỗi
    },
    mounted() {
        // Được gọi khi tiến trình render lần đầu hoàn tất.
        console.log("HERE");
    },
    beforeUpdate: {
        // Quá trình này được gọi ngay sau khi dữ liệu trên component bị thay đổi và trước khi component re-render,
    },
    updated: {
        // chạy sau khi dữ liệu thay đổi và render lại
        //Quá trình này xảy ra sau beforeUpdate, ở đây DOM đã được cập nhật lại
    },
    computed: {
        //tính toán dữ liệu trước khi hiển thị để tránh cồng kềnh ở phần hiển thị (trong template)
        reversedMessage: function () {
            // `this` trỏ tới đối tượng vm
            return this.message.split(' ').reverse().join(' ')
        }
    },
    methods: {
        addTask: function() {
            this.tasks.push({
                content: this.newTask, done: false
            });
        },
        //cách để cha lắng nghe con thay đổi
        updateDataShareFromChild(dataShareChild) {
            this.dataShareChild = dataShareChild;
        },
        logDataStore() {
            console.log(this.$store.state.count)
        },
        setDataStore() {
            this.$store.commit('increment', 10)
            console.log(this.$store.state.count)
        }
    },
    watch: {
        //khi newTask thay đổi thì sẽ chạy vào hàn newTask
        newTask: function () {
            console.log('new Task change')
        }
    },
    beforeDestroy: {
        //Quá trình này xay ra ngay trước khi component của chúng ta bị huỷ đi
        //Ta thường dùng hàm này để xoá đi các sự kiện không cần thiết sau khi component bị huỷ
        //thường dùng khi ta muốn huỷ lắng nghe các sự kiện: như sự kiện onscroll, hay các sự kiện lắng nghe socket.io, larave-echo,...
    },
    destroyed: {
        //Tại quá trình này thì hầu như mọi thứ trên component đã bị huỷ đi: các directives bị huỷ, các event lắng nghe bị bỏ đi,
        // các component con cũng đã bị destroy, watchers cũng đã bị huỷ,... nhưng ở ta vẫn có thể làm một số việc như thông báo với remote server là component vừa bị huỷ chẳng hạn.
        //Note: tại đây ta data vẫn còn và ta vẫn có thể truy cập được.
    }
};
</script>

<style lang="scss" scoped>
.container {
    h1 {
        color: red;
    }
    .done {
        text-decoration: line-through;
    }
}
</style>
