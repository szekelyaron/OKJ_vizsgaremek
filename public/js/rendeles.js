const app = Vue.createApp({
    data() {
        return {
            tel:  '',
            irsz: '',
            cim: '',
            tel_validate = false,
            irsz_validate = false,
            cim_validate = false,
        };
    },
    methods: {
      selectionChanged() {
      }
    },
    watch: {
       postalcode(value)
      {
        //console.log(value);
        if(!value.match(/^\d+/) && value.Length == 4)
        {
          this.irsz_validate = true;
        }
        
      },

      telephone(value)
      {
        console.log(value);
        if(!value.match(/^\d+/) && value == '')
        {
          this.tel_validate = false;
        }
        else
        {
          var value2 = value.replace(/\s/g, '');
          if (value2.Length == 9)
          {
            tel_validate = true,
          }
        }
      },
      address(value)
      {
        if(value != '' || value != ' ')
        {
          this.cim_validate = true;
        }
      }
    }
  });
  app.mount('#rendeles')

  