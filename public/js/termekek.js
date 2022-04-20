function timer(obj) {
    setTimeout(function() {
        $('#exampleModal').modal('hide');
    }, 800);
};

const app = Vue.createApp({
    data() {
        return {
            valasztottEvszak: '',
            valasztottMeret: '',
        };
    }
});
app.mount('#termekek')