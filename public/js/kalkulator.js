const app = Vue.createApp({
    data() {
        return {
            szelesseg: "",
            magassag: "",
            oldalfal: "",
            szelesseg_validate: false,
            oldalfal_validate: false,
            magassag_validate: false,
        };
    },
    
    watch: {
        szelesseg(value)
        {
          if(!/\D/.test(value) && Number(value) <=400 && Number(value) > 0)
          {
            this.szelesseg_validate = true;
          console.log(value);

          }
          else
          {
            this.szelesseg_validate = false;
          }
        },
  
        oldalfal(value)
        {

            if(!/\D/.test(value) && Number(value) <=100 && Number(value) > 0)
            {
             console.log(value);

              this.oldalfal_validate = true;
            }
            else
            {
                this.oldalfal_validate = false;
            }
          
        },

        magassag(value)
        {

            if(!/\D/.test(value) && Number(value) <=24 && Number(value) > 0)
            {
              console.log(value);

              this.magassag_validate = true;
            }
            else
            {
                this.magassag_validate = false;
            }
        }
    }
});
  app.mount('#kalkulator')
  
  var target = $('#target'),
      val = target.val();
  