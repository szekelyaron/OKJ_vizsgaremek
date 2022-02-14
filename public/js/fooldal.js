const app = Vue.createApp({
  data() {
      return {
          valasztott:  '',
          selected: '',
          country_valasztott: '',
          country: '',
      };
  },
  methods: {
    selectionChanged() {
      //console.log(selected.value);
      //console.log(country.value)
    }
  },
  watch: {
      selected(value)
      {
        //console.log(value);
        if(value == "R")
        {
          this.valasztott = "R";
        }
        if(value == "A")
        {
          this.valasztott = "A";
        }
      },

      country(value)
      {
        //console.log(value);
        if(value == "M")
        {
          this.country_valasztott = "M";
        }
        if(value == "N")
        {
          this.country_valasztott = "N";
        }
        if(value == "A")
        {
          this.country_valasztott = "A";
        }
      }
  }
});
app.mount('#cars')

var target = $('#target'),
    val = target.val();
