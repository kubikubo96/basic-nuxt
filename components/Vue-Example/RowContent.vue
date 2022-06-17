<RowContent v-for="ticket in category.ticket" :ticket="ticket" :key="ticket._id" :labels_project="labels_project"/>
<template>
    <tr class="content">
            <th class="arrow"></th>
            <td class="ticket-name">
                <div>
                    <a class="bl-first" target="_blank"
                       :href="'/ticket/detail/' + ticket._id + '?project_token=' + ticket.project_token">
                        <span class="bl-tag-content">#{{ ticket.seq_id }} |</span>
                        <span>{{ ticket.name }}</span>
                    </a>

                    <!-- priority -->
                    <span v-if="ticket.priority == 1" class="priority low">
                        Thấp
                        <img src="/assets/site/v1/images/ticket_detail/2203_03.png" alt=""
                             class="ml-2">
                    </span>
                    <span v-if="ticket.priority == 2" class="priority">
                        Trung bình
                    </span>
                    <span v-if="ticket.priority == 3" class="priority high">
                        Cao
                        <img
                            src="/assets/site/v1/images/ticket_detail/2203_04.png"
                            alt="" class="ml-2">
                    </span>

                    <!-- tag -->
                    <span v-for="label_id in ticket.label_ids" :key="label_id"
                          class="tag-bizfly" :style="{ color: labels_project[label_id].color, background: labels_project[label_id].color +'33' }">
                        #{{labels_project[label_id].name}}
                    </span>
                </div>
            </td>
            <td class="number">
                <div v-if="childComputed.numChild > 0">
                    <span>{{childComputed.doneChild}}/{{childComputed.numChild}}</span>
                    <img src="/assets/site/v1/images/ticket-type/149-diagram.svg">
                </div>
            </td>
            <td class="status bl-common-status">
                <div class="dropdown status-ticket">
                    <a href="#" class="d-flex align-items-center justify-content-between btn-drop"
                       data-toggle="dropdown" :id="ticket._id"
                       style="background: #03A9F4;"
                    >
                        <span>Mới</span>
                        <img
                            src="/assets/site/v1/images/ticket_detail/1903_05.png"
                            alt="">
                    </a>
                    <div class="dropdown-menu" :aria-labelledby="ticket._id">
                        <div class="text">Chọn trạng thái</div>
                        <div class="list-status">
                            <div>
                                <a href="#" data-status="1" data-color="#03A9F4" data-name="Mới"
                                   class="item d-flex align-items-center active">
                                    <div class="bl-color" style="background: #03A9F4;"></div>
                                    <span>Mới</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" data-status="2" data-color="#FF6D00" data-name="Đang xử lý"
                                   class="item d-flex align-items-center ">
                                    <div class="bl-color" style="background: #FF6D00;"></div>
                                    <span>Đang xử lý</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" data-status="3" data-color="#FFC400" data-name="Chờ duyệt"
                                   class="item d-flex align-items-center ">
                                    <div class="bl-color" style="background: #FFC400;"></div>
                                    <span>Chờ duyệt</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" data-status="4" data-color="#A0A0A0" data-name="Tạm dừng"
                                   class="item d-flex align-items-center ">
                                    <div class="bl-color" style="background: #A0A0A0;"></div>
                                    <span>Tạm dừng</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" data-status="5" data-color="#5AC725" data-name="Hoàn thành"
                                   class="item d-flex align-items-center ">
                                    <div class="bl-color" style="background: #5AC725;"></div>
                                    <span>Hoàn thành</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" data-status="6" data-color="#FF3D00" data-name="Hủy"
                                   class="item d-flex align-items-center ">
                                    <div class="bl-color" style="background: #FF3D00;"></div>
                                    <span>Hủy</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td class="end-date">
                <div class="bl-end-date bl-end-date-red">
                    <p class="bl-expired" style="display: block">
                        30/11/2021 12:00
                    </p>
                </div>
            </td>
            <td class="handler bl-handler">
                <div class="showChangeHandler" style="display: none">
                    <img
                        src="/assets/site/v1/images/ticket-type/019-add-user.svg">
                </div>


                <div class="list-handler" style="display: block">

                    <div class="item">
                        <img src="https://i.imgur.com/62jIlsh.jpg?1" class="w-100" alt="">
                    </div>


                    <div class="item">
                        <img src="/assets/images/ticket/Group 2977.png" class="w-100" alt="">
                    </div>

                </div>


                <div class="parent-input div-select-bizfly" data-id="615fc6a3f995c35ffd74fcd7"
                >
                    <select class="select-bizfly-handler"
                            data-id="615fc6a3f995c35ffd74fcd7"></select>
                    <img class="icon-search"
                         src="/assets/site/v1/images/ticket-type/search-2.svg">
                </div>
                <div class="bl-tooltip" data-id="615fc6a3f995c35ffd74fcd7">
                    <div class="bl-tooltip-show-member">
                        <div class="bl-main-handler">
                            <div class="title title-main">
                                <p>Người xử lý chính:</p>
                            </div>
                            <div class="info-handler">
                                <div class="avatar">
                                    <img
                                        src="https://ticketbizfly.mediacdn.vn//ticketbizfly/dev/ticket/avatar/1634207466vid47tiennguyentat.png">
                                </div>
                                <div class="content-text">
                                    <div class="name">
                                        <p>
                                            vid47_tiennguyentat
                                        </p>
                                    </div>
                                    <div class="email">
                                        <p>
                                            tiennguyentat@vccorp.vn
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bl-another-handler">
                            <div class="title title-another">
                                <p>Người xử lý khác:</p>
                            </div>
                            <div class="info-handler">
                                <div class="avatar">
                                    <span> <img src="https://i.imgur.com/62jIlsh.jpg?1"></span>
                                </div>
                                <div class="content-text">
                                    <div class="name">
                                        <p>
                                            Nguyễn Tất Tiến
                                        </p>
                                    </div>
                                    <div class="email">
                                        <p>
                                            tiennguyentat@bizfly.vn
                                        </p>
                                    </div>
                                </div>
                            </div>


                            <p>Nhóm người xử lý:</p>

                            <div class="info-handler">
                                <div class="avatar"><span> <img
                                    src="/assets/images/ticket/Group 2977.png" class=""
                                    alt=""></span>
                                </div>

                                <div class="name" style="margin-top: 10px;">
                                    <p> nhom 1</p>
                                </div>

                            </div>


                        </div>
                        <div class="arrow-avatar">
                        </div>
                    </div>
                </div>
            </td>
        </tr>
</template>

<script>
    export default {
        components: {},
        props: ['ticket', 'labels_project'],
        create() {},
        computed: {
            childComputed: function () {
                let childTicket = this.ticket.children;
                let numChild = childTicket.length;
                let doneChild = 0;

                if(numChild > 0) {
                    doneChild = _.filter(childTicket, function (child) {
                        return child.status_group?.status === 5;
                    }).length;
                }

                let data = {};
                data.numChild = numChild;
                data.doneChild = doneChild;
                return data;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
