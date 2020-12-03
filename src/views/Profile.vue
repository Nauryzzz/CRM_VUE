<template>
	<div>
		<div class="page-title">
			<h3>{{"ProfileTitle" | localize}}</h3>
		</div>

		<form class="form" @submit.prevent="submitHandler">
			<div class="input-field">
				<input 
          id="description" 
          type="text" 
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
				<label for="description">Имя</label>
				<span 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Введите имя
        </span>
			</div>

			<div class="switch">
				<label>
					English
					<input type="checkbox" v-model="isRuLocale"/>
					<span class="lever"></span>
					Русский
				</label>
			</div>

			<button class="btn waves-effect waves-light" type="submit">
				Обновить
				<i class="material-icons right">send</i>
			</button>
		</form>
	</div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import {required} from "vuelidate/lib/validators";

  export default {
    name: "profile",
    data() {
      return {
        name: "",
        isRuLocale: true
      }
    },
    validations: {
      name: {required}
    },
    computed: {
      ...mapGetters(["info"])
    },
    methods: {
      ...mapActions(["updateInfo"]),

      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return
        }

        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? "ru-RU" : "en-US"
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    },
    mounted() {
      this.name = this.info.name;
      this.isRuLocale = this.info.locale === "ru-RU";

      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        M.updateTextFields();
      });
    }
  };
</script>

<style>
  .switch {
    margin-bottom: 2rem;
  }
</style>