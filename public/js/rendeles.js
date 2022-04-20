function timer(obj) {
    setTimeout(function() {
        $('#sikeresRendeles').modal('hide');
    }, 800);
};


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
            vezetek: "",
            kereszt: "",
            tel_validate: false,
            irsz_validate: false,
            utca_validate: false,
            varos_validate: false,
            szam_validate: false,
            afsz_validate: false,
            vezetek_validate: false,
            kereszt_validate: false
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
            if (!/\D/.test(value) == true && value.length == 4 && value.replace(' ', '') != '') {
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
            if (value.length > 1 && /^[qwertzuiopőúöüóasdfghjkléáűíyxcvbnmQWERTZUIOPŐÚÖÜÓASDFGHJKLÉÁŰÍYXCVBNM. ,;_]+$/.test(value) == true && value.replace(' ', '') != '') {
                this.utca_validate = true;
            } else {
                this.utca_validate = false;
            }
        },
        city(value) {
            if (value.length > 1 && /^[qwertzuiopőúöüóasdfghjkléáűíyxcvbnmQWERTZUIOPŐÚÖÜÓASDFGHJKLÉÁŰÍYXCVBNM. ,;_]+$/.test(value) == true && value.replace(' ', '') != '') {
                this.varos_validate = true;
            } else {
                this.varos_validate = false;
            }
            console.log(this.varos_validate)
        },
        number(value) {
            if (/[0-9]/.test(value) == true && value != 0 && value != "" && value.replace(' ', '') != '') {
                this.szam_validate = true;
            } else {
                this.szam_validate = false;
            }
            console.log(this.szam_validate)

        },
        afsz(value) {
            if (value == true) {
                this.afsz_validate = true;
            } else {
                this.afsz_validate = false;
            }
        },
        vezetek(value) {
            let a = value.replace(' ', '');
            console.log(a);
            if (/^[qwertzuiopőúöüóasdfghjkléáűíyxcvbnmQWERTZUIOPŐÚÖÜÓASDFGHJKLÉÁŰÍYXCVBNM. ,;_]+$/.test(a) == true && a.length > 0) {
                this.vezetek_validate = true;
            } else {
                this.vezetek_validate = false;
            }
        },
        kereszt(value) {
            let b = value.replace(' ', '');
            console.log(b);
            if (/^[qwertzuiopőúöüóasdfghjkléáűíyxcvbnmQWERTZUIOPŐÚÖÜÓASDFGHJKLÉÁŰÍYXCVBNM. ,;_]+$/.test(b) == true && b.length > 0) {
                this.kereszt_validate = true;
            } else {
                this.kereszt_validate = false;
            }
        }
    },
});
app.mount("body");