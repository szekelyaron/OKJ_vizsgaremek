const app = Vue.createApp({
  data() {
      return {
          valasztott:  '',
          selected: '',
      };
  },
  methods: {
    selectionChanged() {
      console.log(selected.value);
    }
  },
  watch: {
      selected(value)
      {
        console.log(value);
        if(value == "R")
        {
          this.valasztott = "R";
        }
        if(value == "A")
        {
          this.valasztott = "A";
        }
      }
  }
});
app.mount('#cars')

var target = $('#target'),
    val = target.val();

/*function monitor()
{
    var current_val = $(this).val();
    if (current_val != val) {
        console.log('changed from', val, 'to', current_val);
        val = current_val;
    }
}

target.keypress(monitor);*/