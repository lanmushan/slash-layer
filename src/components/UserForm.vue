<template>
  <div>当前模式:{{ runMode }} {{ msg }}</div>
  <el-form ref="formRef" :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <p>dsaklfajslj</p>
    <p>dsaklfajslj</p>

    <p>dsaklfajslj</p>

    <p>dsaklfajslj</p>

    <p>dsaklfajslj</p>


    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor"></el-radio>
        <el-radio label="Venue"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Activity form">
        <el-select v-model="form.desc">
          <el-option>拉丝机理发师</el-option>
          <el-option>拉丝机理发师</el-option>

        </el-select>
    </el-form-item>

  </el-form>
</template>


<script lang="ts">
import {defineComponent, reactive} from "vue";
import HelloWorld from "@/components/HelloWorld.vue"
import {createUser, updateUser} from "@/apis/UserApi"

export default defineComponent({
  name: 'UserForm',
  components: {
    HelloWorld
  },
  props: {
    msg: {
      type: String,
      default: "哈哈"
    },
    runMode: {
      type: String
    }
  },
  setup() {
    // do not use same name with ref
    const form = reactive({
      name: '111',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })
    const doSubmit = async () => {
      const res = await createUser(form);
      return {};
    }
    // const doSubmit = () => {
    //   return form;
    // }
    const doUpdate = async () => {
      return updateUser(form);
    }
    return {form, doSubmit, doUpdate}
  }
})
</script>
