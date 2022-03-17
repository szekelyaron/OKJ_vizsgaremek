const app = Vue.createApp({
  data() {
    return {
      telephone: "",
      postalcode: "",
      street: "",
      city: "",
      number: "",
      afsz: "",
      isChecked: "",
      tel_validate: false,
      irsz_validate: false,
      utca_validate: false,
      varos_validate: false,
      szam_validate: false,
      afsz_validate: false,
    };
  },
  methods: {
    selectionChanged() {},
    gombelfogad() {
      console.log(this.isChecked);
      this.isChecked = 'checked'
      this.afsz_validate = true;
    }
  },
  watch: {
    postalcode(value) {
      if (!/\D/.test(value) == true && value.length == 4) {
        this.irsz_validate = true;
      } else {
        this.irsz_validate = false;
      }
      console.log(this.irsz_validate);
    },

    telephone(value) {
      var value2 = value.replace(/\s/g, "");
      if (!/\D/.test(value2) == false || value2.length != 9 || value2 == "") {
        this.tel_validate = false;
      } else {
        if (value2.length == 9) {
          this.tel_validate = true;
        }
      }
      console.log(this.tel_validate);
    },

    street(value) {
      if (value.length > 1) {
        this.utca_validate = true;
      } else {
        this.utca_validate = false;
      }
    },
    city(value) {
      if (value.length > 2) {
        this.varos_validate = true;
      } else {
        this.varos_validate = false;
      }
    },
    number(value) {
      if (/[0-9]/.test(value) == true && value != 0 && value != "") {
        this.szam_validate = true;
      } else {
        this.szam_validate = false;
      }
    },
    afsz(value) {
      if(value == true){
        this.afsz_validate = true;
      }
      else{
        this.afsz_validate = false;
      }
    }
  },
});
app.mount("body");
