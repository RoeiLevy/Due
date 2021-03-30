<template>
  <div class="board-surface">
    <loader v-if="!boardToEdit" />
    <app-header />
    <div v-if="boardToEdit" class="flex board" ref="screen">
      <div
        @click="toggleCloseScreen"
        v-if="isCloseScreen"
        class="close-screen"
      ></div>
      <workspace />
      <social-modal
        v-if="isAddingMembers"
        :members="boardToEdit.members"
        @addMember="addMember"
      ></social-modal>
      <task-details :board="boardToEdit" :drawer="isTaskDetails" />
      <board-activities :board="boardToEdit" :drawer="isBoardActivities" />
      <div class="flex column board-container">
        <div class="flex column board-header">
          <div class="flex space-between top-header">
            <div class="board-title-container">
              <input
                class="board-title"
                v-if="titleEditMode"
                ref="title"
                style="text-transform: capitalize"
                v-model="boardToEdit.title"
                @keyup.enter="saveBoard(boardToEdit)"
                @focusout="saveBoard(boardToEdit)"
              />
              <div v-else>
                <h1
                  class="board-title"
                  style="text-transform: capitalize"
                  @click="handleEdit('title')"
                >
                  {{ boardToEdit.title }}
                </h1>
              </div>

              <!-- //////////////////////////////////// -->

              <input
                class="board-description"
                v-if="descEditMode"
                ref="description"
                style="text-transform: capitalize"
                v-model="boardToEdit.description"
                @keyup.enter="saveBoard(boardToEdit)"
                @focusout="saveBoard(boardToEdit)"
              />
              <div v-else>
                <p
                  class="board-description"
                  style="text-transform: capitalize"
                  @click="handleEdit('description')"
                >
                  {{ boardDescription }}
                </p>
              </div>
              <p class="board-created-by">
                By: {{ boardToEdit.createdBy.fullname }}
              </p>
            </div>

            <!-- //////////////////////////////////// -->

            <div class="board-actions">
              <board-members :members="boardToEdit.members" />
              <button @click="toggleAddingMembers">
                <!-- <font-awesome-icon class="header-icon" icon="user-friends" />
                Members/ -->
                <font-awesome-icon class="header-icon plus" icon="user-plus" />
                Invite
              </button>
              <button @click="openBoardActivities">
                <font-awesome-icon class="header-icon" icon="chart-line" />
                Activity
              </button>
            </div>
          </div>

          <nav class="flex header-view-bar">
            <ul class="view-nav">
              <router-link
                class="view"
                :to="`/board/${boardToEdit._id}/maintable`"
              >
                <div class="view-title">
                  <font-awesome-icon class="header-icon plus" icon="home" />
                  <p>Main Table</p>
                </div>
              </router-link>

              <router-link
                class="view"
                style="text-transform: capitalize"
                :to="`/board/${boardToEdit._id}/dashboard`"
              >
                <div class="view-title">
                  <font-awesome-icon
                    class="header-icon plus"
                    icon="chart-bar"
                  />
                  <p>Chart</p>
                </div>
              </router-link>

              <router-link
                class="view"
                style="text-transform: capitalize"
                :to="`/board/${boardToEdit._id}/calendar`"
              >
                <div class="view-title">
                  <font-awesome-icon
                    class="header-icon plus"
                    icon="calendar-alt"
                  />
                  <p>Calendar</p>
                </div>
              </router-link>

              <router-link
                class="view"
                style="text-transform: capitalize"
                :to="`/board/${boardToEdit._id}/kanban`"
              >
                <div class="view-title">
                  <font-awesome-icon
                    class="header-icon plus"
                    icon="sticky-note"
                  />
                  <p>Kanban</p>
                </div>
              </router-link>
              <!-- </div> -->
              <!-- v-for="(view, idx) in boardToEdit.views"
                :key="idx" -->
              <!-- @click.self="activateView(view)"
                :class="{ active: isViewActive }" -->
              <!-- {{ view }} -->
              <!-- <div class="view-dropdown-container">
                  <button class="view-menu-btn" style="background: none;">
                    <font-awesome-icon
                      class="view-menu-icon"
                      icon="ellipsis-h"
                    />
                  </button>
                  <ul class="view-dropdown">
                    <li @click="renameView(view)">Rename</li>
                    <li @click="KanbanView(view)">Duplicate</li>
                    <li @click="removeView(view)">Remove</li>
                  </ul>
                </div> -->
              <!-- <el-dropdown
                class="views-drop-down add-view-wrapper"
                trigger="click"
                @command="addView"
              >
                <span class="views-el-dropdown-link add-view-wrapper">
                  <button class="add-view-btn">
                    <font-awesome-icon class="header-icon" icon="plus" /> Add
                    View
                  </button>
                </span>
                <el-dropdown-menu class="view-dropdown">
                  <el-dropdown-item command="Calendar"
                    >Calendar</el-dropdown-item
                  >
                  <el-dropdown-item command="Chart">Chart</el-dropdown-item>
                  <el-dropdown-item command="Kanban">Kanban</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </ul>
            <div class="search-bar">
              <div class="search" @click="searchMode = !searchMode">
                <font-awesome-icon
                  v-if="!searchMode"
                  icon="search"
                  class="search-bar-icon"
                />
                <el-input
                  v-else
                  @focusout="searchMode = !searchMode"
                  placeholder="Search"
                  v-model="filterBy.txt"
                >
                </el-input>
                <p v-if="!searchMode" class="search-title">Search</p>
              </div>

              <div class="filter" @click="filterMode = !filterMode">
                <font-awesome-icon
                  v-if="!filterMode"
                  icon="filter"
                  class="search-bar-icon"
                />
                <el-select
                  @blur="filterMode = !filterMode"
                  @clear="filterMode = !filterMode"
                  v-else
                  v-model="filterBy.member"
                  placeholder="By Members"
                  :clearable="true"
                >
                  <el-option
                    v-for="member in boardToEdit.members"
                    :key="member.id"
                    :label="member.fullname"
                    :value="member"
                  >
                  </el-option>
                </el-select>
                <p v-if="!filterMode" class="filter-title">Filter</p>
              </div>
            </div>
          </nav>
          <router-view
            :board="filteredBoard"
            @saveBoard="saveBoard"
            @addNewGroup="addNewGroup"
            @removeTask="removeTask"
            @updateTask="updateTask"
            @saveGroup="saveGroup"
            @addTask="addTask"
            @removeGroup="removeGroup"
            @addPrioroty="addStatus"
            @deleteStatus="deleteStatus"
            @addPriority="addPriority"
            @deletePriority="deletePriority"
          />
          <!-- <main-table
            v-if="activeTab === 'mainTable'"
            :board="boardToEdit"
            @addNewGroup="addNewGroup"
            @removeTask="removeTask"
            @updateTask="updateTask"
            @saveGroup="saveGroup"
            @addTask="addTask"
            @removeGroup="removeGroup"
            @addStatus="addStatus"
            @deleteStatus="deleteStatus"
          ></main-table>
          <chart v-if="activeTab === 'chart'" :board="boardToEdit"></chart> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import socialModal from "../cmps/social-modal";
