function timer(obj){
    setTimeout(function() {
        $('#exampleModal').modal('hide');
    }, 800);
};

const app = Vue.createApp({
    data() {
        return {
            valasztottEvszak:  '',
            valasztottMeret:  '',
        };
    },
    methods: {
      selectionChanged() {
      }
    },
    
  });
  app.mount('#termekek')
  
  var target = $('#target'),
      val = target.val();
  
