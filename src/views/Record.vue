<template>
  <div>
    <div class="page-title">
      <h3>{{"menu_record" | localize}}</h3>
    </div>

    <Loader v-if="loading"/>

    <p class="center" v-else-if="!categories.length">
        Категорий пока нет. 
        <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" @submit.prevent="submitHandler" v-else>
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >
            {{c.title}}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="income" 
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input 
            class="with-gap" 
            name="type" 
            type="radio" 
            value="outcome" 
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input 
          id="amount" 
          type="number"
          v-model.number="amount" 
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        
        <label for="amount">Сумма</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          Минимальная величина {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input 
          id="description" 
          type="text" 
          v-model.trim="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span 
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Введите описание расхода/дохода</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import Loader from "@/components/app/Loader";
  import {required, minValue} from "vuelidate/lib/validators";
  import {mapGetters} from "vuex";

  export default {
    name: "record",
    data() {
      return {
        loading: true,
        categories: [],
        category: null,
        select: null,
        type: "outcome",
        amount: 1,
        description: ""
      }
    },
    validations: {
      description: {required},
      amount: {minValue: minValue(1)}
    },
    components: {
      Loader
    },
    computed: {
      ...mapGetters(["info"]),

      canCreateRecord() {
        if (this.type === "income") {
          return true
        }

        return this.info.bill >= this.amount;
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        try {
          if (this.canCreateRecord) {
            await this.$store.dispatch("createRecord", {
              categoryId: this.category,
              amount: this.amount,
              description: this.description,
              type: this.type,
              date: new Date().toJSON()
            });

            const bill = this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

            await this.$store.dispatch("updateInfo", {bill});
            this.$message("Запись успешно создана!");

            this.amount = 1;
            this.description = "";
            this.$v.$reset();
          } else {
            this.$message(`Недостаточно средств на счете ${this.amount - this.info.bill}!`);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch("fetchCategories");
      this.loading = false;

      if (this.categories) {
        this.category =  this.categories[0].id;
      }
      
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select); 
        // eslint-disable-next-line no-undef
        M.updateTextFields();       
      }, 0);

    },
    beforeDestroy() {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    },
  };
</script>

<style>
</style>