import appHeader from "../cmps/header";
import draggable from "vuedraggable";
import taskDetails from "../cmps/task-details";
import boardActivities from "../cmps/board-activities.vue";
import workspace from "../cmps/workspace.vue";
import mainTable from "../cmps/main-table.vue";
import dashboard from "../cmps/dashboard";
import boardMembers from "../cmps/board-members";

import { boardService } from "../services/board.service";
import { utilService } from "../services/util.service";
import { socketService } from "../services/socket.service";
import loader from "../cmps/loader.vue";

export default {
  name: "board",
  data() {
    return {
      groups: [],
      boardToEdit: null,
      titleEditMode: false,
      descEditMode: false,
      mainTable: true,
      addingView: false,
      isAddingMembers: false,
      activeTab: "mainTable",
      filterBy: {
        txt: null,
        member: null,
      },
      searchMode: false,
      filterMode: false,
    };
  },
  methods: {
    toggleAddingMembers() {
      this.isAddingMembers = !this.isAddingMembers;
      this.toggleCloseScreen();
    },
    toggleCloseScreen() {
      this.$store.commit("toggleCloseScreen");
    },
    // NOT USED FUNCTION v
    async addStatus(status) {
      try {
        this.boardToEdit.statuses.push(status);
        console.log("added status");
        this.saveBoard();
        // this.$store.dispatch({
        //   type: "sendActivity",
        //   txt: "Created a new status",
        // });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async deleteStatus(statusId) {
      console.log("deleting");
      try {
        const idx = this.boardToEdit.statuses.findIndex(
          (s) => s.id === statusId
        );
        this.boardToEdit.statuses.splice(idx, 1);
        await this.saveBoard();
        this.$store.dispatch({ type: "sendActivity", txt: "Removed a status" });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addPriority(priority) {
      try {
        this.boardToEdit.priorities.push(priority);
        console.log("added priority");
        this.saveBoard();
        // this.$store.dispatch({
        //   type: "sendActivity",
        //   txt: "Created a new priority",
        // });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async deletePriority(priorityId) {
      console.log("deleting");
      try {
        const idx = this.boardToEdit.priorities.findIndex(
          (p) => p.id === priorityId
        );
        this.boardToEdit.priorities.splice(idx, 1);
        await this.saveBoard();
        this.$store.dispatch({
          type: "sendActivity",
          txt: "Removed a priority",
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async removeGroup(groupId) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        this.boardToEdit.groups.splice(groupIdx, 1);

        this.boardToEdit.activities.unshift(
          this.createActivity("Removed a group")
        );

        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit, // add activity to send
        });
        // this.$store.dispatch({ type: "sendActivity", txt: "Removed a group" });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Group", err);
        throw err;
      }
    },
    async saveGroup(groupToEdit) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupToEdit.id
        );
        this.boardToEdit.groups.splice(groupIdx, 1, groupToEdit);
        const savedGroup = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // Add user msg
        return savedGroup;
      } catch (err) {
        console.log("Couldn`t Save Group", err);
        throw err;
      }
    },
    async addTask(newTask, groupId) {
      try {
        newTask.createdAt = Date.now();
        newTask.id = utilService.makeId();
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        this.boardToEdit.groups[groupIdx].tasks.push(newTask);

        this.boardToEdit.activities.unshift(
          this.createActivity(`Created a new task "${newTask.title}"`, {
            id: newTask.id,
            title: newTask.title,
          })
        );
        const groupToSave = JSON.parse(
          JSON.stringify(this.boardToEdit.groups[groupIdx])
        );
        const savedGroup = await this.saveGroup(groupToSave);
        // this.$store.dispatch({
        //   type: "sendActivity",
        //   txt: `Created a new task "${newTask.title}"`,
        //   task: { id: newTask.id, title: newTask.title },
        // });

        // Add user msg
        return savedGroup;
      } catch (err) {
        console.log("err:", err);
      }
    },
    async updateTask(task, groupId) {
      try {
        const groupIdx = this.boardToEdit.groups.findIndex(
          (g) => g.id === groupId
        );
        const taskIdx = this.boardToEdit.groups[groupIdx].tasks.findIndex(
          (t) => t.id === task.id
        );

        this.boardToEdit.activities.unshift(
          this.createActivity(`Updated task "${task.title}"`, {
            id: task.id,
            title: task.title,
          })
        );

        this.boardToEdit.groups[groupIdx].tasks.splice(taskIdx, 1, task);
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });

        // this.$store.dispatch({
        //   type: "sendActivity",
        //   txt: "Updated a task",
        //   task: { id: task.id, title: task.title },
        // });
        // Add user msg
      } catch (err) {
        console.log("Couldn`t remove Task", err);
        throw err;
      }
    },
    async removeTask(task, groupId) {
      try {
        const boardCopy = JSON.parse(JSON.stringify(this.boardToEdit));

        const groupIdx = boardCopy.groups.findIndex(
          (group) => group.id === groupId
        );
        const taskIdx = boardCopy.groups[groupIdx].tasks.findIndex(
          (item) => item.id === task.id
        );
        boardCopy.groups[groupIdx].tasks.splice(taskIdx, 1);

        this.boardToEdit = boardCopy;

        this.boardToEdit.activities.unshift(
          this.createActivity(`Removed task "${task.title}"`, {
            id: task.id,
            title: task.title,
          })
        );

        const removedTask = await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });

        // this.$store.dispatch({
        //   type: "sendActivity",
        //   txt: `Removed task "${task.title}"`,
        // });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    addView(command) {
      this.boardToEdit.views.push(command.toLowerCase());
      this.saveBoard();
    },
    async removeView(view) {
      const idx = this.boardToEdit.views.findIndex((v) => v === view);
      this.boardToEdit.views.splice(idx, 1);
      await this.saveBoard();
      this.$router.push(`/board/${this.boardToEdit._id}/maintable`);
    },
    handleEdit(item) {
      switch (item) {
        case "description":
          this.descEditMode = true;
          setTimeout(() => {
            this.$refs.description.focus();
          }, 0);
          break;

        case "title":
          this.titleEditMode = true;
          setTimeout(() => {
            this.$refs.title.focus();
          }, 0);
          break;
      }
    },
    activateView(view) {
      this.activeTab = view;
    },
    openBoardActivities() {
      this.$store.commit({ type: "toggleIsBoardActivities" });
    },
    async loadBoard() {
      try {
        const boardId = this.$route.params.boardId;
        const board = await this.$store.dispatch({
          type: "loadBoard",
          boardId,
        });
        this.boardToEdit = JSON.parse(JSON.stringify(board));
      } catch (err) {
        console.log("err:", err);
      }
    },
    async saveBoard() {
      try {
        this.titleEditMode = false;
        this.descEditMode = false;
        const boardWithUrl = await this.printScr(
          JSON.parse(JSON.stringify(this.boardToEdit))
        );
        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: boardWithUrl,
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
    async addNewGroup() {
      try {
        const newGroup = boardService.getEmptyGroup();
        this.boardToEdit.groups.unshift(newGroup);

        this.boardToEdit.activities.unshift(
          this.createActivity("Created a new group")
        );

        await this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
        // this.$store.dispatch({ type: "sendActivity", txt: "Added a group" });
        // Add user msg
      } catch (err) {
        console.log("err:", err);
      }
    },
    async printScr(board) {
      try {
        const canvas = await html2canvas(this.$refs.screen);
        const pageImg = canvas.toDataURL();
        const cloudUrl = await utilService.uploadImg(pageImg);
        board.thumbnail = cloudUrl;
        return board;
      } catch (err) {
        console.log("err:", err);
      }
    },
    addActivity(newActivity) {
      const boardCopy = JSON.parse(JSON.stringify(this.boardToEdit));
      boardCopy.activities.unshift(newActivity);
      this.boardToEdit = boardCopy;
    },
    setBoard(board) {
      this.boardToEdit = board;
      this.$store.commit({
        type: "setBoard",
        board: JSON.parse(JSON.stringify(board)),
      });
    },
    async addMember(email) {
      try {
        const memberToAdd = await this.$store.dispatch({
          type: "validateUserByEmail",
          email,
        });
        this.boardToEdit.members.unshift(memberToAdd);
        this.$store.dispatch({
          type: "saveBoard",
          boardToSave: this.boardToEdit,
        });
      } catch (err) {
        console.log("err:", err);
      }
    },
    createActivity(txt, task = null) {
      const activity = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        txt,
        byMember: this.$store.getters.loggedInUser,
        task,
      };
      // console.log("created activity", activity);
      return activity;
    },
    addLoggedInUser() {
      if (this.boardToEdit.members.some((m) => m._id === this.loggedInUser._id))
        return;
      this.boardToEdit.members.unshift(
        JSON.parse(JSON.stringify(this.loggedInUser))
      );
      this.saveBoard();
    },
  },
  computed: {
    filteredBoard() {
      var board = JSON.parse(JSON.stringify(this.boardToEdit));
      if (this.filterBy.txt || this.filterBy.member) {
        board.groups.forEach((group, idx) => {
          group.tasks = group.tasks.filter((task) => {
            if (
              task.title &&
              this.filterBy.txt &&
              task.title.toLowerCase().includes(this.filterBy.txt.toLowerCase())
            )
              return task;
            if (
              task.members &&
              this.filterBy.member &&
              task.members.some(
                (member) => member.fullname === this.filterBy.member.fullname
              )
            ) {
              return task;
            }
          });
        });
        board.groups = board.groups.filter((group) => {
          if (group.tasks && group.tasks.length > 0) return group;
        });
      }
      return board;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isNotificatiosOpen() {
      return this.$store.getters.isNotificatiosOpen;
    },
    isCloseScreen() {
      return this.$store.getters.isCloseScreen;
    },
    boardDescription() {
      if (!this.boardToEdit.description) return "Add a description";
      else return this.boardToEdit.description;
    },
    currBoard() {
      return this.$store.getters.boardForDisplay;
    },
    isBoardActivities() {
      return this.$store.getters.isBoardActivities;
    },
    isTaskDetails() {
      return this.$store.getters.isTaskDetails;
    },
    isViewActive() {
      // return { active: this.activeTab===view };
    },
    tableActive() {
      return { active: this.mainTable };
    },
  },
  watch: {
    $route(to, from) {
      const boardId = this.$route.params.boardId;
      this.loadBoard();
    },
    isCloseScreen(newValue) {
      // console.log(`close screen is now opened: ${newValue}`);
      if (!newValue) {
        this.isAddingMembers = false;
      }
    },
  },
  async created() {
    try {
      await this.loadBoard();
      this.addLoggedInUser();
      const boardId = this.$route.params.boardId;
      socketService.emit("chat topic", boardId);
      socketService.on("get board", this.setBoard);
    } catch (err) {
      console.log("err:", err);
    }
    // socketService.setup();
    // socketService.on("add activity", this.addActivity);
  },
  destroyed() {
    socketService.off("get board", this.setBoard);
    socketService.terminate();
    // socketService.off("add activity", this.addMsg);
  },
  components: {
    appHeader,
    draggable,
    taskDetails,
    dashboard,
    socialModal,
    boardActivities,
    workspace,
    mainTable,
    boardMembers,
    loader,
  },
};
</script>
    
