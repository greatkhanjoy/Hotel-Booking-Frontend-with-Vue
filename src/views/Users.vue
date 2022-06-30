<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 text-left">Users</h1>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- DataTable  -->
      <div class="mt-5">
        <DataTable
          ref="dt"
          v-model:selection="selectedUsers"
          v-model:filters="filters"
          filterDisplay="menu"
          :value="users"
          :paginator="true"
          class="p-datatable-customers"
          :rows="10"
          :loading="loading"
          dataKey="_id"
          :rowHover="true"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <template #header>
            <div class="flex justify-between">
              <h5 class="m-0 text-2xl">All Users</h5>
              <div class="space-x-3">
                <Button
                  @click="openNew"
                  label="Add New"
                  icon="pi pi-plus"
                  class="p-button-success"
                />
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters['global'].value"
                    placeholder="Keyword Search"
                  />
                </span>
              </div>
            </div>
          </template>
          <template #empty> No Users found. </template>
          <template #loading> Loading Users data. Please wait. </template>
          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column sortable field="name" header="Name"></Column>
          <Column sortable field="email" header="Email"></Column>
          <Column sortable field="role" header="Role">
            <template #body="{ data }">
              {{ data.role === 'admin' ? 'Admin' : 'User' }}
            </template>
          </Column>
          <Column sortable field="verified" header="Status">
            <template #body="{ data }">
              {{ data.verified ? 'Verified' : 'Not Verified' }}
            </template>
          </Column>
          <Column field="image" header="Photo">
            <template #body="{ data }">
              <Image
                :src="$store.state.site_url + data.image"
                alt="Image"
                width="50"
                preview
              />
            </template>
          </Column>
          <Column
            headerStyle="width: 4rem; text-align: center"
            bodyStyle="text-align: center; overflow: visible"
            header="Action"
          >
            <template #body="{ data }">
              <div class="flex space-x-2">
                <Button
                  @click="edit(data._id)"
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-primary p-button-outlined"
                />
                <Button
                  @click="deleteUser(data._id)"
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-danger p-button-outlined"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <!-- End DataTable  -->
      <!-- Add User Modal  -->
      <Dialog
        v-model:visible="userDialog"
        :style="{ width: '450px' }"
        header="Add new user"
        :modal="true"
        class="p-fluid"
      >
        <div class="field">
          <label for="name">Name</label>
          <InputText
            id="name"
            v-model.trim="userData.name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !userData.name }"
          />
          <small class="p-error" v-if="submitted && !userData.name"
            >Name is required.</small
          >
        </div>
        <div class="field">
          <label for="username">Username</label>
          <InputText
            id="username"
            v-model.trim="userData.username"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !userData.username }"
          />
          <small class="p-error" v-if="submitted && !userData.username"
            >Username is required.</small
          >
        </div>
        <div class="field">
          <label for="email">Email</label>
          <InputText
            type="email"
            id="email"
            v-model.trim="userData.email"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !userData.email }"
          />
          <small class="p-error" v-if="submitted && !userData.email"
            >Email is required.</small
          >
        </div>
        <div class="field">
          <label for="password">Password</label>
          <InputText
            type="password"
            id="password"
            v-model="userData.password"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !userData.password }"
          />
          <small class="p-error" v-if="submitted && !userData.password"
            >Password is required.</small
          >
        </div>

        <div class="field">
          <label for="role" class="mb-3">Role</label>
          <Dropdown
            id="role"
            v-model="userData.role"
            :options="roles"
            optionLabel="label"
            placeholder="Select a Role"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span
                  :class="'product-badge status-' + slotProps.value.value"
                  >{{ slotProps.value.label }}</span
                >
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span :class="'product-badge status-' + slotProps.value">{{
                  slotProps.value
                }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
          </Dropdown>
        </div>
        <div class="field">
          <label for="verified" class="mb-3">Status</label>
          <Dropdown
            id="verified"
            v-model="userData.verified"
            :options="statuses"
            optionLabel="label"
            placeholder="Select Status"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span
                  :class="'product-badge status-' + slotProps.value.value"
                  >{{ slotProps.value.label }}</span
                >
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span :class="'product-badge status-' + slotProps.value">{{
                  slotProps.value
                }}</span>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
          </Dropdown>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="addNew(), (submitted = true)"
          />
        </template>
      </Dialog>
      <!-- End Add User Modal  -->
      <!-- Toast  -->
      <Toast />
    </div>
  </main>
</template>
<script>
import {
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/vue/solid'
import axios from 'axios'
import { FilterMatchMode } from 'primevue/api'
import Button from 'primevue/button'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' //optional for column grouping
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Row from 'primevue/row'
import Toast from 'primevue/toast'
export default {
  name: 'Users',
  components: {
    Dialog,
    Toast,
    Dropdown,
    RadioButton,
    Image,
    Button,
    CheckIcon,
    ChevronDownIcon,
    LinkIcon,
    PencilIcon,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
  },
  data() {
    return {
      users: [],
      loading: false,
      selectedUsers: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      userDialog: false,
      userData: {
        name: '',
        email: '',
        username: '',
        role: '',
        verified: '',
        password: '',
      },
      roles: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      statuses: [
        { label: 'Verified', value: true },
        { label: 'Unverified', value: 'false' },
      ],
      submitted: false,
    }
  },
  methods: {
    getUsers() {
      axios
        .get(this.$store.state.site_url + '/api/users', {
          withCredentials: true,
        })
        .then((response) => {
          this.users = response.data.users
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addNew() {
      if (
        this.userData.name &&
        this.userData.email &&
        this.userData.username &&
        this.userData.password
      ) {
        this.userData.role = this.userData.role
          ? this.userData.role.value
          : 'user'
        this.userData.verified = this.userData.verified ? true : false
        axios
          .post(this.$store.state.site_url + '/api/users', this.userData, {
            withCredentials: true,
          })
          .then((response) => {
            this.getUsers()
            this.userData = {}
            this.$toast.add({
              severity: 'success',
              summary: 'User created successfully',
              life: 3000,
            })
            this.userDialog = false
            this.submitted = false
          })
          .catch((err) => {
            this.$toast.add({
              severity: 'error',
              summary: err.response.data.message,
              life: 3000,
            })
          })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Please fill all fields',
          life: 3000,
        })
      }
    },

    edit(id) {
      console.log('edit', id)
    },
    deleteUser(id) {
      console.log('deleet', id)
    },
    openNew() {
      this.userData = {}
      this.submitted = false
      this.userDialog = true
    },
    hideDialog() {
      this.userData = {}
      this.userDialog = false
      this.submitted = false
    },
  },
  created() {
    this.getUsers()
  },
  mounted() {},
}
</script>
